import { StyleSheet, Text, View } from "react-native";
import React from "react";
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";


const RecommendHomeContainer = () => {
  return (
    <View >
        <VisionHomeScreenTopAppBar header="Recommend Home" />
        <Text>Recommend Home</Text>
    </View>
  );
};

export default RecommendHomeContainer;