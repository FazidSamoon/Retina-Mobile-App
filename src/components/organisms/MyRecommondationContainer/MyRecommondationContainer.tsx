import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import { AuthScreensParamList } from "../../../navigators/RootNavigator/types";

const MyRecommondationContainer = () => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();

  const navigateTo = () => {
    navigation.navigate("MealsRecommend");
  };

  return (
    <View>
      <VisionHomeScreenTopAppBar
        header="My Recommondation"
        navigateTo={navigateTo}
      />
    </View>
  );
};

export default MyRecommondationContainer;
