/* eslint-disable no-undef */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = process.env.REACT_APP_API_BASE_URL;

// Async Thunks for API Calls
export const fetchUserCount = createAsyncThunk('dashboard/fetchUserCount', async () => {
    const response = await axios.get(`${url}/api/user/userCount`);
    return response.data.count;
});

export const fetchProductCount = createAsyncThunk('dashboard/fetchProductCount', async () => {
    const response = await axios.get(`${url}/api/product/productCount`);
    return response.data.count;
});

export const fetchOrderCount = createAsyncThunk('dashboard/fetchOrderCount', async () => {
    const response = await axios.get(`${url}/api/orders/orderCount`);
    return response.data.totalOrders;
});

// Initial state
const initialState = {
    userCount: 0,
    productCount: 0,
    orderCount: 0,
    status: 'idle', // or 'loading', 'failed'
    error: null
};

// Redux slice
const adminDashSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCount.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserCount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userCount = action.payload;
            })
            .addCase(fetchUserCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchProductCount.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductCount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productCount = action.payload;
            })
            .addCase(fetchProductCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchOrderCount.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrderCount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orderCount = action.payload;
            })
            .addCase(fetchOrderCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default adminDashSlice.reducer;
