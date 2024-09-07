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

    apiSuccess = response.data.activity;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};

export const getOtherMealRecommendations = async (data: { state: number }) => {
  let apiSuccess = null;
  let apiError = null;

  const { state } = data;

  try {
    const response = await axios.get(
      `${RecommendAPI}/v3/recommendations/get_expert_1`,
      {
        params: {
          state,
        },
      }
    );

    apiSuccess = response.data.actions;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};
