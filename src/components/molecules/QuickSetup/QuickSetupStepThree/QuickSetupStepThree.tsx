import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { MutableRefObject, useRef, useState } from "react";
import RPPrimaryButton from "../../../atoms/RPPrimaryButton/RPPrimaryButton";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { BASIC_COLORS } from "../../../../utils/constants/styles";
import { RegisterUserRequest } from "../../../../utils/types/commonTypes";

const QuickSetupStepThree = ({
  setStep,
  setRegistrationData,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setRegistrationData: React.Dispatch<
    React.SetStateAction<RegisterUserRequest>
  >;
}) => {
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const onNextButtonPressed = () => {
    setRegistrationData((prev) => ({
      ...prev,
      dateOfBirth: dateOfBirth,
    }));
    setStep(4);
  };

  console.log(dateOfBirth);
  return (
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
          Date of Birth?
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "#9B9B9B",
            maxWidth: 300,
          }}
        >
          This helps us create your personalized plan
        </Text>
      </View>

      <View>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            borderTopColor: BASIC_COLORS.PRIMARY,
            borderTopWidth: 1,
            borderBottomColor: BASIC_COLORS.PRIMARY,
            borderBottomWidth: 1,
            padding: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
              color: BASIC_COLORS.PRIMARY,
            }}
          >
            {dateOfBirth.getFullYear()}
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
              color: BASIC_COLORS.PRIMARY,
            }}
          >
            {dateOfBirth.getMonth()}
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
              color: BASIC_COLORS.PRIMARY,
            }}
          >
            {dateOfBirth.getDate()}
          </Text>
        </Pressable>

        {showDatePicker && (
          <RNDateTimePicker
            value={new Date()}
            mode="date"
            display="inline"
            onChange={(event, selectedDate) => {
              if (event.type === "set") {
                setShowDatePicker(false);
                setDateOfBirth(selectedDate);
              }
            }}
            style={{
              backgroundColor: "white",
              width: "100%",
              height: 200,
            }}
          />
        )}
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
  );
};

export default QuickSetupStepThree;

const styles = StyleSheet.create({});
