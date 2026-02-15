import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define base URL - assuming proxy or direct URL
const API_URL = 'https://api.velorm.com/api/v1/cart';

interface CartItem {
    _id: string;
    cartProduct: any; // Define strict type based on backend later
    selQty: number;
}

interface CartState {
    items: CartItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CartState = {
    items: [],
    status: 'idle',
    error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId: string) => {
    const response = await fetch(`${API_URL}/get-cart-by-user/${userId}`);
    const data = await response.json();
    return data.response;
});

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, userId, productData }: { productId: string; userId: string; productData: any }) => {
        const response = await fetch(`${API_URL}/add-to-cart/${productId}/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...productData, inc: true }),
        });
        const data = await response.json();
        return data.response;
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ productId, userId }: { productId: string; userId: string }) => {
        // Based on backend: cartrouter.get("/delete-to-cart/:product_id/:user_id",DeleteToCart);
        // Note: Backend uses GET for delete? checking router.js:
        // cartrouter.get("/delete-to-cart/:product_id/:user_id",DeleteToCart);
        // Yes, it uses GET.
        const response = await fetch(`${API_URL}/delete-to-cart/${productId}/${userId}`);
        const data = await response.json();
        return productId; // Return id to filter out
    }
);

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ productId, userId, action }: { productId: string; userId: string; action: 'inc' | 'dec' }) => {
        const body = action === 'inc' ? { inc: true } : { dec: true };
        const response = await fetch(`${API_URL}/add-to-cart/${productId}/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data.response;
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Normalize: if backend returns flat list of products, wrap them.
                // Based on backend: response: cartData where cartData is element.cartProduct (flat array)
                state.items = (action.payload || []).map((item: any) => {
                    if (item.cartProduct) return item; // Already wrapped
                    return {
                        _id: item._id,
                        cartProduct: item,
                        selQty: item.selQty || 1
                    };
                });
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch cart';
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                const updatedItem = action.payload;
                if (!updatedItem) return;

                // Normalize updatedItem: if it's the cart document, extract product
                const normalizedItem = updatedItem.cartProduct ? {
                    _id: updatedItem._id,
                    cartProduct: updatedItem.cartProduct,
                    selQty: updatedItem.cartProduct.selQty || 1
                } : {
                    _id: updatedItem._id,
                    cartProduct: updatedItem,
                    selQty: updatedItem.selQty || 1
                };

                const existingIndex = state.items.findIndex((item: any) =>
                    (item.cartProduct._id === normalizedItem.cartProduct._id)
                );

                if (existingIndex >= 0) {
                    state.items[existingIndex] = normalizedItem;
                } else {
                    state.items.push(normalizedItem);
                }
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.cartProduct._id !== action.payload);
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                const updatedItem = action.payload;
                if (!updatedItem) return;

                // Normalize
                const normalizedItem = updatedItem.cartProduct ? {
                    _id: updatedItem._id,
                    cartProduct: updatedItem.cartProduct,
                    selQty: updatedItem.cartProduct.selQty || 1
                } : {
                    _id: updatedItem._id,
                    cartProduct: updatedItem,
                    selQty: updatedItem.selQty || 1
                };

                const existingIndex = state.items.findIndex(item =>
                    item.cartProduct._id === normalizedItem.cartProduct._id
                );

                if (existingIndex >= 0) {
                    state.items[existingIndex] = normalizedItem;
                }
            });
    },
});

export default cartSlice.reducer;
