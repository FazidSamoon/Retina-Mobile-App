import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import RetinopathyHomeScreenTopAppBar from "../TopBar/RetinopathyHomeScreenTopAppBar";

const NextScreeningInterval = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [timeLeft, setTimeLeft] = useState(0);
  const [screeningDate, setScreeningDate] = useState(null); // For displaying the screening date

  // Retrieve screening date and time left from storage or set it
  useEffect(() => {
    const getScreeningData = async () => {
      let storedScreeningDate = await AsyncStorage.getItem("screeningDate");
      let storedTimeLeft = await AsyncStorage.getItem("timeLeft");

      // If no date is stored, calculate and store the date 6 months from now
      if (!storedScreeningDate) {
        const newScreeningDate = moment().add(6, "months").toISOString();
        await AsyncStorage.setItem("screeningDate", newScreeningDate);
        storedScreeningDate = newScreeningDate;
      }

      setScreeningDate(moment(storedScreeningDate)); // Set the screening date for display

      // Calculate time left if not already stored or expired
      const timeUntilScreening = moment(storedScreeningDate).diff(
        moment(),
        "seconds"
      );
      if (!storedTimeLeft || timeUntilScreening <= 0) {
        setTimeLeft(timeUntilScreening);
        await AsyncStorage.setItem("timeLeft", timeUntilScreening.toString());
      } else {
        setTimeLeft(parseInt(storedTimeLeft));
      }
    };

    getScreeningData();
  }, []);

  // Countdown logic with useEffect
  useEffect(() => {
    const interval = setInterval(async () => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime > 0 ? prevTime - 1 : 0;
        AsyncStorage.setItem("timeLeft", newTime.toString()); // Store updated time
        return newTime;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Countdown finished callback
  useEffect(() => {
    if (timeLeft === 0 && screeningDate) {
      alert("It’s time for your next screening!");
    }
  }, [timeLeft]);

  // Handle "Done" button click to navigate to the home screen
  const handleDonePress = () => {
    navigation.navigate("Home"); // Replace 'Home' with the name of your home screen
  };

  // Convert timeLeft back into days, hours, minutes, seconds
  const formatTimeLeft = (seconds) => {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return { days, hours, minutes, secs };
  };

  const { days, hours, minutes, secs } = formatTimeLeft(timeLeft);

  return (
    <>
    
              <RetinopathyHomeScreenTopAppBar header={"Prediction"} />

    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Next Screening Interval</Text>
        <Text style={styles.title}>For Mild to moderate</Text>
      </View>

      {/* Display the screening date */}
      {screeningDate && (
        <Text style={styles.subtitle}>
          Next Screening Date: {screeningDate.format("MMMM Do, YYYY")}
        </Text>
      )}

     
      <Text style={styles.subtitle}>
        For patients with mild or moderate NPDR, the follow-up interval may
        vary, but it's usually between 6 months depending on the
        progression of the disease.
      </Text>

      {/* Custom Countdown Display */}
      <View style={styles.countdownContainer}>
        <View style={styles.countdownItem}>
          <Text style={styles.countdownDigit}>{days}</Text>
          <Text style={styles.countdownLabel}>Days</Text>
        </View>
        <View style={styles.countdownItem}>
          <Text style={styles.countdownDigit}>{hours}</Text>
          <Text style={styles.countdownLabel}>Hours</Text>
        </View>
        <View style={styles.countdownItem}>
          <Text style={styles.countdownDigit}>{minutes}</Text>
          <Text style={styles.countdownLabel}>Minutes</Text>
        </View>
        <View style={styles.countdownItem}>
          <Text style={styles.countdownDigit}>{secs}</Text>
          <Text style={styles.countdownLabel}>Seconds</Text>
        </View>
      </View>

      {/* Custom Done Button */}
      <TouchableOpacity style={styles.button} onPress={handleDonePress}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: 550,
    borderRadius: 15,
    backgroundColor: "#1E9DF9", // Blue background
    padding: 20,

    marginTop: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    backgroundColor: "#1E9DF9",
    padding: 10,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF", // White text for title
  },
  subtitle: {
    fontSize: 18,
    color: "#FFFFFF",
    marginBottom: 20,
  },
  countdownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  countdownItem: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  countdownDigit: {
    fontSize: 40,
    color: "#1E9DF9",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    borderColor: "#1E9DF9",
    borderWidth: 2,
  },
  countdownLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#1E9DF9",
    marginTop: 20,
  },
  buttonText: {
    color: "#1E9DF9",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NextScreeningInterval;
