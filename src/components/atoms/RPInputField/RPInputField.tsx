import { View, Text, TextInput } from "react-native";
import React from "react";
import { BASIC_COLORS } from "../../../utils/constants/styles";
import { RPSInputFieldProps, RPSInputFieldStyle } from "./inputFieldTypes";

const RPInputField = ({
  inputLabel = "Label",
  inputPlaceholder = "Placeholder",
  inputStyle = RPSInputFieldStyle.OUTLINED,
  inputContainerStyle,
  icon,
  error,
  errorMessage,
  onChangeText,
  value,
  editable,
  secureTextEntry,
  labelStyles,
  inputTextStyles,
  keyboardType,
}: RPSInputFieldProps) => {
  return (
    <View>
      <Text
        style={{
          color: BASIC_COLORS.FONT_PRIMARY,
          fontWeight: "500",
          fontSize: 16,
          ...labelStyles,
        }}
      >
        {inputLabel}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: BASIC_COLORS.WHITE,
          borderColor:
            inputStyle === RPSInputFieldStyle.OUTLINED
              ? BASIC_COLORS.TERTIARY
              : inputStyle === RPSInputFieldStyle.ERROR
              ? BASIC_COLORS.ERROR
              : BASIC_COLORS.WHITE,
          borderWidth: 1,
          borderRadius: 10,
          height: 40,
          justifyContent: "space-between",
          width: "100%",
          padding: 10,
          marginTop: 3,
          ...inputContainerStyle,
        }}
      >
        <TextInput
          placeholder={inputPlaceholder}
          style={{
            width: "90%",
            color: BASIC_COLORS.FONT_SECONDARY,
            ...inputTextStyles,
          }}
          onChangeText={onChangeText}
          editable={editable}
          value={value}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />

        {icon && icon}
      </View>

      {error && (
        <Text
          style={{
            color: BASIC_COLORS.ERROR,
            fontSize: 12,
            marginTop: 2,
          }}
        >
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default RPInputField;
