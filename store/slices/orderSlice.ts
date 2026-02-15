import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://api.velorm.com/api/v1/order';

interface OrderState {
    orders: any[];
    currentOrder: any | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: OrderState = {
    orders: [],
    currentOrder: null,
    status: 'idle',
    error: null,
};

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (orderData: any) => {
        const response = await fetch(`${API_URL}/create-new-order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });
        const data = await response.json();
        return data;
    }
);

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () => {
    // Assuming backend has a simplified endpoint or we filter by user elsewhere?
    // Backend: router.get("/get-all-orders", GetAllOrder);
    // This seems to get ALL orders (admin?). There isn't a "get-orders-by-user" in the visible route file.
    // userrouter has /payment-id-by-order/:orderId
    // For now, we'll placeholder this or maybe we don't need to fetch history yet.
    // Let's just implement createOrder for checkout.
    return [];
});

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.currentOrder = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to create order';
            });
    },
});

export default orderSlice.reducer;
