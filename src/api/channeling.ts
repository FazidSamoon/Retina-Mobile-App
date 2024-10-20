import axios from "axios";
import { API_URL } from "./config";
import { Channeling } from "../utils/types/commonTypes";

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

export const getUserRewards = async (userId: string) => {
  let apiSuccess = null;
  let apiError = null;
  try {
    const response = await axios.get(`${API_URL}/reward/user/${userId}`);
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};

export const addChanneling = async (payload) => {
  let apiSuccess = null;
  let apiError = null;
  try {
    const response = await axios.post(`${API_URL}/channeling`, payload);
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};

export const getChannelingsByPatient = async (patientId: string) => {
  let apiSuccess: Channeling[] = [];
  let apiError = null;
  try {
    const response = await axios.get(
      `${API_URL}/channeling/patient/${patientId}`
    );
    apiSuccess = response.data.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};
