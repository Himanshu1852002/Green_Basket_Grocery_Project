import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// eslint-disable-next-line no-undef
const url = process.env.REACT_APP_API_BASE_URL;

// Async actions
export const fetchProductList = createAsyncThunk('cart/fetchProductList', async () => {
    const response = await axios.get(`${url}/api/product/list`);
    return response.data.data;
});



export const fetchWishlist = createAsyncThunk(
    'wishlist/fetchWishlist',
    async (token) => {
        try {
            const response = await axios.post(`${url}/api/wishlist/get`, {}, { headers: { Authorization: `Bearer ${token}` } });
            return response.data.wishlistData;
        } catch (error) {
            return error("Failed to fetch wishlist");
        }
    }
);

export const addToWishlistAPI = createAsyncThunk(
    'wishlist/addToWishlistAPI',
    async ({ token, itemId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/api/wishlist/add`, { itemId }, { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.success) {
                return { itemId, quantity: 1 };
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to add item to wishlist");
        }
    }
);

export const removeFromWishlistAPI = createAsyncThunk(
    'wishlist/removeFromWishlistAPI',
    async ({ token, itemId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${url}/api/wishlist/remove`, { itemId }, { headers: { Authorization: `Bearer ${token}` } });
            if (response.data.success) {
                return { itemId, success: true };
            }
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to remove item from wishlist");
        }
    }
);

// Wishlist slice
const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: {},
        product_list: [],
        status: 'idle',
        error: null,
        token: localStorage.getItem('token') || ''
    },
    reducers: {
        setWishToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        clearWishToken: (state) => {
            state.token = null;
            localStorage.removeItem('token');
        },
        clearWishlistData: (state) => {
            state.items = {};

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductList.fulfilled, (state, action) => {
                state.product_list = action.payload || [];
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload || {};
            })
            .addCase(addToWishlistAPI.fulfilled, (state, action) => {
                const { itemId } = action.payload;
                if (!state.items[itemId]) {
                    state.items[itemId] = 1;
                } else {
                    state.items[itemId] += 1;
                }
            })
            .addCase(removeFromWishlistAPI.fulfilled, (state, action) => {
                const { itemId } = action.payload;
                if (state.items[itemId]) {
                    if (state.items[itemId] > 1) {
                        state.items[itemId] -= 1;
                    } else {
                        delete state.items[itemId];
                    }
                }
            })
            .addCase(removeFromWishlistAPI.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { setWishToken, clearWishToken, clearWishlistData } = wishlistSlice.actions;
export default wishlistSlice.reducer;
