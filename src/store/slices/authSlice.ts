import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        authenticated: false,
        verificationCode: "",
        email: ""
    },
    reducers: {
        setAuthenticated: (state, action) => {
            state.authenticated = action.payload;
        },
        setVerificationCode: (state, action) => {
            state.verificationCode = action.payload
        },
        setEmail: (state, action) => {
            state.email = action.payload
        }
    },
});

export const { setAuthenticated, setVerificationCode, setEmail } = AuthSlice.actions;

export const selectAuthenticated = (state) => state.auth.authenticated;
export const selectVerificationCode = (state) => state?.auth?.verificationCode;
export const selectEmail = (state) => state.auth.email;
export default AuthSlice.reducer;