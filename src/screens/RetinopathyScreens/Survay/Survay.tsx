import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AuthScreensParamList } from "../../../navigators/RootNavigator/types";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import PrimaryRecommondationCard from "../../../components/molecules/Recommondations/PrimaryRecommondationCard";
import RetinopathyHomeScreenTopAppBar from "../TopBar/RetinopathyHomeScreenTopAppBar";

const height = Dimensions.get("window").height;

const Survay = () => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();

  const navigateToSurvayPrediction = () => {
    navigation.navigate("SurvayPrediction");
  };

  const navigateToSurvayContribution = () => {
    navigation.navigate("SurvayContribution");
  };

  return (
    <>

    <View style={styles.container}>
      
    <RetinopathyHomeScreenTopAppBar header="Clinical Trials Main" />

      <View style={styles.cardsContainer}>
        <PrimaryRecommondationCard
          title="Survay Prediction"
          onPress={navigateToSurvayPrediction}
          backgroundSrc={{
            uri: "https://i.postimg.cc/Kvzr7SmZ/retinopathy.png",
          }}
        />

        <PrimaryRecommondationCard
          title="Survay Contribution"
          onPress={navigateToSurvayContribution}
          backgroundSrc={{
            uri: "https://i.postimg.cc/pTgn4yFJ/value-2.png",
          }}
        />
      </View>
    </View>
    </>
  );
};

export default Survay;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingVertical: 40,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "white",
  },
  cardsContainer: {
    flex: 1,
    gap: 30,
    paddingBottom: height * 0.1,
    justifyContent: "space-between",
  },
});
