import { View, StyleSheet, Text, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import RPInputField from "../../../atoms/RPInputField/RPInputField";
import RPPickerInput from "../../../atoms/RPPickerInput/RPPickerInput";
import { BASIC_COLORS } from "../../../../utils/constants/styles";
import { RootState } from "../../../../store/store";
import RPPrimaryButton from "../../../atoms/RPPrimaryButton/RPPrimaryButton";
import { updateUserData } from "../../../../store/slices/recommondationSlice";
import { mealFormValidationSchema } from "../../../../utils/validations";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthScreensParamList } from "../../../../navigators/RootNavigator/types";
import CompletionIcon from "../../../../assets/CompletionIcon";
import { Circle } from "react-native-animated-spinkit";
import {
  exerciseLevelOptions,
  mealPreferenceOptions,
  mealTypeOptions,
} from "../../../../data/mealPrefernces";

const MealInfoForm = () => {
  const navigation = useNavigation<NavigationProp<AuthScreensParamList>>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      setLoading(true);
      setShowModal(true);
    },
  });

  useEffect(() => {
    if (showModal) {
      const timeout = setTimeout(() => {
        setLoading(false);
        setShowModal(false);
        navigation.navigate("MyRecommondation");
      }, 3000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showModal]);

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
          disabled={!formik.isValid}
          buttonStyle={{ height: 60 }}
        />
      </View>

      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <CompletionIcon />
            <View style={styles.modalContent}>
              <Text style={styles.textPrimary}>
                Preparing your meal Recommendation!
              </Text>
              <View style={styles.lineStyles} />
            </View>
            {loading && <Circle size={60} color="#109BE7" animating />}
          </View>
        </View>
      </Modal>
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
  lineStyles: {
    width: 180,
    backgroundColor: BASIC_COLORS.PRIMARY,
    borderWidth: 1,
    marginBottom: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    width: "80%",
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    marginTop: 20,
    gap: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});