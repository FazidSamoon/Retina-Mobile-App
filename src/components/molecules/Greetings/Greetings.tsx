import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Greetings = () => {
  const username = "Fazid";

  const date = new Date();
  const greetText =
    date.getHours() < 12
      ? "Good Morning"
      : date.getHours() < 18
      ? "Good Afternoon"
      : "Good Evening";
  return (
    <View>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "800"
        }}
      >
        Hello {username}!
      </Text>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "500",
        }}
      >
        {greetText} 🙌
      </Text>
    </View>
  );
};

export default Greetings;

const styles = StyleSheet.create({});
