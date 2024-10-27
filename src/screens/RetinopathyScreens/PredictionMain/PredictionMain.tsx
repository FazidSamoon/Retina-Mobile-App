import { View, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { AuthScreensParamList } from "../../../navigators/RootNavigator/types";
import VisionHomeScreenTopAppBar from "../../../components/molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import PrimaryRecommondationCard from "../../../components/molecules/Recommondations/PrimaryRecommondationCard";
import RetinopathyHomeScreenTopAppBar from "../TopBar/PredictHomeTopAppBar";
import PredictionHome from "../TopBar/PredictionHome";

const height = Dimensions.get("window").height;

const PredictionMain = () => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();

  const navigateToDiabatic = () => {
    navigation.navigate("Diabatic");
  };

  const navigateToRetinopathy = () => {
    navigation.navigate("Retinopathy");
  };

  return (
    <>
      <View style={styles.container}>
        



        
        <PredictionHome header="Prediction Main" />

        <View style={styles.cardsContainer}>
          <PrimaryRecommondationCard
            title="Predict Diabetic"
            onPress={navigateToDiabatic}
            backgroundSrc={{
              uri: "https://i.postimg.cc/FzPbtGV5/diabatic.png",
            }}
          />

          <PrimaryRecommondationCard
            title="Predict Retinopathy"
            onPress={navigateToRetinopathy}
            backgroundSrc={{
              uri: "https://i.postimg.cc/Kvzr7SmZ/retinopathy.png",
            }}
          />
        </View>
      </View>
    </>
  );
};

export default PredictionMain;

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
