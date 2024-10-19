import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SpeechBubble = ({ message, position = "left" }) => {
  return (
    <View
      style={[
        styles.container,
        position === "left" ? styles.leftAlign : styles.rightAlign,
      ]}
    >
      <View
        style={[
          styles.bubble,
          position === "left" ? styles.bubbleLeft : styles.bubbleRight,
        ]}
      >
        <Text style={styles.text}>{message}</Text>
        <View
          style={[
            styles.arrow,
            position === "left" ? styles.arrowLeft : styles.arrowRight,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  leftAlign: {
    justifyContent: "flex-start",
  },
  rightAlign: {
    justifyContent: "flex-end",
  },
  bubble: {
    padding: 10,
    borderRadius: 10,
    position: "relative",
  },
  bubbleLeft: {
    backgroundColor: "#109BE7",
  },
  bubbleRight: {
    backgroundColor: "#4CAF50",
  },
  text: {
    color: "#fff",
    fontSize: 22,
  },
  arrow: {
    position: "absolute",
    width: 0,
    height: 0,
    borderStyle: "solid",
  },
  arrowLeft: {
    top: "50%",
    left: -10,
    borderWidth: 10,
    borderColor: "transparent",
    borderRightColor: "#109BE7",
    transform: [{ translateY: -10 }],
  },
  arrowRight: {
    top: "50%",
    right: -10,
    borderWidth: 10,
    borderColor: "transparent",
    borderLeftColor: "#4CAF50",
    transform: [{ translateY: -10 }],
  },
});

export default SpeechBubble;
