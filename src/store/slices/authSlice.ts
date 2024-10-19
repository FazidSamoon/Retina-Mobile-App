import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: "auth",
    initialState: {
        authenticated: false,
        verificationCode: "",
        email: "",
        userId: "",
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
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        }
    },
});

export const { setAuthenticated, setVerificationCode, setEmail, setUserId } = AuthSlice.actions;

export const selectAuthenticated = (state) => state.auth.authenticated;
export const selectVerificationCode = (state) => state?.auth?.verificationCode;
export const selectEmail = (state) => state.auth.email;
export const selectUserId = (state) => state.auth.userId;
export default AuthSlice.reducer;