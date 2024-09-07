import axios from "axios";

export const getMealRecommendation = async (data: {
  user_id: string;
  state: number;
}) => {
  let apiSuccess = null;
  let apiError = null;
  let activityNumber = null;

  const { user_id, state } = data;

  try {
    const response = await axios.get(
      "https://retina-care-recoomend-server-565418b38e96.herokuapp.com/api/v2/recommendations",
      {
        params: {
          user_id,
          state,
        },
      }
    );

    activityNumber = response.data.activity;
    console.log("activityNumber", activityNumber);
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError, activityNumber };
};
//`${RecommendAPI}/v2/recommendations?user_id=${userObj}&state=${state}`
