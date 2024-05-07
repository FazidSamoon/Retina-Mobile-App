import AsyncStorage from "@react-native-async-storage/async-storage";

export const isProd = false;

export const API_URL = isProd
  ? "https://hortman-389391c01752.herokuapp.com/api/v1"
  : "http://172.20.10.10:3000/api/v1";


export const getAccessToken = async () => {
  const user = await AsyncStorage.getItem("user");
  if (user) {
    return JSON.parse(user).accessToken;
  }
  return null;
};
