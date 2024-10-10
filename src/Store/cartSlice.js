import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increaseItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.item_id === newItem.item_id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.item_price;
            } else {
                state.cartItems.push({
                    item_id: newItem.item_id,
                    imgSrc: newItem.imgSrc,
                    item_name: newItem.item_name,
                    item_price: newItem.item_price,
                    quantity: 1,
                    totalPrice: newItem.item_price,
                });
                state.totalQuantity++;
            }
            state.totalAmount += newItem.item_price;
        },
        decreaseItem(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.item_id === id);
            if (existingItem) {
                state.totalAmount -= existingItem.item_price;
                if (existingItem.quantity === 1) {
                    state.cartItems = state.cartItems.filter((item) => item.item_id !== id);
                } else {
                    existingItem.quantity--;
                    existingItem.totalPrice -= existingItem.item_price;
                }
                state.totalQuantity--;
            }
        },
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.item_id === newItem.item_id);

            if (!existingItem) {
                state.cartItems.push({
                    item_id: newItem.item_id,
                    imgSrc: newItem.imgSrc,
                    item_name: newItem.item_name,
                    item_price: newItem.item_price,
                    quantity: 1,
                    totalPrice: newItem.item_price,
                });
                state.totalQuantity++;
                state.totalAmount += newItem.item_price;
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.item_id === id);

            if (existingItem) {
                state.cartItems = state.cartItems.filter((item) => item.item_id !== id);
                state.totalQuantity--;
                state.totalAmount -= existingItem.totalPrice;
            }
        },

    },
});

export const { increaseItem, decreaseItem, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
