import AsyncStorage from "@react-native-async-storage/async-storage";

export const isProd = false;

export const API_URL = isProd
  ? "https://retina-mobile-app-bankend.vercel.app/api/v1"
  : "https://retina-mobile-app-bankend.vercel.app/api/v1";

export const getAccessToken = async () => {
  const user = await AsyncStorage.getItem("user");
  if (user) {
    return JSON.parse(user).accessToken;
  }
  return null;
};