import { LongDistanceTestGuidenceStepsType } from "../../components/molecules/LongDistanceTestGuidence/LongDistanceStepTypes";

export const LongDistanceTestGuidenceSteps: LongDistanceTestGuidenceStepsType[] =
  [
    {
      step: 1,
      title: "Step 1",
      description:
        "If you are wearing glasses wear then before performing the test",
      image: require("../../assets/step1.png"),
    },
    {
      step: 2,
      title: "Step 2",
      description: "Stand at least 2m away from the screen",
      image: require("../../assets/step2.png"),
    },
    {
      step: 3,
      title: "Step 3",
      description:
        "Once you identified the letter pronounce the letter loud and clear before clocks ticks out",
      image: require("../../assets/step3.png"),
    },
  ];

export const VisionTestLetters = [
  "E",
  "F",
  "L",
  "P",
  "T",
  "D",
  "H",
  "K",
  "R",
  "S",
  "V",
  "A",
  "B",
  "Q",
  "W",
  "X",
];

export const VisionTestNumbers = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
];

export const SwiperLetterDirections = ["left", "right", "up", "down"];

export enum SwiperLetterDirectionsType {
  LEFT = "left",
  RIGHT = "right",
  UP = "up",
  DOWN = "down",
}
