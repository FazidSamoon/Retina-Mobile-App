import {
  LongDIstanceVisionTestSteps,
  PersonalizedDistance,
  VisionTestStateType,
} from "../../components/molecules/LongDistanceVisionTest/LongDistanceVIsionTestTypes";

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

const getDistanceScore = (personalizedDistance: PersonalizedDistance) => {
  if (Number(personalizedDistance.toFixed(2)) === 4) return 0.0;
  else if (Number(personalizedDistance.toFixed(2)) === 2) return 0.3;
  else if (Number(personalizedDistance.toFixed(2)) === 1) return 0.6;
  else if (Number(personalizedDistance.toFixed(2)) === 0.5) return 0.9;
};

export const getLogmarValueForSize = (size: string) => {
  switch (size) {
    case "202.6":
      return 1.0;
    case "173.3":
      return 0.9;
    case "144":
      return 0.8;
    case "116":
      return 0.7;
    case "86.6":
      return 0.6;
    case "57.3":
      return 0.5;
    case "44":
      return 0.4;
    case "28":
      return 0.3;
    case "20":
      return 0.2;
    case "12":
      return 0.1;
    default:
      return 0;
  }
};

export const getLogmarValueForJaegerNotation = (size: string) => {
  switch (size) {
    case "14": // J1+
      return 0.1;
    case "11": // J1
      return 0.0;
    case "17": // J2
      return 0.2;
    case "21": // J3
      return 0.3;
    case "28": // J4
      return 0.4;
    case "34": // J5
      return 0.5;
    case "48": // J6
      return 0.6;
    case "55": // J16
      return 0.7;
    case "69": // J16
      return 0.9;
    case "137": // J16
      return 1.0;
    default:
      return null; // If the pixel value does not match any known values
  }
};

export const calculateVisualAcuityScoreUsingSLMAformula = (
  size: string,
  unIdentifiedCount: number,
  personalizedDistance: PersonalizedDistance
) => {
  const distanceValue: number = getDistanceScore(personalizedDistance);
  const logmarValue =
    getLogmarValueForSize(size) + unIdentifiedCount * 0.02 + distanceValue;
  return logmarValue;
};

export const calculateVisualAcuityScoreUsingSLMAformulaNearVision = (
  size: string,
  unIdentifiedCount: number
) => {
  const logmarValue =
    getLogmarValueForJaegerNotation(size) + unIdentifiedCount * 0.02;
  return logmarValue;
};

export const getTestParameters = (logMAR: number) => {
  let distance: PersonalizedDistance;
  let startLine: LongDIstanceVisionTestSteps;

  if (logMAR <= -0.3) {
    distance = PersonalizedDistance.FOURMETER;
    startLine = LongDIstanceVisionTestSteps.SIZE_116;
  } else if (logMAR > -0.3 && logMAR <= -0.1) {
    distance = PersonalizedDistance.FOURMETER;
    startLine = LongDIstanceVisionTestSteps.SIZE_144;
  } else if (logMAR > -0.1 && logMAR <= 0.0) {
    distance = PersonalizedDistance.FOURMETER;
    startLine = LongDIstanceVisionTestSteps.SIZE_173_3;
  } else if (logMAR > 0.0 && logMAR <= 0.2) {
    distance = PersonalizedDistance.FOURMETER;
    startLine = LongDIstanceVisionTestSteps.SIZE_202_6;
  } else if (logMAR > 0.2 && logMAR <= 0.4) {
    distance = PersonalizedDistance.TWOMETER;
    startLine = LongDIstanceVisionTestSteps.SIZE_144;
  } else if (logMAR > 0.4 && logMAR <= 0.6) {
    distance = PersonalizedDistance.TWOMETER;
    startLine = LongDIstanceVisionTestSteps.SIZE_173_3;
  } else if (logMAR > 0.6 && logMAR <= 0.8) {
    distance = PersonalizedDistance.ONEMETER;
    startLine = LongDIstanceVisionTestSteps.SIZE_144;
  } else if (logMAR > 0.8 && logMAR <= 1.0) {
    distance = PersonalizedDistance.ONEMETER;
    startLine = LongDIstanceVisionTestSteps.SIZE_173_3;
  } else if (logMAR > 1.0) {
    distance = PersonalizedDistance.POINTFIMEMETER;
    startLine = LongDIstanceVisionTestSteps.SIZE_144;
  }

  return {
    distance: distance,
    startLine: startLine,
  };
};

export const calculateGainedXp = (
  currentXp: number,
  dificulty: string
): number => {
  if (dificulty === "easy") return currentXp + 2;
  else if (dificulty === "medium") return currentXp + 5;
  else if (dificulty === "hard") return currentXp + 8;
};
