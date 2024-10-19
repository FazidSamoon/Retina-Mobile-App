import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import RPInputField from "../../../atoms/RPInputField/RPInputField";
import { RPSInputFieldStyle } from "../../../atoms/RPInputField/inputFieldTypes";
import { BASIC_COLORS } from "../../../../utils/constants/styles";
import ForwardArrow from "../../../../assets/ForwardArrow";
import { QuickSetupTypes } from "../../../../screens/RootScreens/QuickSetupScreen/quickSetupTypes";
import { useFormik } from "formik";
import { createAccountValidationSchema } from "../../../../utils/validations";
import { ScrollView } from "react-native-gesture-handler";
import { RegisterUserRequest } from "../../../../utils/types/commonTypes";

const CreateAccount = ({
  setQuickSetupState,
  setRegistrationData,
}: {
  setQuickSetupState: React.Dispatch<React.SetStateAction<QuickSetupTypes>>;
  setRegistrationData: React.Dispatch<
    React.SetStateAction<RegisterUserRequest>
  >;
}) => {
  const onNextButtonPressed = () => {
    setQuickSetupState(QuickSetupTypes.QUISTIONAIRE);
  };

  const initialRegistrationData: {
    username: string;
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
  } = {
    username: "",
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  };

  const onSubmit = (values: any) => {
    if (!isButtonDisabled()) {
      setRegistrationData((prev) => ({
        ...prev,
        username: values.username,
        email: values.email,
        password: values.password,
        name: values.name,
      }));
      onNextButtonPressed();
    }
  };
  const formik = useFormik({
    initialValues: initialRegistrationData,
    onSubmit,
    validationSchema: createAccountValidationSchema,
    validateOnChange: true,
  });

  const { values, handleChange, handleSubmit, errors } = formik;

  const isButtonDisabled = () => {
    return Object.keys(errors).length > 0;
  };

  console.log(values);
  console.log("errors ", errors);
  return (
    <View style={styles.container}>
      <View style={styles.headingView}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subTitle}>Fill your information below</Text>
      </View>
      <ScrollView
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          height: Dimensions.get("window").height * 0.6,
        }}
      >
        <View
          style={{
            marginTop: 32,
          }}
        >
          <RPInputField
            inputLabel={"Name"}
            inputPlaceholder={"Enter your full name"}
            onChangeText={(e) => {
              formik.setFieldValue("name", e);
            }}
            value={values.name}
            inputStyle={RPSInputFieldStyle.OUTLINED}
            inputContainerStyle={{
              backgroundColor: "#F4F6F9",
            }}
            error={formik.errors.name ? true : false}
            errorMessage={formik.errors.name as string}
          />
        </View>

        <View
          style={{
            marginTop: 15,
          }}
        >
          <RPInputField
            inputLabel={"Email"}
            inputPlaceholder={"Enter your email address"}
            onChangeText={(e) => {
              formik.setFieldValue("email", e);
            }}
            value={values.email}
            inputStyle={RPSInputFieldStyle.OUTLINED}
            inputContainerStyle={{
              backgroundColor: "#F4F6F9",
            }}
            error={formik.errors.email ? true : false}
            errorMessage={formik.errors.email as string}
          />
        </View>

        <View
          style={{
            marginTop: 15,
          }}
        >
          <RPInputField
            inputLabel={"Username"}
            inputPlaceholder={"Enter your username"}
            onChangeText={(e) => {
              formik.setFieldValue("username", e);
            }}
            value={values.username}
            inputStyle={RPSInputFieldStyle.OUTLINED}
            inputContainerStyle={{
              backgroundColor: "#F4F6F9",
            }}
            error={formik.errors.username ? true : false}
            errorMessage={formik.errors.username as string}
          />
        </View>
        <View
          style={{
            marginTop: 15,
          }}
        >
          <RPInputField
            inputLabel={"Password"}
            inputPlaceholder={"********"}
            onChangeText={(e) => {
              formik.setFieldValue("password", e);
            }}
            value={values.password}
            inputStyle={RPSInputFieldStyle.OUTLINED}
            inputContainerStyle={{
              backgroundColor: "#F4F6F9",
            }}
            secureTextEntry={true}
            error={formik.errors.password ? true : false}
            errorMessage={formik.errors.password as string}
          />
        </View>

        <View
          style={{
            marginTop: 15,
          }}
        >
          <RPInputField
            error={formik.errors.confirmPassword ? true : false}
            errorMessage={formik.errors.confirmPassword as string}
            inputLabel={"Confirm Password"}
            inputPlaceholder={"********"}
            onChangeText={(e) => {
              formik.setFieldValue("confirmPassword", e);
            }}
            value={values.confirmPassword}
            inputStyle={RPSInputFieldStyle.OUTLINED}
            inputContainerStyle={{
              backgroundColor: "#F4F6F9",
            }}
            secureTextEntry={true}
          />
        </View>
      </ScrollView>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Pressable
          disabled={isButtonDisabled()}
          onPress={handleSubmit as any}
          style={{
            backgroundColor: BASIC_COLORS.PRIMARY,
            height: 54,
            width: 54,
            borderRadius: 27,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ForwardArrow />
        </Pressable>
      </View>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 16,
    color: "#9B9B9B",
  },
  headingView: {
    marginTop: 60,
    textAlign: "center",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-around",
  },
});
