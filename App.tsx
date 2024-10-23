import React, { useEffect, useState } from "react";
import Navigators from "./src/navigators";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from 'react-native';

const scheduleDailyNotification = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status === 'granted') {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Vision Test Reminder",
        body: "It's time to perform your vision test!",
      },
      trigger: {
        hour: 9,
        minute: 0,
        repeats: true,
      },
    });
  }

};

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        showBadge: true,
        enableLights: true,

      });
    }
    scheduleDailyNotification();
  }, []);
  // const [showPicker, setShowPicker] = useState(false);
  // const [selectedTime, setSelectedTime] = useState(null);

  // useEffect(() => {

  //   const requestPermissions = async () => {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     if (status !== "granted") {
  //       alert("You need to enable notifications to receive reminders!");
  //     }
  //   };
  //   requestPermissions();
  //   const loadReminderTime = async () => {
  //     const timeString = await AsyncStorage.getItem("reminderTime");
  //     if (timeString) {
  //       const { hours, minutes } = JSON.parse(timeString);
  //       setSelectedTime(new Date().setHours(hours, minutes));
  //       scheduleNotification(hours ?? 12, minutes ?? 25); // Reschedule on app load
  //     }
  //   };

  //   loadReminderTime();
  // }, []);

  // const scheduleNotification = async (hours, minutes) => {

  //   console.log("hey ")
  //   console.log(hours, minutes)
  //   const trigger = {
  //     hour: hours,
  //     minute: minutes,
  //     repeats: true,
  //   };

  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: "Vision Check Reminder",
  //       body: "It's time to check your vision today!",
  //     },
  //     trigger,
  //   });
  // };

  // const handleTimeChange = async (event, date) => {
  //   if (date) {
  //     setSelectedTime(date); // Update selected time
  //     const hours = date.getHours();
  //     const minutes = date.getMinutes();

  //     // Save the time in AsyncStorage
  //     await AsyncStorage.setItem(
  //       "reminderTime",
  //       JSON.stringify({ hours, minutes })
  //     );

  //     // Schedule the notification
  //     await scheduleNotification(hours, minutes);

  //     setShowPicker(false); // Hide the picker
  //   }
  // };
  return <Navigators />;
};

export default App;
