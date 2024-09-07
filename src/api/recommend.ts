import axios from "axios";
import { RecommendAPI } from "./config";

export const getMealRecommendation = async (data: {
  user_id: string;
  state: number;
}) => {
  let apiSuccess = null;
  let apiError = null;
  let activityNumber = null;

  const { user_id, state } = data;

  try {
    const response = await axios.get(`${RecommendAPI}/v3/recommendations`, {
      params: {
        user_id,
        state,
      },
    });

    activityNumber = response.data.activity;
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError, activityNumber };
};

export const getOtherMealRecommendations = async (data: { state: number }) => {
  let apiSuccess = null;
  let apiError = null;
  let activityNumbers: number[] = [];

  const { state } = data;

  try {
    const response = await axios.get(
      `${RecommendAPI}/v3/recommendations/get_expert_1?state=2`,
      {
        params: {
          state,
        },
      }
    );

    activityNumbers = response.data.actions;
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError, activityNumbers };
};
