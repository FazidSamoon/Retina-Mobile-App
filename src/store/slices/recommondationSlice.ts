import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { recommendationActions } from "../../utils/types/data";

interface UserData {
  mealPreference: string;
  weight: number;
  height: number;
  mealType: string;
  exerciseLevel: string;
}

interface Recommendation {
  _id: number;
  action_name: string;
}

interface RecommondationState {
  userData: UserData;
  mainMeal: Recommendation | null;
  otherMeals: Recommendation[];
  loading: boolean;
  error: string | null;
}

const initialState: RecommondationState = {
  userData: {
    mealPreference: "Vegetarian",
    weight: 40,
    height: 175,
    mealType: "Breakfast",
    exerciseLevel: "Low",
  },
  mainMeal: null,
  otherMeals: [],
  loading: false,
  error: null,
};

const RecommondationSlice = createSlice({
  name: "recommondation",
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = { ...state.userData, ...action.payload };
    },
    setMainMeal: (state, action: PayloadAction<number>) => {
      const mainMeal = recommendationActions.find(
        (meal) => meal._id === action.payload
      );
      state.mainMeal = mainMeal || null;
    },
    setOtherMeals: (state, action: PayloadAction<number[]>) => {
      const otherMeals = action.payload.map(
        (id) => recommendationActions.find((meal) => meal._id === id)!
      );
      state.otherMeals = otherMeals;
    },
  },
});

export const { updateUserData, setMainMeal, setOtherMeals } =
  RecommondationSlice.actions;
export default RecommondationSlice.reducer;
