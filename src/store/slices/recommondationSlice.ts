import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
  mealPreference: string;
  weight: number;
  height: number;
  mealType: string;
  exerciseLevel: string;
}

interface RecommondationState {
  userData: UserData;
}

const initialState: RecommondationState = {
  userData: {
    mealPreference: "Vegetarian",
    weight: 40,
    height: 175,
    mealType: "Breakfast",
    exerciseLevel: "Low",
  },
};

const RecommondationSlice = createSlice({
  name: "recommondation",
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = { ...state.userData, ...action.payload };
      console.log(action.payload);
    },
  },
});

export const { updateUserData } = RecommondationSlice.actions;
export default RecommondationSlice.reducer;
