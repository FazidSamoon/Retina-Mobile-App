import { createSlice } from "@reduxjs/toolkit";
import {
  LongDIstanceVisionTestSteps,
  PersonalizedDistance,
} from "../../components/molecules/LongDistanceVisionTest/LongDistanceVIsionTestTypes";

export const VisionTestChallengesSlice = createSlice({
  name: "challenges",
  initialState: {
    challenges: [],
    personalizedDistance: PersonalizedDistance.FOURMETER,
    startLine: LongDIstanceVisionTestSteps.SIZE_202_6,
    userLevels: {
      _id: "",
      user: "",
      year: 2024,
      level: 1,
      xpGained: 0,
      maxXpPerLevel: 100,
    },
  },
  reducers: {
    setChallenges: (state, action) => {
      state.challenges = action.payload;
    },
    setPersonalizedDistanceGlobal: (state, action) => {
      state.personalizedDistance = action.payload;
    },
    setPersonalizedStartLineGLobal: (state, action) => {
      state.startLine = action.payload;
    },
    setUserLevel: (state, action) => {
      state.userLevels = action.payload;
    },
  },
});

export const {
  setChallenges,
  setPersonalizedDistanceGlobal,
  setPersonalizedStartLineGLobal,
  setUserLevel
} = VisionTestChallengesSlice.actions;
export const selectChallenges = (state) => state.challenges.challenges;
export const selectPersonalizeDistance = (state) =>
  state.challenges.personalizedDistance;
export const selectPersonalizeStartLine = (state) => state.challenges.startLine;
export const selectUserLevels = (state) => state.challenges.userLevels;
export default VisionTestChallengesSlice.reducer;
