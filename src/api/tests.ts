import axios from "axios";
import { API_URL } from "./config";


export const getAverageTestScore = async (userId: string) => {
  let apiSuccess = null;
  let apiError = null;
  try {
    const response = await axios.get(`${API_URL}/test-results/average-user/${userId}`);
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};

