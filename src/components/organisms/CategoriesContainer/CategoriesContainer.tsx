import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { CategoriesCardType } from "./categoriesCardTypes";
import CategoriesCard from "../../molecules/CategoriesCard/CategoriesCard";

const cards: CategoriesCardType[] = [
  {
    title: "Check Vision Task",
    description: "Check your vision task and complete it.",
    imageSrc: require("../../../assets/visionTestcardImg.png"),
    ontapLink: "VisionTestHome",
    backgroundColor: "#A99BFF",
  },
  {
    title: "Eye Exercise",
    description: "Do some eye exercise to improve your vision.",
    imageSrc: require("../../../assets/eyeExerciseCardImg.png"),
    ontapLink: "EyeExercisiseHome",
    backgroundColor: "#FF9BE3",
  },
  {
    title: "Channel Doctors",
    description: "Consult with our doctors for better vision.",
    imageSrc: require("../../../assets/channelDoctorCardImg.png"),
    ontapLink: "ChannelDoctorsScreen",
    backgroundColor: "#FFBF9B",
  },














  {
    title: "Check Diabetes",
    description: "Check your vision and complete the task.",
    imageSrc: require("../../../assets/visionTestcardImg.png"),
    ontapLink: "Diabatic",
    backgroundColor: "#8FAAFF",
  },
  {
    title: "Find Nearby Clinics",
    description: "Do some eye exercises to improve your vision.",
    imageSrc: require("../../../assets/eyeExerciseCardImg.png"),
    ontapLink: "RetinClinicLoc",
    backgroundColor: "#FFA0D0",
  },
  {
    title: "Check Retinopathy",
    description: "Consult with our doctors for better vision.",
    imageSrc: require("../../../assets/channelDoctorCardImg.png"),
    ontapLink: "Retinopathy",
    backgroundColor: "#FFAA99",
  },
  {
    title: "Health Tips",
    description: "Check your vision and complete the task.",
    imageSrc: require("../../../assets/visionTestcardImg.png"),
    ontapLink: "HealthTips",
    backgroundColor: "#8FAAFF",
  },
  
  {
    title: "Survay",
    description: "Do some eye exercise to improve your vision.",
    imageSrc: require("../../../assets/eyeExerciseCardImg.png"),
    ontapLink: "EyeExercisiseHome",
    backgroundColor: "#FF9BE3",
  },
  {
    title: "Diabatic Info",
    description: "Do some eye exercises to improve your vision.",
    imageSrc: require("../../../assets/eyeExerciseCardImg.png"),
    ontapLink: "DiabaticInfo",
    backgroundColor: "#FFA0D0",
  },
  {
    title: "Retinopathy info",
    description: "Check your vision and complete the task.",
    imageSrc: require("../../../assets/visionTestcardImg.png"),
    ontapLink: "RetinopathyInfo",
    backgroundColor: "#8FAAFF",
  },
  {
    title: "DiabetesPedigree checker",
    description: "Check your vision and complete the task.",
    imageSrc: require("../../../assets/visionTestcardImg.png"),
    ontapLink: "DiabetesPedigree",
    backgroundColor: "#8FAAFF",
  },
  {
    title: "BMICalculator",
    description: "Check your vision and complete the task.",
    imageSrc: require("../../../assets/visionTestcardImg.png"),
    ontapLink: "BMICalculator",
    backgroundColor: "#8FAAFF",
  },
  
  
  
];

const CategoriesContainer = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "600",
          marginBottom: 10,
        }}
      >
        Categories
      </Text>
      <View
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <ScrollView
          
        // showsVerticalScrollIndicator={true}
        // scrollEnabled
        // alwaysBounceVertical
        // horizontal={false}
        // style={{
        //   //   width: "100%",
        //   height: "100%",
        // }}
        >
          {cards.map((card, index) => {
            return (
              <View key={index}>
                <CategoriesCard
                  title={card.title}
                  description={card.description}
                  imageSrc={card.imageSrc}
                  ontapLink={card.ontapLink}
                  backgroundColor={card.backgroundColor}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default CategoriesContainer;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    // height: "100%",
  },
});
