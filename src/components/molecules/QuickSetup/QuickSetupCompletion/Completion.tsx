import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { QuickSetupTypes } from "../../../../screens/RootScreens/QuickSetupScreen/quickSetupTypes";
import BackwardArrow from "../../../../assets/BackwardArrow";
import { BASIC_COLORS } from "../../../../utils/constants/styles";
import RPPrimaryButton from "../../../atoms/RPPrimaryButton/RPPrimaryButton";
import RPInputField from "../../../atoms/RPInputField/RPInputField";
import { RPSInputFieldStyle } from "../../../atoms/RPInputField/inputFieldTypes";
import PhoneInput from "react-native-phone-number-input";

const Completion = ({
  setQuickSetupState,
}: {
  setQuickSetupState: React.Dispatch<React.SetStateAction<QuickSetupTypes>>;
}) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const phoneInput = useRef<PhoneInput>(null);
  const onBackButtonPressed = () => {
    setQuickSetupState(QuickSetupTypes.CREATE_ACCOUNT);
  };

  const onNextButtonPressed = () => {
    // setQuickSetupState(QuickSetupTypes.QUISTIONAIRE);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          onPress={onBackButtonPressed}
          style={{
            backgroundColor: BASIC_COLORS.WHITE,
            height: 46,
            width: 46,
            borderRadius: 27,
            justifyContent: "center",
            alignItems: "center",
            borderColor: "#E6E6E6",
            borderWidth: 1,
          }}
        >
          <BackwardArrow fill="black" />
        </Pressable>

        <View
          style={{
            height: 46,
            width: 46,
          }}
        ></View>
      </View>

      <View style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        height: 135,
        width: "100%"
      }}>
        {/* <Image
          source={require("../../../../assets/QuickSetup/Completion.png")}
          style={{
            width: 135,
            height: 135,
            alignSelf: "center",
          }}
        /> */}
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Complete Your Profile
          </Text>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              color: "#9B9B9B",
              maxWidth: 300,
            }}
          >
            Don’t worry, only you can see your personal data. No one else will
            be able to see it.
          </Text>
        </View>

        <View
          style={{
            gap: 20,
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

          <View style={{
            gap: 5,
          }}>
            <Text
              style={{
                color: BASIC_COLORS.FONT_PRIMARY,
                fontWeight: "500",
                fontSize: 16,
              }}
            >
              Phone Number
            </Text>
            <PhoneInput
              ref={phoneInput}
              defaultValue={value}
              defaultCode="SL"
              layout="second"
              onChangeText={(text) => {
                setValue(text);
              }}
              onChangeFormattedText={(text) => {
                setFormattedValue(text);
              }}
              withDarkTheme
              containerStyle={{
                backgroundColor: "#F4F6F9",
                borderRadius: 10,
                height: 40,
                width: "100%",
              }}
              codeTextStyle={{ color: "black" }}
              textInputStyle={{
                color: "black",
                padding: 0,
                margin: 0,
                height: 40,
              }}
              textContainerStyle={{ padding: 0, margin: 0 }}
              autoFocus
            />
          </View>

          <RPInputField
            inputLabel={"Location"}
            inputPlaceholder={"Enter your location"}
            onChangeText={undefined}
            value={""}
            inputStyle={RPSInputFieldStyle.OUTLINED}
            inputContainerStyle={{
              backgroundColor: "#F4F6F9",
            }}
          />

          <RPInputField
            inputLabel={"Occupation"}
            inputPlaceholder={"Enter your occupation"}
            onChangeText={undefined}
            value={""}
            inputStyle={RPSInputFieldStyle.OUTLINED}
            inputContainerStyle={{
              backgroundColor: "#F4F6F9",
            }}
          />
        </View>

        <View>
          <RPPrimaryButton
            buttonTitle={"Next"}
            //   disabled={!selected}
            onPress={onNextButtonPressed}
            buttonStyle={{
              borderRadius: 30,
              // borderColor: selected ? BASIC_COLORS.PRIMARY : "#E6E6E6" ,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Completion;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
});
