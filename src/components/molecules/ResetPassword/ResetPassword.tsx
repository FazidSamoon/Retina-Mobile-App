import { StyleSheet, Text, View } from "react-native";
import React from "react";
import RPInputField from "../../atoms/RPInputField/RPInputField";
import RPPrimaryButton from "../../atoms/RPPrimaryButton/RPPrimaryButton";
import { BASIC_COLORS } from "../../../utils/constants/styles";

const ResetPassword = ({
  onResetPasswordModalButtonPress,
}: {
  onResetPasswordModalButtonPress: () => void;
}) => {
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
          onChangeText={undefined}
          value={""}
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
          onChangeText={undefined}
          value={""}
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
            onPress={onResetPasswordModalButtonPress}
            buttonTitle={"Reset Password"}
            buttonStyle={{ borderRadius: 30 }}
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
    marginBottom: 10
  },
});
