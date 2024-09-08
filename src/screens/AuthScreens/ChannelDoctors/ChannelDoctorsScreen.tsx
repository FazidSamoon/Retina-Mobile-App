import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { VisionTestChallenge } from "../../../utils/types/commonTypes";
import RPPrimaryButton from "../../../components/atoms/RPPrimaryButton/RPPrimaryButton";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import AllDoctorsCard from "../../../components/molecules/AllDoctorsCard/AllDoctorsCard";

const ChannelDoctorsScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.container}>
      <VisionHomeScreenTopAppBar header={"Find Doctors"} />

      <AllDoctorsCard />

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
