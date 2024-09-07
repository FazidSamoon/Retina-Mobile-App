import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  mealPreference: string;
  weight: number;
  height: number;
  mealType: string;
  exerciseLevel: string;
}

export interface RecommendedActions {
  state: number;
  mainMealAction: number;
  otherMealsActions: number[];
}

interface RecommondationState {
  userData: UserData;
  recommendedActions: RecommendedActions;
}

const initialState: RecommondationState = {
  userData: {
    mealPreference: "Vegetarian",
    weight: 40,
    height: 175,
    mealType: "Breakfast",
    exerciseLevel: "Low",
  },
  recommendedActions: {
    state: 0,
    mainMealAction: 0,
    otherMealsActions: [],
  },
};

const RecommondationSlice = createSlice({
  name: "recommondation",
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = { ...state.userData, ...action.payload };
    },
    setRecommondedActions: (
      state,
      action: PayloadAction<RecommendedActions>
    ) => {
      state.recommendedActions = action.payload;
    },
  },
});

export const { updateUserData, setRecommondedActions } =
  RecommondationSlice.actions;
export default RecommondationSlice.reducer;
