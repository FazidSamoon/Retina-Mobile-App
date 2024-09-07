import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { VisionTestChallenge } from "../../../utils/types/commonTypes";
import RPPrimaryButton from "../../../components/atoms/RPPrimaryButton/RPPrimaryButton";

const ChannelDoctorsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ChannelDoctorsScreen</Text>
    </SafeAreaView>
  );
};

export default ChannelDoctorsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "white",
  },
});
