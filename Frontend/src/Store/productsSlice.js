import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// eslint-disable-next-line no-undef
const url = process.env.REACT_APP_API_BASE_URL;

const initialState = {
    products: [],
    status: 'idle',
    error: null,
}

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',

    async (category) => {
        console.log("Category ", category)
        const resonse = await axios.get(`${url}/api/product/list?category=${category}`);
        console.log("Response data ",resonse.data);
        return resonse.data.data;

    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.status = 'succeeded',
                    state.products = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const selectAllProducts = (state) => state.products.products;
export const getProductsStatus = (state) => state.products.status;
export const getProductsError = (state) => state.products.error;

export default productsSlice.reducer;