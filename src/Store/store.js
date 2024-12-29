import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from './wishlistSlice';
import productReducer from './productsSlice';
import cartReducer from './cartSlice'


const store = configureStore({
    reducer: {
        wishlist: wishlistSlice,
        products: productReducer,
        cart: cartReducer
    }
})

export default store