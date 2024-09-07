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
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
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
    const response = await axios.post(
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
    apiSuccess = response.data;
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