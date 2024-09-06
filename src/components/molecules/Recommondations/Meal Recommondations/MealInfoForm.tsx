import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import RPInputField from "../../../atoms/RPInputField/RPInputField";
import RPPickerInput from "../../../atoms/RPPickerInput/RPPickerInput";
import { BASIC_COLORS } from "../../../../utils/constants/styles";
import { RootState } from "../../../../store/store";
import RPPrimaryButton from "../../../atoms/RPPrimaryButton/RPPrimaryButton";

const mealPreferenceOptions = [
  { label: "Vegetarian", value: "Vegetarian" },
  { label: "Non-Vegetarian", value: "Non-Vegetarian" },
  { label: "Vegan", value: "Vegan" },
];

const mealTypeOptions = [
  { label: "Breakfast", value: "Breakfast" },
  { label: "Lunch", value: "Lunch" },
  { label: "Dinner", value: "Dinner" },
];

const exerciseLevelOptions = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
];

const MealInfoForm = () => {
  const dispatch = useDispatch();
  const userData = useSelector(
    (state: RootState) => state.recommondationReducer.userData
  );

  const [mealPreference, setMealPreference] = useState<string>(
    userData.mealPreference
  );
  const [weight, setWeight] = useState<string>(userData.weight);
  const [height, setHeight] = useState<string>(userData.height);
  const [mealType, setMealType] = useState<string>(userData.mealType);
  const [exerciseLevel, setExerciseLevel] = useState<string>(
    userData.exerciseLevel
  );

  const handleRecommendMeal = () => {
    console.log({
      mealPreference,
      weight,
      height,
      mealType,
      exerciseLevel,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formHeader}>My Information</Text>

      {/* Meal Preference Dropdown */}
      <RPPickerInput
        label="Meal Preference"
        selectedValue={mealPreference}
        onValueChange={(value) => setMealPreference(value)}
        options={mealPreferenceOptions}
        error={mealPreference === "" ? "Please select a meal preference" : ""}
      />

      {/* Weight Input */}
      <RPInputField
        inputLabel="Weight"
        inputContainerStyle={styles.customInputFieled}
        labelStyles={styles.customLabelStyle}
        inputPlaceholder="Enter your weight"
        onChangeText={(text) => setWeight(text)}
        value={weight}
      />

      {/* Height Input */}
      <RPInputField
        inputLabel="Height"
        inputContainerStyle={styles.customInputFieled}
        labelStyles={styles.customLabelStyle}
        inputPlaceholder="Enter your height"
        onChangeText={(text) => setHeight(text)}
        value={height}
      />

      {/* Meal Type Dropdown */}
      <RPPickerInput
        label="Meal Type"
        selectedValue={mealType}
        onValueChange={(value) => setMealType(value)}
        options={mealTypeOptions}
      />

      {/* Exercise Level Dropdown */}
      <RPPickerInput
        label="Exercise Level"
        selectedValue={exerciseLevel}
        onValueChange={(value) => setExerciseLevel(value)}
        options={exerciseLevelOptions}
      />

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <RPPrimaryButton
          buttonTitle={"Recommend Meal"}
          onPress={handleRecommendMeal}
          buttonStyle={{ height: 60 }}
        />
      </View>
    </View>
  );
};

export default MealInfoForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: BASIC_COLORS.WHITE,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 20,
  },
  formHeader: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    color: BASIC_COLORS.FONT_PRIMARY,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  customInputFieled: {
    borderColor: BASIC_COLORS.LIGHT_GRAY,
    height: 45,
  },
  customLabelStyle: {
    fontWeight: "400",
  },
});
