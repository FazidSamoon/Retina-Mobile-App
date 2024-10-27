import axios from "axios";
import { API_URL } from "./config";
import { RegisterUserRequest } from "../utils/types/commonTypes";
import { useMutation } from "@tanstack/react-query";

export const registerUser = async (data: RegisterUserRequest) => {
  let apiSuccess = null;
  let apiError = null;
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};

export const loginUser = async (data: { email: string; password: string }) => {
  let apiSuccess = null;
  let apiError = null;
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    apiSuccess = response.data;
  } catch (error) {
    apiError = error;
  }

  return { apiSuccess, apiError };
};

export const registerQTable = (data: RegisterUserRequest) => {
  const username = data.username;
  const Q_TABLE_API_URL = `https://retina-care-recoomend-server-565418b38e96.herokuapp.com/api/v3/recommendations/new_user?user_id=${username}`;

  try {
    axios.post(`${Q_TABLE_API_URL}`);
  } catch (error) {
    console.log("error", error);
  }
};
