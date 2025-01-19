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
            });
    },
});

export default orderSlice.reducer;
