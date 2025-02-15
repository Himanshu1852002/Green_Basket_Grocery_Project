import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = import.meta.env.VITE_API_BASE_URL;

// Async thunks
export const fetchProductList = createAsyncThunk('cart/fetchProductList', async () => {
    const response = await axios.get(`${url}/api/product/list`);
    return response.data.data;
});

export const loadCartData = createAsyncThunk('cart/loadCartData', async (token) => {
    const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { Authorization: `Bearer ${token}` } });
    if (response.data.success) {
        return response.data.cartdata; // Ensure this matches the response structure
    }
    throw new Error('Failed to load cart data');
});

export const addToCartAPI = createAsyncThunk('cart/addToCartAPI', async ({ itemId, quantity = 1, token }) => {
    await axios.post(`${url}/api/cart/add`, { itemId, quantity }, { headers: { Authorization: `Bearer ${token}` } });
    return { itemId, quantity };
});

export const removeFromCartAPI = createAsyncThunk('cart/removeFromCartAPI', async ({ itemId, token }) => {
    const response = await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { Authorization: `Bearer ${token}` } });
    if (response.data.success) {
        return { itemId };
    }
    throw new Error('Failed to remove item from cart');
});

const calculateTotalAmount = (state) => {
    return Object.entries(state.cartItems).reduce((total, [itemId, quantity]) => {
        const product = state.product_list.find((item) => item._id === itemId);
        return product ? total + product.sellingPrice * quantity : total;
    }, 0);
};


// Cart slice
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        product_list: [],
        cartItems: {},
        token: localStorage.getItem('token') || '',
        status: 'idle',
        error: null,
        totalCartAmount: 0,
        orderStatus: 'idle',
        orderError: null,
        url

    },
    reducers: {
        clearCartData: (state) => {
            state.cartItems = {}; // Empty the cart
            state.totalCartAmount = 0;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        clearToken: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductList.fulfilled, (state, action) => {
                state.product_list = action.payload || [];
                state.totalCartAmount = calculateTotalAmount(state);
            })
            .addCase(loadCartData.fulfilled, (state, action) => {
                state.cartItems = action.payload || {};
                state.totalCartAmount = calculateTotalAmount(state);
            })
            .addCase(addToCartAPI.fulfilled, (state, action) => {
                const { itemId, quantity } = action.payload;
                if (!state.cartItems[itemId]) {
                    state.cartItems[itemId] = quantity;
                } else {
                    state.cartItems[itemId] += quantity;
                }
                state.totalCartAmount = calculateTotalAmount(state);
            })
            .addCase(removeFromCartAPI.fulfilled, (state, action) => {
                const { itemId } = action.payload;
                if (state.cartItems[itemId]) {
                    if (state.cartItems[itemId] > 1) {
                        state.cartItems[itemId] -= 1;
                    } else {
                        delete state.cartItems[itemId];
                    }
                }
                state.totalCartAmount = calculateTotalAmount(state);
            })

    },
});

export const { setToken, clearToken, clearCartData } = cartSlice.actions;
export default cartSlice.reducer;
