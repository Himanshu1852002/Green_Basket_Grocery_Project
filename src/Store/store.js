import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from './wishlistSlice';
import productReducer from './productsSlice';
import cartReducer from './cartSlice'
// import orderReducer from './orderSlice'


const store = configureStore({
    reducer: {
        wishlist: wishlistSlice,
        products: productReducer,
        cart: cartReducer,
        // order:orderReducer
    }
})

export default store