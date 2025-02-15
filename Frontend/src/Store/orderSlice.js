import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { userId, getState, rejectWithValue }) => {
    const { url, token } = getState().cart;
    try {
        const response = await axios.post(`${url}/api/orders/userOrder`, { userId }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
    }
});

export const cancelOrder = createAsyncThunk(
    'orders/cancelOrder',
    async ({ orderId, cancelReason,cancelledBy }, { getState, rejectWithValue }) => {
        const { url, token } = getState().cart;

        try {
            const response = await axios.post(
                `${url}/api/orders/orderCancel/${orderId}`,
                { cancelReason, cancelledBy },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data.updatedOrder;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
)

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch cases
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // cancel addcases
            .addCase(cancelOrder.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Update the specific order in the state
                state.orders = state.orders.map((order) =>
                    order._id === action.payload._id ? action.payload : order
                );
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default orderSlice.reducer;
