import { VisionTestStateType } from "../../components/molecules/LongDistanceVisionTest/LongDistanceVIsionTestTypes";

export const calculateScores = (results: VisionTestStateType) => {
  const leftEye = results.testResults.leftEye.result;
  const rightEye = results.testResults.rightEye.result;

  const leftEyeScore = calculateSingleEyeScore(leftEye);
  const rightEyeScore = calculateSingleEyeScore(rightEye);
};

const calculateSingleEyeScore = (eye: { [key: string]: number }) => {
  let score = 0;
  for (const key in eye) {
    const baseValueForSize =
      VisionTestIdentificationBaseScoreValueForEachLetterSize[key];
    score += baseValueForSize * eye[key];

    score += eye[key];
  }
  return score;
};

export const calculateXPBasedOnScore = (score: number) => {
  if (score <= 10) {
    return 0;
  }
  if (score <= 20) {
    return 1;
  }
  if (score <= 30) {
    return 2;
  }
  if (score <= 40) {
    return 3;
  }
  if (score <= 50) {
    return 4;
  }
  if (score <= 60) {
    return 5;
  }
  if (score <= 70) {
    return 6;
  }
  if (score <= 80) {
    return 7;
  }
  if (score <= 90) {
    return 8;
  }
  if (score <= 100) {
    return 9;
  }
  return 10;
};

export const VisionTestIdentificationBaseScoreValueForEachLetterSize = {
  202.6: 1,
  173.3: 2,
  144: 3,
  116: 4,
  86.6: 5,
  57.3: 6,
  44: 7,
  28: 8,
  20: 9,
  12: 10,
};

export const getLogmarValueForSize = (size: string) => {
  switch (size) {
    case "SIZE_202_6":
      return 1.0;
    case "SIZE_173_3":
      return 0.9;
    case "SIZE_144":
      return 0.8;
    case "SIZE_116":
      return 0.7;
    case "SIZE_86_6":
      return 0.6;
    case "SIZE_57_3":
      return 0.5;
    case "SIZE_44":
      return 0.4;
    case "SIZE_28":
      return 0.3;
    case "SIZE_20":
      return 0.2;
    case "SIZE_12":
      return 0.1;
    default:
  }
};

export const calculateVisualAcuityScoreUsingSLMAformula = (
  size: string,
  unIdentifiedCount: number
) => {
  const logmarValue = getLogmarValueForSize(size) + unIdentifiedCount * 0.02;
  return logmarValue;
};
