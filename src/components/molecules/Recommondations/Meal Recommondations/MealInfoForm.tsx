import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import RPInputField from "../../../atoms/RPInputField/RPInputField";
import RPPickerInput from "../../../atoms/RPPickerInput/RPPickerInput";
import { BASIC_COLORS } from "../../../../utils/constants/styles";
import { RootState } from "../../../../store/store";
import RPPrimaryButton from "../../../atoms/RPPrimaryButton/RPPrimaryButton";
import { updateUserData } from "../../../../store/slices/recommondationSlice"; // Action to update Redux
import { mealFormValidationSchema } from "../../../../utils/validations";

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

  const formik = useFormik({
    initialValues: {
      mealPreference: userData.mealPreference,
      weight: userData.weight,
      height: userData.height,
      mealType: userData.mealType,
      exerciseLevel: userData.exerciseLevel,
    },
    validationSchema: mealFormValidationSchema,
    onSubmit: (values) => {
      dispatch(updateUserData(values));
      console.log("Updated Values: ", values);
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.formHeader}>My Information</Text>

      {/* Meal Preference Dropdown */}
      <RPPickerInput
        label="Meal Preference"
        selectedValue={formik.values.mealPreference}
        onValueChange={(value) => formik.setFieldValue("mealPreference", value)}
        options={mealPreferenceOptions}
        error={formik.errors.mealPreference}
      />

      {/* Weight Input */}
      <RPInputField
        inputLabel="Weight (kg)"
        inputContainerStyle={styles.customInputFieled}
        labelStyles={styles.customLabelStyle}
        inputPlaceholder="Enter your weight"
        inputTextStyles={styles.customTextInputColor}
        onChangeText={(text) => formik.setFieldValue("weight", text)}
        value={formik.values.weight.toString()}
        error={formik.errors.weight ? true : false}
        errorMessage={formik.errors.weight}
      />

      {/* Height Input */}
      <RPInputField
        inputLabel="Height (cm)"
        inputContainerStyle={styles.customInputFieled}
        labelStyles={styles.customLabelStyle}
        inputPlaceholder="Enter your height"
        inputTextStyles={styles.customTextInputColor}
        onChangeText={(text) => formik.setFieldValue("height", text)}
        value={formik.values.height.toString()}
        error={formik.errors.height ? true : false}
        errorMessage={formik.errors.height}
      />

      {/* Meal Type Dropdown */}
      <RPPickerInput
        label="Meal Type"
        selectedValue={formik.values.mealType}
        onValueChange={(value) => formik.setFieldValue("mealType", value)}
        options={mealTypeOptions}
        error={formik.errors.mealType}
      />

      {/* Exercise Level Dropdown */}
      <RPPickerInput
        label="Exercise Level"
        selectedValue={formik.values.exerciseLevel}
        onValueChange={(value) => formik.setFieldValue("exerciseLevel", value)}
        options={exerciseLevelOptions}
        error={formik.errors.exerciseLevel}
      />

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <RPPrimaryButton
          buttonTitle={"Recommend Meal"}
          onPress={formik.handleSubmit}
          disabled={formik.isSubmitting || !formik.isValid}
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
  customTextInputColor: {
    color: BASIC_COLORS.FONT_PRIMARY,
  },
});
