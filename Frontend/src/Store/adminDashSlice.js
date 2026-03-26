import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const fetchUserCount = createAsyncThunk('dashboard/fetchUserCount', async () => {
    const res = await axios.get(`${url}/api/user/userCount`);
    return res.data.count;
});

export const fetchProductCount = createAsyncThunk('dashboard/fetchProductCount', async () => {
    const res = await axios.get(`${url}/api/product/productCount`);
    return res.data.count;
});

export const fetchOrderCount = createAsyncThunk('dashboard/fetchOrderCount', async () => {
    const res = await axios.get(`${url}/api/orders/orderCount`);
    return res.data.totalOrders;
});

export const fetchOrdersData = createAsyncThunk('dashboard/fetchOrdersData', async () => {
    const res = await axios.get(`${url}/api/orders/fetchAllOrders`);
    const orders = res.data.data || [];

    // Real total revenue from paid orders
    const totalRevenue = orders
        .filter(o => o.payment === true)
        .reduce((sum, o) => sum + o.amount, 0);

    // Today's orders
    const today = new Date().toDateString();
    const todayOrders = orders.filter(o => new Date(o.date).toDateString() === today).length;

    // Recent 5 orders
    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    // Monthly revenue for chart (last 6 months)
    const monthlyData = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = d.toLocaleString('en-IN', { month: 'short', year: '2-digit' });
        monthlyData[key] = { orders: 0, revenue: 0 };
    }
    orders.forEach(o => {
        const d = new Date(o.date);
        const key = d.toLocaleString('en-IN', { month: 'short', year: '2-digit' });
        if (monthlyData[key]) {
            monthlyData[key].orders += 1;
            if (o.payment) monthlyData[key].revenue += o.amount;
        }
    });

    return { totalRevenue, todayOrders, recentOrders, monthlyData };
});

export const fetchLowStock = createAsyncThunk('dashboard/fetchLowStock', async () => {
    const res = await axios.get(`${url}/api/product/lowStock`);
    return res.data.data || [];
});

const initialState = {
    userCount: 0,
    productCount: 0,
    orderCount: 0,
    totalRevenue: 0,
    todayOrders: 0,
    recentOrders: [],
    monthlyData: {},
    lowStock: [],
    status: 'idle',
    error: null,
};

const adminDashSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserCount.fulfilled,    (state, action) => { state.userCount    = action.payload; })
            .addCase(fetchProductCount.fulfilled, (state, action) => { state.productCount = action.payload; })
            .addCase(fetchOrderCount.fulfilled,   (state, action) => { state.orderCount   = action.payload; })
            .addCase(fetchOrdersData.pending,     (state)         => { state.status = 'loading'; })
            .addCase(fetchOrdersData.fulfilled,   (state, action) => {
                state.status       = 'succeeded';
                state.totalRevenue = action.payload.totalRevenue;
                state.todayOrders  = action.payload.todayOrders;
                state.recentOrders = action.payload.recentOrders;
                state.monthlyData  = action.payload.monthlyData;
            })
            .addCase(fetchOrdersData.rejected,    (state, action) => { state.status = 'failed'; state.error = action.error.message; })
            .addCase(fetchLowStock.fulfilled,     (state, action) => { state.lowStock = action.payload; });
    },
});

export default adminDashSlice.reducer;
