import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice';
import wishlistSlice from './wishlistSlice';
import navbarReducer from './navbarSlice';
import tokenReducer from './tokenSlice';

const store = configureStore({
    reducer: {
        navbar: navbarReducer,
        cart: cartReducer,
        wishlist: wishlistSlice,
        auth: tokenReducer,
    }
})

export default store