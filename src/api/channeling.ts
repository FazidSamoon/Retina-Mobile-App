import axios from "axios";
import { API_URL } from "./config";

export const getChannelingAvailability = async (payload: {
  doctorId: string;
  date: string;
  startTime: string;
  endTime: string;
}) => {
  let apiSuccess = null;
  let apiError = null;
  try {
    const response = await axios.post(
      `${API_URL}/channeling/availability`,
      payload
    );
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};
