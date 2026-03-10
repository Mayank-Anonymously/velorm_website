import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define base URL - assuming proxy or direct URL
const getApiUrl = () => {
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        return 'http://localhost:9291/api/v1/cart';
    }
    return 'https://api.velorm.com/api/v1/cart';
};

interface CartState {
    items: any[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CartState = {
    items: [],
    status: 'idle',
    error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId: string) => {
    const API_URL = getApiUrl();
    const response = await fetch(`${API_URL}/get-cart-by-user/${userId}`);
    const data = await response.json();
    return data.response;
});

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async ({ productId, userId, productData, increment = true }: { productId: string; userId: string; productData: any; increment?: boolean }) => {
        const API_URL = getApiUrl();
        console.log("Adding to cart:", { productId, userId, productData, increment });

        // Backend expects productwithdates in AddProductToCart
        const body = {
            ...productData,
            productwithdates: productData.cartProduct || productData,
            inc: increment
        };

        const response = await fetch(`${API_URL}/add-to-cart/${productId}/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        console.log("Add to cart response:", data);
        return data.response;
    }
);

export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ productId, userId }: { productId: string; userId: string }) => {
        const API_URL = getApiUrl();
        const response = await fetch(`${API_URL}/delete-to-cart/${productId}/${userId}`);
        const data = await response.json();
        return productId; // Return id to filter out
    }
);

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ productId, userId, action }: { productId: string; userId: string; action: 'inc' | 'dec' }) => {
        const API_URL = getApiUrl();
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
                // Backend returns a flat list of products from GetCartDataByUser
                state.items = (action.payload || []).map((item: any) => ({
                    _id: item._id, // This is the product _id
                    cartProduct: item,
                    selQty: item.selQty || 1
                }));
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch cart';
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                const cartDoc = action.payload;
                if (!cartDoc || !cartDoc.cartProduct) return;

                // Backend returns the cart document which contains the product in cartProduct array
                const product = Array.isArray(cartDoc.cartProduct) ? cartDoc.cartProduct[0] : cartDoc.cartProduct;
                if (!product) return;

                const normalizedItem = {
                    _id: product._id,
                    cartProduct: product,
                    selQty: product.selQty || 1
                };

                const existingIndex = state.items.findIndex((item: any) =>
                    item.cartProduct._id === normalizedItem.cartProduct._id
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
                const cartDoc = action.payload;
                if (!cartDoc || !cartDoc.cartProduct) return;

                const product = Array.isArray(cartDoc.cartProduct) ? cartDoc.cartProduct[0] : cartDoc.cartProduct;
                if (!product) return;

                const normalizedItem = {
                    _id: product._id,
                    cartProduct: product,
                    selQty: product.selQty || 1
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
