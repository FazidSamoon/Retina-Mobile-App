import AsyncStorage from "@react-native-async-storage/async-storage";

export const isProd = true;

export const API_URL = isProd
  ? "https://retina-mobile-app-bankend.vercel.app/api/v1"
  : "http://192.168.8.138:3005/api/v1";

export const RecommendAPI = isProd
  ? "https://retina-care-recoomend-server-565418b38e96.herokuapp.com/api/"
  : "https://retina-care-recoomend-server-565418b38e96.herokuapp.com/api/";

export const getAccessToken = async () => {
  const user = await AsyncStorage.getItem("user");
  if (user) {
    return JSON.parse(user).accessToken;
  }
  return null;
};
