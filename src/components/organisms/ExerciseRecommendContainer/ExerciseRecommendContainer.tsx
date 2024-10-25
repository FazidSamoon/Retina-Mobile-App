import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { getExercises } from "../../../utils/common/excersiseRecommender";
import {
  binaryAnswerData,
  bloodPressureData,
  exercisesData,
} from "../../../data/dropdowndata";
import {
  exerciseValidationSchema,
  myInfoValidationSchema,
} from "../../../utils/validations";
import {
  getDataFromAsyncStorage,
  removeDataFromAsyncStorage,
  setDataToAsyncStorage,
} from "../../../utils/common/commonUtil";
import {
  exerciseWeightages,
  initialExersiceValues,
} from "../../../data/mealPrefernces";
import { set } from "date-fns";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const basicColors = [
  "#f94144",
  "#f8961e",
  "#f9844a",
  "#f3722c",
  "#f9c74f",
  "#90be6d",
  "#43aa8b",
  "#4d908e",
  "#577590",
  "#277da1",
  "#6680B3",
];

type ExerciseData = { exercise: string; value: number };

type ChartData = {
  labels: string[];
  data: number[];
  colors: string[];
};

const ExerciseRecommendContainer = () => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();
  const [myInfoModal, setMyInfoModal] = useState(false);
  const [logExerciseModal, setLogExerciseModal] = useState(false);
  const [myHealthInfo, setMyHealthInfo] = useState<any>();
  const [recommendedExercises, setRecommendedExercises] = useState<string[]>();
  const [exerciseValues, setExerciseValues] = useState<
    { exercise: string; value: number }[]
  >([]);
  const [chartData, setChartData] = useState<ChartData>();

  useEffect(() => {
    fetchHealthInfo();
  }, []);

  useEffect(() => {
    if (myHealthInfo) {
      getRecommendedExercises(myHealthInfo);
    }
  }, [myHealthInfo]);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    const x = await getExerciseValues();

    if (!x || x.length === 0) {
      await addInitialExerciseValues();
      await getExerciseValues();
    }
  };

  const addInitialExerciseValues = async () => {
    await setDataToAsyncStorage("exerciseValues", initialExersiceValues);
  };

  const getExerciseValues = async () => {
    const exersiceValues = await getDataFromAsyncStorage("exerciseValues");
    setChartData(await convertToChartData(exersiceValues));
    setExerciseValues(exersiceValues);
    return exersiceValues;
  };

  const getMyHealthInfo = async () => {
    const myHealthInfo = await getDataFromAsyncStorage("myHealthInfo");
    return myHealthInfo;
  };

  const fetchHealthInfo = async () => {
    try {
      const info = await getMyHealthInfo();
      setMyHealthInfo(info);
    } catch (error) {
      console.error("Failed to fetch health info", error);
    }
  };

  const getRecommendedExercises = (myInfo: any) => {
    const exercises = getExercises(myInfo);
    setRecommendedExercises(exercises);
  };

  const generateColorsArray = (length: number) => {
    const colorsArray = [];
    for (let i = 0; i < length; i++) {
      colorsArray.push(basicColors[i]);
    }
    return colorsArray;
  };

  const convertToChartData = async (
    input: ExerciseData[]
  ): Promise<ChartData> => {
    try {
      const filteredData = input.filter((item) => item.value > 0);

      const labels = filteredData.map((item) => item.exercise);
      const data = filteredData.map((item) =>
        parseFloat((item.value / 150).toFixed(2))
      );

      // Await colors if generateColorsArray returns a promise
      const colors = await generateColorsArray(filteredData.length);

      return { labels, data, colors };
    } catch (error) {
      console.error("Error generating chart data:", error);

      // Return default data structure in case of error
      return { labels: [], data: [], colors: [] };
    }
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  };

  const weightageCalculator = (exerciseName: string, value: number) => {
    const exercise = exerciseWeightages.find(
      (item) => item.exercise === exerciseName
    );

    return exercise ? value * exercise.weightage : 0;
  };

  const handleLogExercise = (exerciseName: string, loggedTime: string) => {
    const updatedExerciseValues = exerciseValues.map((item) => {
      if (item.exercise === exerciseName) {
        return {
          exercise: item.exercise,
          value:
            item.value >= 1
              ? item.value
              : item.value +
                weightageCalculator(exerciseName, parseInt(loggedTime)),
        };
      }
      return item;
    });

    setDataToAsyncStorage("exerciseValues", updatedExerciseValues).then(() => {
      getExerciseValues();
    });
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
      exerciseFormik.resetForm();
    },
  });

  const handleMyInfoUpdate = async (values: any) => {
    if (values) {
      await setDataToAsyncStorage("myHealthInfo", values);
      getRecommendedExercises(values);
      setMyHealthInfo(values);
      fetchHealthInfo();
    }
  };

  const myInfoFormik = useFormik({
    initialValues: {
      retinopathy: myHealthInfo?.retinopathy || "",
      age: myHealthInfo?.age || "",
      heartProblems: myHealthInfo?.heartProblems || "",
      bloodPressure: myHealthInfo?.bloodPressure || "",
    },
    enableReinitialize: true,
    validationSchema: myInfoValidationSchema,
    onSubmit: (values) => {
      handleMyInfoUpdate(values);
      setMyInfoModal(false);
    },
  });

  const navigateTo = () => {
    navigation.navigate("RecommendHome");
  };

  return (
    <>
      <View>
        <VisionHomeScreenTopAppBar
          header="My Exercise"
          navigateTo={navigateTo}
        />
        <Text style={styles.text}>Weekly Exercise Progress</Text>
        <View style={styles.card}>
          {chartData && (
            <>
              <ProgressChart
                data={chartData}
                width={screenWidth / 1.2}
                height={220}
                strokeWidth={12}
                radius={24}
                chartConfig={chartConfig}
                hideLegend={false}
                withCustomBarColorFromData
              />
            </>
          )}
        </View>
        <Text style={styles.text}>Recommended Exercises</Text>
        <View style={styles.card}>
          <Text
            style={styles.myInfoTouchable}
            onPress={() => {
              setMyInfoModal(true);
            }}
          >
            My Info
          </Text>

          <View style={styles.list}>
            {recommendedExercises &&
              recommendedExercises.map((exercise, index) => (
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
            exerciseFormik.setFieldTouched("exerciseName", true);
          }}
          options={exercisesData}
          labelStyle={styles.labelStyle}
          error={exerciseFormik.errors.exerciseName}
        />

        {/* Time Input Field */}
        <RPInputField
          inputLabel={"Time"}
          inputPlaceholder={"Enter time in minutes"}
          onChangeText={(e) => {
            exerciseFormik.setFieldValue("exerciseTime", e);
            exerciseFormik.setFieldTouched("exerciseTime", true);
          }}
          value={exerciseFormik.values.exerciseTime}
          labelStyles={styles.labelStyle}
          inputStyle={RPSInputFieldStyle.OUTLINED}
          inputTextStyles={styles.inputTextStyles}
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
    marginBottom: 20,
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
    fontSize: 16,
  },
  myInfoTouchable: {
    color: "blue",
    alignSelf: "flex-end",
    paddingTop: 10,
    paddingEnd: 20,
    fontWeight: "700",
  },
});
