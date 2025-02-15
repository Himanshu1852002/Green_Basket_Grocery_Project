import { configureStore } from "@reduxjs/toolkit";
import wishlistSlice from './wishlistSlice';
import productReducer from './productsSlice';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice'
import dashboardReducer from './adminDashSlice'

const store = configureStore({
    reducer: {
        wishlist: wishlistSlice,
        products: productReducer,
        cart: cartReducer,
        order: orderReducer,
        dashboard: dashboardReducer
    }
})

export default store