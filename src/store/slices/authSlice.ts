import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        authenticated: false,
    },
    reducers: {
        setAuthenticated: (state, action) => {
            state.authenticated = action.payload;
        },
    },
});

export const { setAuthenticated } = AuthSlice.actions;

export const selectAuthenticated = (state) => state.auth.authenticated;
export default AuthSlice.reducer;