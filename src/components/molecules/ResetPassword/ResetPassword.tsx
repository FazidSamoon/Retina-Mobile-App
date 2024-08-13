import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import RPInputField from "../../atoms/RPInputField/RPInputField";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import { showToastWithGravityAndOffset } from "../../../utils/common/commonUtil";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../api/axiosConfig";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

const ResetPassword = ({
  onResetPasswordModalButtonPress,
}: {
  onResetPasswordModalButtonPress: () => void;
}) => {
  const { email, verificationCode } = useSelector((state: RootState) => ({
    email: state?.authenticatorReducer?.email,
    verificationCode: state?.authenticatorReducer?.verificationCode,
  }));

  console.log(email, verificationCode);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = axiosInstance.post("/auth/reset-password-with-code", {
        email: email,
        verificationCode: verificationCode,
        newPassword: password,
        confirmPassword: confirmPassword,
      });
      return (await response).data;
    },
    onSuccess: (data) => {
      showToastWithGravityAndOffset("Successfully changed the password");
      onResetPasswordModalButtonPress();
    },
  });
  return (
    <View>
      <View>
        <Text style={styles.titleText}>New Password</Text>
        <Text style={styles.desciptionText}>
          Your new password must be different from previously used passwords.
        </Text>
        <RPInputField
          inputLabel={"New Password"}
          inputPlaceholder={"********"}
          onChangeText={(e) => setPassword(e)}
          value={password}
          secureTextEntry={true}
          inputContainerStyle={{
            backgroundColor: "#F4F6F9",
          }}
          labelStyles={{
            fontWeight: "300",
          }}
        />
        <RPInputField
          inputLabel={"Re-enter Password"}
          inputPlaceholder={"********"}
          onChangeText={(e) => setConfirmPassword(e)}
          value={confirmPassword}
          secureTextEntry={true}
          inputContainerStyle={{
            backgroundColor: "#F4F6F9",
          }}
          labelStyles={{
            fontWeight: "300",
          }}
        />
        <View
          style={{
            marginTop: 30,
          }}
        >
          <RPPrimaryButton
            onPress={() => {
              if (password !== confirmPassword)
                showToastWithGravityAndOffset(
                  "Password and confirm password mismatch."
                );
              else mutate();
            }}
            buttonTitle={"Reset Password"}
            buttonStyle={{ borderRadius: 30 }}
            disabled={
              !password ||
              password === "" ||
              !confirmPassword ||
              confirmPassword === ""
            }
          />
        </View>
      </View>
    </View>
  );
};

export default ResetPassword;

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
    marginBottom: 10,
  },
});
