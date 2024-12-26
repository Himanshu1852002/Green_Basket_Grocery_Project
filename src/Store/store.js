import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from './wishlistSlice';
import navbarReducer from './navbarSlice';
import productReducer from './productsSlice';
import cartReducer from './cartSlice'


const store = configureStore({
    reducer: {
        navbar: navbarReducer,
        wishlist: wishlistSlice,
        products: productReducer,
        cart: cartReducer
    }
})

export default store