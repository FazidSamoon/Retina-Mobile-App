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
    title: "Recommendations",
    description: "Get personalized dietary and exersize recommendations.",
    imageSrc: require("../../../assets/eyeExerciseCardImg.png"),
    ontapLink: "RecommendHome",
    backgroundColor: "#31d45c",
  },
  // {
  //   title: "Eye Exercise",
  //   description: "Do some eye exercise to improve your vision.",
  //   imageSrc: require("../../../assets/eyeExerciseCardImg.png"),
  //   ontapLink: "EyeExercisiseHome",
  //   backgroundColor: "#FF9BE3",
  // },
    imageSrc: require("../../../assets/retImages/ret3.png"),
    ontapLink: "RecommendHome",
    backgroundColor: "#31d45c",
  },
  
  {
    title: "Predictions",
    description: "Check your vision and diabtes .",
    imageSrc: require("../../../assets/retImages/ret2.png"),
    ontapLink: "PredictionMain",
    backgroundColor: "#36C2CE",
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
    title: "Community",
    description: "Help us improve our predictions",
    imageSrc: require("../../../assets/retImages/ret1.png"),
    ontapLink: "Survay",
    backgroundColor: "#77E4C8",
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
