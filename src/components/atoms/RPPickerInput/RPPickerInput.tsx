// import React from "react";
// import { View, StyleSheet, Text } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { Icon } from "@rneui/themed";
// import { BASIC_COLORS } from "../../../utils/constants/styles";

// type RPPickerInputProps = {
//   label?: string;
//   selectedValue: string;
//   onValueChange: (itemValue: string) => void;
//   options: { label: string; value: string }[];
//   pickerStyle?: object;
//   error?: string;
// };

// const RPPickerInput = ({
//   label,
//   selectedValue,
//   onValueChange,
//   options,
//   pickerStyle,
//   error,
// }: RPPickerInputProps) => {
//   return (
//     <View style={styles.container}>
//       {/* Label */}
//       {label && <Text style={styles.label}>{label}</Text>}

//       {/* Picker Container */}
//       <View style={[styles.pickerContainer, pickerStyle]}>
//         <Picker
//           selectedValue={selectedValue}
//           onValueChange={onValueChange}
//           style={styles.picker}
//         >
//           {options.map((option, index) => (
//             <Picker.Item
//               key={index}
//               label={option.label}
//               value={option.value}
//             />
//           ))}
//         </Picker>

//         {/* Optional Dropdown Icon from RNE */}
//         <Icon
//           name="arrow-drop-down"
//           type="material"
//           color={BASIC_COLORS.TERTIARY}
//         />
//       </View>

//       {/* Error Message */}
//       {error && <Text style={styles.errorText}>{error}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 15,
//   },
//   label: {
//     color: BASIC_COLORS.FONT_PRIMARY,
//     fontWeight: "500",
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   pickerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderColor: BASIC_COLORS.TERTIARY,
//     borderWidth: 1,
//     borderRadius: 10,
//     backgroundColor: BASIC_COLORS.WHITE,
//     overflow: "hidden",
//     height: 45,
//     justifyContent: "space-between",
//   },
//   picker: {
//     flex: 1,
//     height: "100%",
//   },
//   errorText: {
//     color: BASIC_COLORS.ERROR,
//     fontSize: 12,
//     marginTop: 5,
//   },
// });

// export default RPPickerInput;
