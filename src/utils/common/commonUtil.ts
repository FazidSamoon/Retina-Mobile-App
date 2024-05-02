import { DateTime } from "luxon";

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
}

export const getDayStringOfTheWeek = (date: Date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[date.getDay()];
};