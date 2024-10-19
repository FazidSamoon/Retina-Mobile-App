import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  mealPreference: string;
  weight: number;
  height: number;
  mealType: string;
  exerciseLevel: string;
}

interface RecommendedActions {
  state: number;
  mainMealAction: number;
  otherMealsActions: number[];
}

interface RecommondationState {
  user_id: string;
  userData: UserData;
  recommendedActions: RecommendedActions;
}

const initialState: RecommondationState = {
  user_id: "I029",
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
