import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import RPInputField from "../../../atoms/RPInputField/RPInputField";
import { RPSInputFieldStyle } from "../../../atoms/RPInputField/inputFieldTypes";
import { BASIC_COLORS } from "../../../../utils/constants/styles";
import ForwardArrow from "../../../../assets/ForwardArrow";
import { QuickSetupTypes } from "../../../../screens/RootScreens/QuickSetupScreen/quickSetupTypes";

const CreateAccount = ({
  setQuickSetupState,
}: {
  setQuickSetupState: React.Dispatch<React.SetStateAction<QuickSetupTypes>>;
}) => {
  const onNextButtonPressed = () => {
    setQuickSetupState(QuickSetupTypes.QUISTIONAIRE);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headingView}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subTitle}>Fill your information below</Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <RPInputField
          inputLabel={"Name"}
          inputPlaceholder={"Enter your full name"}
          onChangeText={undefined}
          value={""}
          inputStyle={RPSInputFieldStyle.OUTLINED}
          inputContainerStyle={{
            backgroundColor: "#F4F6F9",
          }}
        />
        <RPInputField
          inputLabel={"Email"}
          inputPlaceholder={"Enter your email address"}
          onChangeText={undefined}
          value={""}
          inputStyle={RPSInputFieldStyle.OUTLINED}
          inputContainerStyle={{
            backgroundColor: "#F4F6F9",
          }}
        />
        <RPInputField
          inputLabel={"Username"}
          inputPlaceholder={"Enter your username"}
          onChangeText={undefined}
          value={""}
          inputStyle={RPSInputFieldStyle.OUTLINED}
          inputContainerStyle={{
            backgroundColor: "#F4F6F9",
          }}
        />
        <RPInputField
          inputLabel={"Password"}
          inputPlaceholder={"********"}
          onChangeText={undefined}
          value={""}
          inputStyle={RPSInputFieldStyle.OUTLINED}
          inputContainerStyle={{
            backgroundColor: "#F4F6F9",
          }}
        />
        <RPInputField
          inputLabel={"Confirm Password"}
          inputPlaceholder={"********"}
          onChangeText={undefined}
          value={""}
          inputStyle={RPSInputFieldStyle.OUTLINED}
          inputContainerStyle={{
            backgroundColor: "#F4F6F9",
          }}
        />
      </View>

      <View style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}>
        <Pressable
          onPress={onNextButtonPressed}
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
