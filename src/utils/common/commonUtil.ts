import AsyncStorage from "@react-native-async-storage/async-storage";
import { DateTime } from "luxon";
import { ToastAndroid } from "react-native";

export const getLuxonDateTime = (date: string) => {
  return DateTime.fromISO(date);
};

export const getDateMonthAndYear = (
  date: Date
): {
  dayOfTheWeek: number;
  month: number;
  year: number;
} => {
  const dayOfTheWeek = date.getDay();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return { dayOfTheWeek, month, year };
};

export const getCurrentWeek = () => {
  const dateTime = getLuxonDateTime(new Date().toISOString());
  const week = dateTime.weekNumber;
  return week;
};

export const getDayStringOfTheWeek = (date: Date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
};

export const getDataFromAsyncStorage = async (key: string) => {
  const data = await AsyncStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const setDataToAsyncStorage = async (key: string, data: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const removeDataFromAsyncStorage = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export const showToastWithGravityAndOffset = (message) => {
  ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    25,
    50
  );
};
