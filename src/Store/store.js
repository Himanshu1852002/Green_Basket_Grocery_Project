import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import wishlistSlice from './wishlistSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        wishlist: wishlistSlice,
    }
})

export default store