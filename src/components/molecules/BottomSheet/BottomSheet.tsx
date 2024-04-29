import { StyleSheet, Text, View } from "react-native";
import React from "react";

const BottomSheetComponent = () => {
  return (
    <View
      style={{
        backgroundColor: "red",
        height: 300,
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
      }}
    >
      <View style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
        marginTop: 10,
        alignItems: "center",
      }}>
        <View
          style={{
            backgroundColor: "#C4C4C4",
            height: 5,
            width: "30%",
            borderRadius: 5,
            position: "absolute",
          }}
        />

      </View>
    </View>
  );
};

export default BottomSheetComponent;
