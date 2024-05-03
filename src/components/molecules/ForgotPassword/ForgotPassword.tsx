import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import RPInputField from "../../atoms/RPInputField/RPInputField";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";

const ForgotPassword = ({
  onForgotPasswordModalButtonPress,
}: {
  onForgotPasswordModalButtonPress: () => void;
}) => {
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
          onChangeText={undefined}
          value={""}
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
          buttonStyle={{
            borderRadius: 30,
          }}
          onPress={onForgotPasswordModalButtonPress}
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
