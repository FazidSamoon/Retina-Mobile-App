import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Genders } from "../../../../utils/types/commonTypes";
import { BASIC_COLORS } from "../../../../utils/constants/styles";
import FemaleIcon from "../../../../assets/FemaleIcon";
import MaleIcon from "../../../../assets/MaleIcon";
import RPPrimaryButton from "../../../atoms/RPPrimaryButton/RPPrimaryButton";

const QuickSetupStepOne = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [selected, setSelected] = useState<Genders>(null);

  const onNextButtonPressed = () => {
    if (selected) {
      setStep(2);
    }
  };
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
          Tell Us About Yourelf!
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            color: "#9B9B9B",
            maxWidth: 300,
          }}
        >
          To give you a better experience we need to know your gender
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 50,
        }}
      >
        <Pressable
          onPress={() => setSelected(Genders.MALE)}
          style={{
            backgroundColor:
              selected === Genders.MALE ? BASIC_COLORS.PRIMARY : "#F4F6F9",
            height: 160,
            borderRadius: 160,
            width: 160,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <MaleIcon fill={selected === Genders.MALE ? "white" : "black"} />
            <Text
              style={{
                color: selected === Genders.MALE ? "white" : "black",
              }}
            >
              Male
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => setSelected(Genders.FEMALE)}
          style={{
            backgroundColor:
              selected === Genders.FEMALE ? BASIC_COLORS.PRIMARY : "#F4F6F9",
            height: 160,
            borderRadius: 160,
            width: 160,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <FemaleIcon
              fill={selected === Genders.FEMALE ? "white" : "black"}
            />
            <Text
              style={{
                color: selected === Genders.FEMALE ? "white" : "black",
              }}
            >
              Female
            </Text>
          </View>
        </Pressable>
      </View>

      <View>
        <RPPrimaryButton
          buttonTitle={"Next"}
          disabled={!selected}
          onPress={onNextButtonPressed}
          buttonStyle={{
            borderRadius: 30,
            borderColor: selected ? BASIC_COLORS.PRIMARY : "#E6E6E6" ,
          }}
        />
      </View>
    </View>
  );
};

export default QuickSetupStepOne;

const styles = StyleSheet.create({});
