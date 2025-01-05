// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const url = "http://localhost:3000";
// export const placeOrderAPI = createAsyncThunk(
//     'cart/placeOrderAPI',
//     async ({ token,amount }, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(`${url}/api/orders/createOrder`, {
//                 amount

//             }, { headers: { Authorization: `Bearer ${token}` } });
//             console.log(response.data)
//             if (response.data.success) {
//                 return response.data;
//             } else {
//                 throw new Error(response.data.message);
//             }
//         } catch (error) {
//             return rejectWithValue(error.response?.data || 'Something went wrong');
//         }
//     }
// );

// export const verifyOrderAPI = createAsyncThunk(
//     'cart/verifyOrderAPI',
//     async ({ token, razorpay_order_id, razorpay_payment_id, razorpay_signature }, { rejectWithValue }) => {
//         try {
//             const response = await axios.post(`${url}/api/orders/verifyOrder`, {
//                 razorpay_order_id,
//                 razorpay_payment_id,
//                 razorpay_signature
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',

//                     Authorization: `Bearer ${token}`
//                 },

//             });
//             console.log('Verification Response:', response);
//             if (response.data.success) {
//                 return response.data;
//             }
//             throw new Error('Verification failed');
//         } catch (error) {
//             return rejectWithValue(error.response?.data || 'Something went wrong');
//         }
//     }
// );


// const orderSlice = createSlice({
//     name: "order",
//     initialState: {
//         orderDetails: null,
//         cartItems: {},
//         status: 'idle',
//         error: null,
//         totalCartAmount: 0,
//         orderStatus: 'idle',
//         orderError: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(placeOrderAPI.pending, (state) => {
//                 state.orderStatus = 'loading';
//                 state.orderError = null;
//             })
//             .addCase(placeOrderAPI.fulfilled, (state, action) => {
//                 console.log("Actions in cart ", action.payload)
//                 state.orderDetails = action.payload;
//                 state.orderStatus = 'success';
//                 state.cartItems = {};
//                 state.totalCartAmount = 0;
//             })
//             .addCase(placeOrderAPI.rejected, (state, action) => {
//                 state.orderError = action.payload;
//                 state.orderStatus = 'failed';
//             })
//             .addCase(verifyOrderAPI.pending, (state) => {
//                 state.orderStatus = 'verifying';
//             })
//             .addCase(verifyOrderAPI.fulfilled, (state, action) => {
//                 if (action.payload.success) {
//                     state.orderStatus = 'verified';
//                     // Navigate to the verification page or update any other state if needed
//                 } else {
//                     state.orderError = action.payload.message;
//                     state.orderStatus = 'verification_failed';
//                 }
//             })
//     }
// })
// export default orderSlice.reducer;