import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { VisionTestChallenge } from "../../../utils/types/commonTypes";
import RPPrimaryButton from "../../../components/atoms/RPPrimaryButton/RPPrimaryButton";

const ChannelDoctorsScreen = () => {
  const [pendingChallenges, setPendingChallenges] = useState<
    VisionTestChallenge[]
  >([
    {
      id: 4,
      task: "Identify 3 SIZE_202_6 letters",
      status: "PENDING",
      dificulty: "easy",
      identification: [
        "SpeechIdentificationTest",
        "202.6",
        "LongDistanceVisionTest",
        "gestureIdentificationTest",
      ],
      scorePoints: 10,
      minDistanceRequirement: 2,
      _id: "66c4de6220e999199ba6fec2",
    },
    {
      id: 2,
      task: "Complete 1 Contrast Vision Test",
      status: "PENDING",
      dificulty: "easy",
      identification: ["ContrastVisionTest"],
      scorePoints: 10,
      _id: "66c4de6220e999199ba6fec3",
    },
    {
      id: 2,
      task: "Complete 1 swipable Long Distance Vision Test",
      status: "PENDING",
      dificulty: "easy",
      identification: [
        "LongDistanceVisionTest",
        "speach",
        "LongDistanceVisionTest",
        "gestureIdentificationTest",
      ],
      scorePoints: 10,
      minDistanceRequirement: 2,
      _id: "66c4de6220e999199ba6fec4",
    },
    {
      id: 5,
      task: "Identify 3 SIZE_173_3 letters",
      status: "PENDING",
      dificulty: "easy",
      identification: [
        "SpeechIdentificationTest",
        "173.3",
        "LongDistanceVisionTest",
        "gestureIdentificationTest",
      ],
      scorePoints: 10,
      minDistanceRequirement: 2,
      _id: "66c4de6220e999199ba6fec5",
    },
    {
      id: 2,
      task: "Identify 3 SIZE_20 letters",
      status: "PENDING",
      dificulty: "hard",
      identification: [
        "SpeechIdentificationTest",
        "20",
        "LongDistanceVisionTest",
        "gestureIdentificationTest",
      ],
      scorePoints: 30,
      minDistanceRequirement: 2,
      _id: "66c4de6220e999199ba6fec6",
    },
    {
      id: 2,
      task: "Identify 3 SIZE_44 letters",
      status: "PENDING",
      dificulty: "hard",
      identification: [
        "SpeechIdentificationTest",
        "44",
        "LongDistanceVisionTest",
        "gestureIdentificationTest",
      ],
      scorePoints: 30,
      minDistanceRequirement: 2,
      _id: "66c4de6220e999199ba6fec7",
    },
    {
      id: 2,
      task: "Identify 3 SIZE_86_6 letters",
      status: "PENDING",
      dificulty: "medium",
      identification: [
        "SpeechIdentificationTest",
        "86.6",
        "LongDistanceVisionTest",
        "gestureIdentificationTest",
      ],
      scorePoints: 20,
      minDistanceRequirement: 2,
      _id: "66c4de6220e999199ba6fec8",
    },
    {
      id: 2,
      task: "Identify 3 SIZE_116 letters",
      status: "PENDING",
      dificulty: "medium",
      identification: [
        "SpeechIdentificationTest",
        "116",
        "LongDistanceVisionTest",
        "gestureIdentificationTest",
      ],
      scorePoints: 20,
      minDistanceRequirement: 2,
      _id: "66c4de6220e999199ba6fec9",
    },
  ]);

  const handleButtonPress = () => {
    const pendingLongDistanceTasksList = pendingChallenges.filter(
      (challenge) =>
        challenge.identification.includes("LongDistanceVisionTest") &&
        challenge.status === "PENDING" &&
        challenge.identification.includes(
          "SpeechIdentificationTest" || "gestureIdentificationTest"
        )
    );

    const sizes = [
      "202.6",
      "173.3",
      "144",
      "116",
      "86.6",
      "57.3",
      "44",
      "28",
      "20",
      "12",
    ];
    pendingLongDistanceTasksList.forEach((element) => {
      const includesSize = sizes.some((size) =>
        element.identification.includes(size)
      );
      console.log(includesSize)
      if (includesSize) {
        const shouldIdentify = element.task.split(" ")[1]
        const availableSizes = sizes.filter(size => element.identification.includes(size));
        console.log(availableSizes)
        // console.log(shouldIdentify)
        // // Do something if element.identification includes any size from the sizes array
        // console.log(
        //   `Element identification includes a size: ${element.identification}`
        // );
      } else {
        // Do something else if element.identification does not include any size
        // console.log(
        //   `Element identification does not include any size: ${element.identification}`
        // );
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>ChannelDoctorsScreen</Text>
      <RPPrimaryButton buttonTitle={"ssss"} onPress={handleButtonPress} />
    </SafeAreaView>
  );
};

export default ChannelDoctorsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "white",
  },
});
