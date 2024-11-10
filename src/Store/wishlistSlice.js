import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: {
        items: [],
    },
    reducers: {
        addToWishlist: (state, action) => {
            if (!state.items.find(item => item.item_id === action.payload.item_id)) {
                state.items.push(action.payload); // add item if not already in the wishlist
            }
        },
        removeFromWishlist: (state, action) => {
            state.items = state.items.filter(item => item.item_id !== action.payload); // remove item
        },
    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;