import { StyleSheet, Text, View } from "react-native";
import React from "react";
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import EyeExerciseTopAppBar from "../../molecules/EyeExerciseTopAppBar/EyeExerciseTopAppBar";
import { ScrollView } from "react-native-gesture-handler";
import EyeExerciseTab from "../../molecules/EyeExerciseTab/EyeExerciseTab";

const eyeExercises: EyeExerciseType[] = [
  {
    title: "Palming",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imgSrc: require("../../../assets/palming.png"),
  },
  {
    title: "Eye Moves",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imgSrc: require("../../../assets/eyeMoves.png"),
  },
  {
    title: "Near & Far Focusing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imgSrc: require("../../../assets/nearFarFocus.png"),
  },
  {
    title: "Eye Musckes Training",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imgSrc: require("../../../assets/eyeMusclesTraining.png"),
  },
  {
    title: "Hyperopia Prevention",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imgSrc: require("../../../assets/hyoeropia.png"),
  },
];

export type EyeExerciseType = {
  title: string;
  description: string;
  imgSrc: any;
};
const EyeExerciseContainer = () => {
  return (
    <View>
      <EyeExerciseTopAppBar header="Eye Exercise" />

      <ScrollView
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {eyeExercises.map((key, index) => (
          <EyeExerciseTab
            title={eyeExercises[index].title}
            description={eyeExercises[index].description}
            imgSrc={eyeExercises[index].imgSrc}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default EyeExerciseContainer;

const styles = StyleSheet.create({});
