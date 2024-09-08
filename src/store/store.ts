import { configureStore } from "@reduxjs/toolkit";
import authenticatorReducer from "./slices/authSlice";
import challengesReducer from "./slices/visionTestChallengesSlice"

const store = configureStore({
  reducer: {
    authenticatorReducer,
    challengesReducer
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;