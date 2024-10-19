import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useState } from "react";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import RPInputField from "../../atoms/RPInputField/RPInputField";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosConfig";
import { useDispatch } from "react-redux";
import { setEmail } from "../../../store/slices/authSlice";


const ForgotPassword = ({
  onForgotPasswordModalButtonPress,
}: {
  onForgotPasswordModalButtonPress: () => void;
}) => {
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState<string>("");
  const { isPending, mutate } = useMutation({
    mutationFn: async (email: string) => {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email,
      });
      return response?.data;
    },
    onSuccess: (data: { message: string }) => {
      showToastWithGravityAndOffset(data.message);
      dispatch(setEmail(userEmail));
      onForgotPasswordModalButtonPress();
    },
    onError: (error) => {
      showToastWithGravityAndOffset(
        "Something went wrong! please check your entered email."
      );
    },
  });

  const showToastWithGravityAndOffset = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.titleText}>Forgot Password</Text>
        <Text style={styles.desciptionText}>
          Enter your email for the verification proccesss, we will send 4 digits
          code to your email.
        </Text>
        <RPInputField
          inputLabel={""}
          inputPlaceholder={"Enter Your Email"}
          onChangeText={(e) => setUserEmail(e)}
          value={userEmail}
          inputContainerStyle={{
            borderColor: "rgba(103, 114, 148, 0.16)",
            borderWidth: 1,
            height: 60,
          }}
        />
      </View>
      <View
        style={{
          marginTop: 40,
        }}
      >
        <RPPrimaryButton
          buttonTitle={"Continue"}
          disabled={isPending || userEmail === "" || !userEmail}
          buttonStyle={{
            borderRadius: 30,
          }}
          onPress={() => {
            mutate(userEmail);
          }}
        />
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  desciptionText: {
    fontSize: 16,
    color: BASIC_COLORS.FONT_SECONDARY,
    lineHeight: 24,
    marginTop: 10,
  },
});
