import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const url = "http://localhost:3000";

const initialState = {
    products: [],
    status: 'idle',
    error: null,
}

export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',

    async (category) => {
        const resonse = await axios.get(`${url}/api/product/list?category=${category}`);
        console.log("response data", resonse.data)
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
                console.log("Succese fetch data", action.payload)
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