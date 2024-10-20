import axios from "axios";
import { API_URL } from "./config";
import { UserLevelResponseType } from "../components/molecules/LongDistanceVisionTest/LongDistanceVIsionTestTypes";

export const getMonthlyChallanges = async (userId: string) => {
  let apiSuccess = null;
  let apiError = null;
  try {
    const response = await axios.get(
      `${API_URL}/challanges/monthly-challange/${userId}`
    );

    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};

export const checkChallangesAvailability = async (userId: string) => {
  let apiSuccess = null;
  let apiError = null;
  try {
    const response = await axios.get(
      `${API_URL}/challanges/check-challange-availability/${userId}`
    );

    apiSuccess = await response.data;
  } catch (error) {
    apiError = await error;
  }

  return { apiSuccess, apiError };
};

export const updateUserChallengesCompletion = async (
  userId: string,
  challengesList: string[]
) => {
  let apiSuccess = null;
  let apiError = null;
  try {
    const response = await axios.patch(
      `${API_URL}/challanges/update-completion/${userId}`,
      {
        challengesIds: challengesList,
      }
    );
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};

export const getUserLevels = async (userId: string) => {
  let apiSuccess: UserLevelResponseType = null;
  let apiError = null;
  try {
    const response = await axios.get(`${API_URL}/level/user/${userId}`);
    apiSuccess = response.data.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};

export const updateUserLevels = async (userId: string, changeValue: number) => {
  let apiSuccess = null;
  let apiError = null;
  try {
    const response = await axios.patch(`${API_URL}/level/user/${userId}`, {
      changeValue,
    });
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};

export const getUserSubscriptions = async (userId: string) => {
  let apiSuccess = null;
  let apiError = null;
  try {
    const response = await axios.get(`${API_URL}/doctor/get-user-subscription/${userId}`);
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};


export const getLeaderboard = async (userId: string) => {
  let apiSuccess = null;
  let apiError = null;
  try {
    const response = await axios.get(`${API_URL}/level/leaderboard/${userId}`);
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};

