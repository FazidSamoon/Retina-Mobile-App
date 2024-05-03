import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import { ButtonState, ButtonType, PrimaryButtonProps } from "./buttonTypes";

const RPPrimaryButton = ({
  buttonTitle,
  buttonType = ButtonType.PRIMARY,
  buttonStyle,
  buttonContainerStyle,
  onPress,
  loading,
  icon,
  buttonState = ButtonState.SOLID,
  disabled = false,
}: PrimaryButtonProps) => {
  return (
    <View>
      <Button
        title={buttonTitle}
        titleStyle={{
          color:
            buttonType === "primary"
              ? BASIC_COLORS.WHITE
              : buttonType === "secondary"
              ? BASIC_COLORS.PRIMARY
              : BASIC_COLORS.ERROR,
          fontSize: 15,
        }}
        style={{}}
        buttonStyle={{
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          alignContent: "center",
          borderRadius: 10,
          height: 45,
          backgroundColor:
            buttonType === "primary"
              ? BASIC_COLORS.PRIMARY
              : buttonType === "secondary"
              ? "none"
              : "none",
          borderColor:
            buttonType === "error" ? BASIC_COLORS.ERROR : BASIC_COLORS.PRIMARY,
          borderWidth: 3,
          ...buttonStyle,
        }}
        iconPosition="right"
        icon={icon}
        iconRight={true}
        onPress={onPress}
        loading={loading}
        type={buttonState}
        disabled={disabled}
      />
    </View>
  );
};

export default RPPrimaryButton;

const styles = StyleSheet.create({});
