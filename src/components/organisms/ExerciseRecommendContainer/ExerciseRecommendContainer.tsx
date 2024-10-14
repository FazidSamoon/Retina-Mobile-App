import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ProgressChart } from "react-native-chart-kit";
import VisionHomeScreenTopAppBar from "../../molecules/VisionHomeScreenTopAppBar/VisionHomeScreenTopAppBar";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthScreensParamList } from "../../../navigators/RootNavigator/types";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";
import { ButtonType } from "../../atoms/RPPrimaryButton/buttonTypes";
import { BottomSheet } from "@rneui/themed";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import { Modal } from "react-native";

const screenWidth = Dimensions.get("window").width;

const ExerciseRecommendContainer = () => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();
  const [loading, setLoading] = useState(false);
  const [myInfoModal, setMyInfoModal] = useState(false);
  const navigateTo = () => {
    navigation.navigate("RecommendHome");
  };

  const exercises = ["Jogging", "Swimming", "Push-ups", "Squats"];

  const data = {
    labels: ["Swim", "Bike", "Run", "Hike"],
    data: [0.4, 0.3, 0.3, 0.7],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 1,
    useShadowColorFromDataset: false,
  };
  return (
    <View>
      <VisionHomeScreenTopAppBar header="My Exercise" navigateTo={navigateTo} />
      <Text style={styles.text}>Weekly Exercise Progress</Text>
      <View style={styles.card}>
        <ProgressChart
          data={data}
          width={screenWidth / 1.3}
          height={220}
          strokeWidth={12}
          radius={24}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      </View>
      <Text style={styles.text}>Recommended Exercises</Text>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => {
            setMyInfoModal(true);
          }}
        >
          <Text
            style={{
              color: "blue",
              alignSelf: "flex-end",
              paddingTop: 10,
              paddingEnd: 20,
            }}
          >
            My Info
          </Text>
        </TouchableOpacity>
        <View style={styles.list}>
          {exercises.map((exercise, index) => (
            <Text key={index}>{exercise}</Text>
          ))}
        </View>
      </View>
      <RPPrimaryButton
        buttonType={ButtonType.PRIMARY}
        buttonTitle={"Submit Rating"}
        buttonStyle={{
          borderRadius: 5,
        }}
        onPress={() => {}}
      />
      <Modal animationType="slide" transparent={true} visible={myInfoModal}>
        <View
          style={{
            height: "100%",
          }}
        ></View>
      </Modal>
    </View>
  );
};

export default ExerciseRecommendContainer;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "auto",
    backgroundColor: "#e5e5e5",
    borderRadius: 12,
    marginTop: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
  },
  list: {
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 40,
    gap: 10,
  },
  backdropStyle: {
    maxHeight: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSheetContainer: {
    backgroundColor: BASIC_COLORS.WHITE,
    maxHeight: "70%",
    minHeight: "70%",
    position: "absolute",
    width: "100%",
    justifyContent: "flex-end",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    paddingVertical: 31,
    paddingHorizontal: 31,
  },
});
