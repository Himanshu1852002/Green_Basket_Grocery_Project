import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null, // initial state with an empty token
};

const tokenSlice = createSlice({
    name: "auth", // slice name
    initialState, // initial state from above
    reducers: {
        setToken(state, action) {
            state.token = action.payload; // set token value
        },
        clearToken(state) {
            state.token = null; // clear the token value
        },
    },
});

export const { setToken, clearToken } = tokenSlice.actions; // exporting actions
export default tokenSlice.reducer; 
