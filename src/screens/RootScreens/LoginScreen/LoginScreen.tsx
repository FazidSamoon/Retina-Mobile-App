import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import RPInputField from "../../../components/atoms/RPInputField/RPInputField";
import RPPrimaryButton from "../../../components/atoms/RPPrimaryButton/RPPrimaryButton";
import { LoginScreenBottomSheetTypes } from "./loginScreenTypes";
import { BottomSheet } from "@rneui/themed";
import { Feather } from "@expo/vector-icons";
import ForgotPassword from "../../../components/molecules/ForgotPassword/ForgotPassword";
import OTPVerification from "../../../components/molecules/OTPVerification/OTPVerification";
import ResetPassword from "../../../components/molecules/ResetPassword/ResetPassword";
import DatePicker from "react-native-date-picker";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../../utils/validations";
import { loginUser } from "../../../api/auth";
import { getDataFromAsyncStorage, setDataToAsyncStorage } from "../../../utils/common/commonUtil";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../../../store/slices/authSlice";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetType, setBottomSheetType] =
    useState<LoginScreenBottomSheetTypes>(LoginScreenBottomSheetTypes.NONE);

  const navigation = useNavigation<any>();
  const onForgotPasswordModalButtonPress = () => {
    setBottomSheetVisible(true);
    setBottomSheetType(
      LoginScreenBottomSheetTypes.FORGOT_PASSWORD_VERIFICATION
    );
  };

  const onOTPVerificationModalButtonPress = () => {
    setBottomSheetVisible(true);
    setBottomSheetType(
      LoginScreenBottomSheetTypes.FORGOT_PASSWORD_NEW_PASSWORD
    );
  };

  const onResetPasswordModalButtonPress = () => {
    setBottomSheetVisible(false);
    setBottomSheetType(LoginScreenBottomSheetTypes.NONE);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values: any) => {
    const { apiSuccess, apiError }: any = await loginUser({
      email: values.email,
      password: values.password,
    });

    if (apiSuccess) {
      await setDataToAsyncStorage("user", apiSuccess);
      dispatch(setAuthenticated(true))
    } else {
      showToastWithGravityAndOffset("Invalid email or password");
    }
  };

  const showToastWithGravityAndOffset = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validateOnChange: true,
    validationSchema: loginValidationSchema,
  });

  const { values, handleChange, handleSubmit } = formik;

  return (
    <View>
      <View style={styles.container}>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "30%",
          }}
        >
          <Text style={styles.signInText}>Sign In</Text>
          <Text
            style={{
              color: "#797979",
            }}
          >
            Hi! Welcome back, you’ve been missed
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            gap: 20,
            marginTop: 60,
          }}
        >
          <RPInputField
            inputLabel={"Email Address"}
            inputPlaceholder={"example@gmail.com"}
            onChangeText={(e) => {
              formik.setFieldValue("email", e);
            }}
            value={values.email}
            inputContainerStyle={{
              backgroundColor: "#F4F6F9",
            }}
            error={formik.errors.email ? true : false}
            errorMessage={formik.errors.email as string}
          />
          <RPInputField
            inputLabel={"Password"}
            inputPlaceholder={"********"}
            onChangeText={(e) => {
              formik.setFieldValue("password", e);
            }}
            value={values.password}
            secureTextEntry={true}
            inputContainerStyle={{
              backgroundColor: "#F4F6F9",
            }}
            error={formik.errors.password ? true : false}
          />
          <View>
            <Text
              onPress={() => {
                setBottomSheetVisible(true);
                setBottomSheetType(
                  LoginScreenBottomSheetTypes.FORGOT_PASSWORD_EMAIL
                );
              }}
              style={{
                textAlign: "right",
                color: BASIC_COLORS.PRIMARY,
                textDecorationLine: "underline",
              }}
            >
              Forgot Password?
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 30,
          }}
        >
          <RPPrimaryButton
            onPress={handleSubmit}
            buttonTitle={"Sign In"}
            buttonStyle={{ borderRadius: 30 }}
          />
        </View>
        <View>
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              color: "#797979",
            }}
          >
            Don’t have an account?{" "}
            <Text
              onPress={() => {
                navigation.navigate("QuickSetup");
              }}
              style={{
                color: BASIC_COLORS.PRIMARY,
              }}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
      <BottomSheet
        isVisible={bottomSheetVisible}
        backdropStyle={{
          maxHeight: "100%",
          position: "absolute",
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
        containerStyle={{
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
        }}
      >
        <View
          style={{
            height: "100%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignContent: "flex-end",
            }}
          >
            <TouchableOpacity
              onPress={() => setBottomSheetVisible(false)}
              style={{
                backgroundColor: "#C4C4C4",
                borderRadius: 50,
                padding: 10,
              }}
            >
              <Feather name="x" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: "100%",
            }}
          >
            {bottomSheetType ===
            LoginScreenBottomSheetTypes.FORGOT_PASSWORD_EMAIL ? (
              <ForgotPassword
                onForgotPasswordModalButtonPress={
                  onForgotPasswordModalButtonPress
                }
              />
            ) : bottomSheetType ===
              LoginScreenBottomSheetTypes.FORGOT_PASSWORD_VERIFICATION ? (
              <OTPVerification
                onOTPVerificationModalButtonPress={
                  onOTPVerificationModalButtonPress
                }
              />
            ) : (
              <ResetPassword
                onResetPasswordModalButtonPress={
                  onResetPasswordModalButtonPress
                }
              />
            )}
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  signInText: {
    fontSize: 28,
    fontWeight: "bold",
    color: BASIC_COLORS.FONT_PRIMARY,
    marginBottom: 10,
  },
  contentContainer: {
    alignItems: "center",
    backgroundColor: "red",
  },
  bottomSheetContainer: {
    justifyContent: "center",
    backgroundColor: "grey",
    height: "100%",
  },
});
