import { createSlice } from "@reduxjs/toolkit";

export interface UserData {
  mealPreference: string;
  weight: string;
  height: string;
  mealType: string;
  exerciseLevel: string;
}

interface RecommondationState {
  userData: UserData;
}

const initialState: RecommondationState = {
  userData: {
    mealPreference: "Vegetarian",
    weight: "40kg",
    height: "175 cm",
    mealType: "Breakfast",
    exerciseLevel: "Low",
  },
};

const RecommondationSlice = createSlice({
  name: "recommondation",
  initialState,
  reducers: {},
});

export default RecommondationSlice.reducer;
export const {} = RecommondationSlice.actions;
