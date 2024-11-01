import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import wishlistSlice from './wishlistSlice';
import navbarReducer from './navbarSlice';

const store = configureStore({
    reducer: {
        navbar:navbarReducer,
        cart: cartReducer,
        wishlist: wishlistSlice,
    }
})

export default store