import axios from "axios";
import { API_URL } from "./config";

export const getMonthlyChallanges = async (userId: string) => {
  let apiSuccess = null;
  let apiError = null;
  try {
    // const response = await axios.get(`${API_URL}/test-results/average-user/${userId}`);
    const response = await axios.get(
      `http://172.28.4.145:3005/api/v1/challanges/monthly-challange/${userId}`
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
    // const response = await axios.get(`${API_URL}/test-results/average-user/${userId}`);
    const response = await axios.get(
      `http://172.28.4.145:3005/api/v1/challanges/check-challange-availability/${userId}`
    );
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};
