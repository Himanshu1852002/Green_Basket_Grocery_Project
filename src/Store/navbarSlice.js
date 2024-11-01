import { createSlice } from "@reduxjs/toolkit";

const navbarSlice = createSlice({
    name: 'navbar',
    initialState:{
        isNavOpen: false,
    },
    reducers:{
        toggleNav: (state)=>{
            state.isNavOpen = !state.isNavOpen;
        },
        closeNav: (state)=>{
            state.isNavOpen=false;
        },
    },
});

export const {toggleNav,closeNav}=navbarSlice.actions;
export default navbarSlice.reducer;