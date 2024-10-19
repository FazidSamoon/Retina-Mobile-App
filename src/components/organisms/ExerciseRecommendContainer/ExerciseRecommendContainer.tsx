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
import { BASIC_COLORS } from "../../../utils/constants/styles";
import RPInputField from "../../atoms/RPInputField/RPInputField";
import { RPSInputFieldStyle } from "../../atoms/RPInputField/inputFieldTypes";
import RPPickerInput from "../../atoms/RPPickerInput/RPPickerInput";
import { useFormik } from "formik";
import CustomModal from "../../molecules/Recommondations/ExerciseRecommondations/CustomModal";
import {
  binaryAnswerData,
  bloodPressureData,
  exercisesData,
} from "../../../data/dropdowndata";
import {
  exerciseValidationSchema,
  myInfoValidationSchema,
} from "../../../utils/validations";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const ExerciseRecommendContainer = () => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();
  const [myInfoModal, setMyInfoModal] = useState(false);
  const [logExerciseModal, setLogExerciseModal] = useState(false);

  const navigateTo = () => {
    navigation.navigate("RecommendHome");
  };

  const exercises = ["Jogging", "Swimming", "Push-ups", "Squats"];

  const sampleChartData = {
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

  const handleLogExercise = (exerciseName: string, loggedTime: string) => {
    console.log("Exercise logged:", exerciseName, "for", loggedTime, "minutes");
  };

  const exerciseFormik = useFormik({
    initialValues: {
      exerciseName: "",
      exerciseTime: "",
    },
    validationSchema: exerciseValidationSchema,
    onSubmit: () => {
      setLogExerciseModal(false);
      handleLogExercise(
        exerciseFormik.values.exerciseName,
        exerciseFormik.values.exerciseTime
      );
    },
  });

  const handleMyInfoUpdate = (values: any) => {
    console.log("My Info Updated:", values);
  };

  const myInfoFormik = useFormik({
    initialValues: {
      retinopathy: "",
      age: "",
      heartProblems: "",
      bloodPressure: "",
    },
    validationSchema: myInfoValidationSchema,
    onSubmit: (values) => {
      handleMyInfoUpdate(values);
      setMyInfoModal(false);
    },
  });

  return (
    <>
      <View>
        <VisionHomeScreenTopAppBar
          header="My Exercise"
          navigateTo={navigateTo}
        />
        <Text style={styles.text}>Weekly Exercise Progress</Text>
        <View style={styles.card}>
          <ProgressChart
            data={sampleChartData}
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
          buttonTitle={"Log Exercise"}
          buttonStyle={styles.customButtonStyle}
          buttonTextStyle={styles.customButtonTextStyle}
          onPress={() => {
            setLogExerciseModal(!logExerciseModal);
          }}
        />
      </View>

      {/* Custom Modal for My Info */}
      <CustomModal
        visible={myInfoModal}
        title="My Info"
        onClose={() => setMyInfoModal(false)}
      >
        {/* Retinopathy Picker */}
        <RPPickerInput
          label="Retinopathy"
          selectedValue={myInfoFormik.values.retinopathy}
          onValueChange={(value) =>
            myInfoFormik.setFieldValue("retinopathy", value)
          }
          options={binaryAnswerData}
          labelStyle={styles.labelStyle}
          error={
            myInfoFormik.touched.retinopathy && myInfoFormik.errors.retinopathy
          }
        />

        {/* Age Input */}
        <RPInputField
          inputLabel={"Age"}
          inputPlaceholder={"Enter Age"}
          onChangeText={(text) => myInfoFormik.setFieldValue("age", text)}
          value={myInfoFormik.values.age}
          labelStyles={styles.labelStyle}
          inputStyle={RPSInputFieldStyle.OUTLINED}
          inputContainerStyle={styles.inputContainerStyle}
          inputTextStyles={styles.inputTextStyles}
          keyboardType={"numeric"}
          error={
            myInfoFormik.touched.age && myInfoFormik.errors.age ? true : false
          }
          errorMessage={myInfoFormik.errors.age as string}
        />

        {/* Heart Problems Picker */}
        <RPPickerInput
          label="Heart Problems"
          selectedValue={myInfoFormik.values.heartProblems}
          onValueChange={(value) =>
            myInfoFormik.setFieldValue("heartProblems", value)
          }
          options={binaryAnswerData}
          labelStyle={styles.labelStyle}
          error={
            myInfoFormik.touched.heartProblems &&
            myInfoFormik.errors.heartProblems
          }
        />

        {/* Blood Pressure Picker */}
        <RPPickerInput
          label="Blood Pressure"
          selectedValue={myInfoFormik.values.bloodPressure}
          onValueChange={(value) =>
            myInfoFormik.setFieldValue("bloodPressure", value)
          }
          error={
            myInfoFormik.touched.bloodPressure &&
            myInfoFormik.errors.bloodPressure
          }
          options={bloodPressureData}
          labelStyle={styles.labelStyle}
        />

        {/* Update Info Button */}
        <RPPrimaryButton
          buttonType={ButtonType.PRIMARY}
          buttonTitle="Update Info"
          onPress={myInfoFormik.handleSubmit}
          buttonTextStyle={styles.customButtonTextStyle}
          buttonStyle={styles.customButtonStyle}
          disabled={!myInfoFormik.isValid}
        />
      </CustomModal>

      {/* Custom Modal for Log Exercise Modal */}
      <CustomModal
        visible={logExerciseModal}
        title="Log Exercise"
        onClose={() => setLogExerciseModal(false)}
      >
        {/* Exercise Picker Input */}
        <RPPickerInput
          label="Exercise"
          selectedValue={exerciseFormik.values.exerciseName}
          onValueChange={(value) => {
            exerciseFormik.setFieldValue("exerciseName", value);
            exerciseFormik.setFieldTouched("exerciseName", true); // Mark field as touched
          }}
          options={exercisesData}
          labelStyle={styles.labelStyle}
          error={
            exerciseFormik.touched.exerciseName &&
            exerciseFormik.errors.exerciseName
          }
        />

        {/* Time Input Field */}
        <RPInputField
          inputLabel={"Time"}
          inputPlaceholder={"Enter time in minutes"}
          onChangeText={(e) => {
            exerciseFormik.setFieldValue("exerciseTime", e);
            exerciseFormik.setFieldTouched("exerciseTime", true); // Mark field as touched
          }}
          value={exerciseFormik.values.exerciseTime}
          labelStyles={styles.labelStyle}
          inputStyle={RPSInputFieldStyle.OUTLINED}
          inputContainerStyle={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: BASIC_COLORS.LIGHT_GRAY,
          }}
          keyboardType={"numeric"}
          error={
            exerciseFormik.touched.exerciseTime &&
            exerciseFormik.errors.exerciseTime
              ? true
              : false
          }
          errorMessage={exerciseFormik.errors.exerciseTime as string}
        />

        {/* Log Exercise Button */}
        <RPPrimaryButton
          buttonType={ButtonType.PRIMARY}
          buttonTitle={"Log Exercise"}
          buttonTextStyle={styles.customButtonTextStyle}
          buttonStyle={styles.customButtonStyle}
          disabled={!exerciseFormik.isValid} // Disable button if form is invalid
          onPress={exerciseFormik.handleSubmit}
        />
      </CustomModal>
    </>
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
  customButtonStyle: {
    borderRadius: 10,
    height: 60,
    paddingVertical: 10,
    backgroundColor: BASIC_COLORS.LIGHT_BLUE,
    borderWidth: 0,
    marginTop: 20,
  },
  customButtonTextStyle: {
    color: BASIC_COLORS.BLACK,
    fontWeight: "500",
    fontSize: 16,
  },
  labelStyle: {
    fontSize: 12,
    fontWeight: "normal",
  },
  inputContainerStyle: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: BASIC_COLORS.LIGHT_GRAY,
  },
  inputTextStyles: {
    color: BASIC_COLORS.FONT_PRIMARY,
    fontWeight: "400",
  },
});
