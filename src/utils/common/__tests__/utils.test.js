import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastAndroid } from "react-native";
import { getCurrentWeek, getDataFromAsyncStorage, getDateMonthAndYear, getDayStringOfTheWeek, getLuxonDateTime, showToastWithGravityAndOffset } from "../commonUtil";


jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock("react-native/Libraries/Components/ToastAndroid/ToastAndroid", () => ({
  showWithGravityAndOffset: jest.fn(),
}));

describe("Utility Functions", () => {
  describe("getLuxonDateTime", () => {
    it("should return a valid Luxon DateTime object", () => {
      const date = "2024-10-22T10:00:00";
      const result = getLuxonDateTime(date);
      expect(result.isValid).toBe(true);
      expect(result.year).toBe(2024);
      expect(result.month).toBe(10);
    });
  });

  describe("getDateMonthAndYear", () => {
    it("should return the correct day, month, and year", () => {
      const date = new Date("2024-10-22T10:00:00");
      const result = getDateMonthAndYear(date);
      expect(result.dayOfTheWeek).toBe(2);
      expect(result.month).toBe(9);
      expect(result.year).toBe(2024);
    });
  });

  describe("getCurrentWeek", () => {
    it("should return the current week number", () => {
      const result = getCurrentWeek();
      const expectedWeek = DateTime.now().weekNumber;
      expect(result).toBe(expectedWeek);
    });
  });

  describe("getDayStringOfTheWeek", () => {
    it("should return the correct day string", () => {
      const date = new Date("2024-10-22T10:00:00");
      const result = getDayStringOfTheWeek(date);
      expect(result).toBe("Tuesday");
    });
  });

  describe("getDataFromAsyncStorage", () => {
    it("should return parsed data from AsyncStorage", async () => {
      const mockData = { name: "Test" };
      AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockData));

      const result = await getDataFromAsyncStorage("testKey");
      expect(AsyncStorage.getItem).toHaveBeenCalledWith("testKey");
      expect(result).toEqual(mockData);
    });

    it("should return null if no data found in AsyncStorage", async () => {
      AsyncStorage.getItem.mockResolvedValueOnce(null);

      const result = await getDataFromAsyncStorage("testKey");
      expect(result).toBeNull();
    });
  });

  describe("setDataToAsyncStorage", () => {
    it("should set data to AsyncStorage", async () => {
      const mockData = { name: "Test" };
      await setDataToAsyncStorage("testKey", mockData);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "testKey",
        JSON.stringify(mockData)
      );
    });
  });

  describe("removeDataFromAsyncStorage", () => {
    it("should remove data from AsyncStorage", async () => {
      await removeDataFromAsyncStorage("testKey");

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith("testKey");
    });
  });

  describe("showToastWithGravityAndOffset", () => {
    it("should show a toast message with gravity and offset", () => {
      const message = "Test Message";
      showToastWithGravityAndOffset(message);

      expect(ToastAndroid.showWithGravityAndOffset).toHaveBeenCalledWith(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    });
  });
});