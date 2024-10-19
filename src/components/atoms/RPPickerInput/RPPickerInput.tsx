import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Icon } from "@rneui/themed";
import { BASIC_COLORS } from "../../../utils/constants/styles";

type RPPickerInputProps = {
  label?: string;
  selectedValue: string;
  onValueChange: (itemValue: string) => void;
  options: { label: string; value: string }[];
  pickerStyle?: object;
  error?: string;
};

const RPPickerInput = ({
  label,
  selectedValue,
  onValueChange,
  options,
  pickerStyle,
  error,
}: RPPickerInputProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      {/* Label */}
      {label && <Text style={styles.label}>{label}</Text>}

      {/* Dropdown Container */}
      <Dropdown
        style={[
          styles.dropdown,
          pickerStyle,
          isFocus && { borderColor: BASIC_COLORS.PRIMARY },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={options}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? "Select item" : "..."}
        value={selectedValue}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onValueChange(item.value);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <Icon
            name="arrow-drop-down"
            type="material"
            color={BASIC_COLORS.PRIMARY}
          />
        )}
      />

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginBottom: 15,
  },
  label: {
    color: BASIC_COLORS.FONT_PRIMARY,
    fontWeight: "400",
    fontSize: 16,
    marginBottom: 5,
  },
  dropdown: {
    borderColor: BASIC_COLORS.LIGHT_GRAY,
    borderWidth: 1,
    borderRadius: 10,
    height: 45,
    backgroundColor: BASIC_COLORS.WHITE,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  placeholderStyle: {
    fontSize: 16,
    color: BASIC_COLORS.FONT_SECONDARY,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: BASIC_COLORS.FONT_PRIMARY,
  },
  iconStyle: {
    width: 24,
    height: 24,
  },
  errorText: {
    color: BASIC_COLORS.ERROR,
    fontSize: 12,
    marginTop: 5,
  },
});

export default RPPickerInput;
