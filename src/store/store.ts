import { configureStore } from "@reduxjs/toolkit";
import authenticatorReducer from "./slices/authSlice";
import recommondationReducer from "./slices/recommondationSlice";
import challengesReducer from "./slices/visionTestChallengesSlice"

const store = configureStore({
  reducer: {
    authenticatorReducer,
    challengesReducer,
    recommondationReducer,
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
