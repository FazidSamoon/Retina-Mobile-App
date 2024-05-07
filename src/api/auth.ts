import axios from "axios";
import { API_URL } from "./config";
import { RegisterUserRequest } from "../utils/types/commonTypes";

export const registerUser = async (data: RegisterUserRequest) => {
  console.log(API_URL);
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

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
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
