import { LongDIstanceVisionTestSteps } from "../../components/molecules/LongDistanceVisionTest/LongDistanceVIsionTestTypes";
import { ShortDistanceVisionTestSteps } from "../../components/molecules/NearVisionTest/NearVisionTestTypes";

export const identifiyLetters = (
  text: string[],
  letterInView: string
): boolean => {
  const result = text?.some(
    (letter: string) =>
      letter?.split(" ")?.[1]?.toLowerCase() === letterInView.toLowerCase()
  );
  return result;
};

export const identifyNumbers = (
  text: string[],
  numberInView: number
): boolean => {
  let result: boolean = false;
  if (numberInView === 0) {
    result = text?.some(
      (number: string) =>
        number?.split(" ")?.[1] === numberInView.toString() ||
        number?.split(" ")?.[1]?.toLowerCase() === "O" ||
        number?.split(" ")?.[1]?.toLowerCase() === "zero" ||
        number?.split(" ")?.[1]?.toLowerCase() === "oh" ||
        number?.split(" ")?.[1]?.toLowerCase() === "note" ||
        number?.split(" ")?.[1]?.toLowerCase() === "o"
    );
  } else if (numberInView === 1) {
    result = text?.some(
      (number: string) =>
        number?.split(" ")?.[1] === numberInView.toString() ||
        number?.split(" ")?.[1]?.toLowerCase() === "I" ||
        number?.split(" ")?.[1]?.toLowerCase() === "one" ||
        number?.split(" ")?.[1]?.toLowerCase() === "won" ||
        number?.split(" ")?.[1]?.toLowerCase() === "juan" ||
        number?.split(" ")?.[1]?.toLowerCase() === "wun"
    );
  } else if (numberInView === 2) {
    result = text?.some(
      (number: string) =>
        number?.split(" ")?.[1] === numberInView.toString() ||
        number?.split(" ")?.[1]?.toLowerCase() === "two" ||
        number?.split(" ")?.[1]?.toLowerCase() === "to" ||
        number?.split(" ")?.[1]?.toLowerCase() === "tu" ||
        number?.split(" ")?.[1]?.toLowerCase() === "too" ||
        number?.split(" ")?.[1]?.toLowerCase() === "tue"
    );
  } else if (numberInView === 3) {
    result = text?.some(
      (number: string) =>
        number?.split(" ")?.[1] === numberInView.toString() ||
        number?.split(" ")?.[1]?.toLowerCase() === "three" ||
        number?.split(" ")?.[1]?.toLowerCase() === "tree" ||
        number?.split(" ")?.[1]?.toLowerCase() === "thre" ||
        number?.split(" ")?.[1]?.toLowerCase() === "free" ||
        number?.split(" ")?.[1]?.toLowerCase() === "thri"
    );
  } else if (numberInView === 4) {
    result = text?.some(
      (number: string) =>
        number?.split(" ")?.[1] === numberInView.toString() ||
        number?.split(" ")?.[1]?.toLowerCase() === "four" ||
        number?.split(" ")?.[1]?.toLowerCase() === "for" ||
        number?.split(" ")?.[1]?.toLowerCase() === "fore" ||
        number?.split(" ")?.[1]?.toLowerCase() === "phor" ||
        number?.split(" ")?.[1]?.toLowerCase() === "phore"
    );
  } else if (numberInView === 5) {
    result = text?.some(
      (number: string) =>
        number?.split(" ")?.[1] === numberInView.toString() ||
        number?.split(" ")?.[1]?.toLowerCase() === "five" ||
        number?.split(" ")?.[1]?.toLowerCase() === "v" ||
        number?.split(" ")?.[1]?.toLowerCase() === "fife" ||
        number?.split(" ")?.[1]?.toLowerCase() === "fiv" ||
        number?.split(" ")?.[1]?.toLowerCase() === "phive"
    );
  } else if (numberInView === 6) {
    result = text?.some(
      (number: string) =>
        number?.split(" ")?.[1] === numberInView.toString() ||
        number?.split(" ")?.[1]?.toLowerCase() === "six" ||
        number?.split(" ")?.[1]?.toLowerCase() === "sicks" ||
        number?.split(" ")?.[1]?.toLowerCase() === "siks" ||
        number?.split(" ")?.[1]?.toLowerCase() === "sick" ||
        number?.split(" ")?.[1]?.toLowerCase() === "sik"
    );
  } else if (numberInView === 7) {
    result = text?.some(
      (number: string) =>
        number?.split(" ")?.[1] === numberInView.toString() ||
        number?.split(" ")?.[1]?.toLowerCase() === "seven" ||
        number?.split(" ")?.[1]?.toLowerCase() === "sevin" ||
        number?.split(" ")?.[1]?.toLowerCase() === "sevun" ||
        number?.split(" ")?.[1]?.toLowerCase() === "sev" ||
        number?.split(" ")?.[1]?.toLowerCase() === "sevin"
    );
  } else if (numberInView === 8) {
    result = text?.some(
      (number: string) =>
        number?.split(" ")?.[1] === numberInView.toString() ||
        number?.split(" ")?.[1]?.toLowerCase() === "eight" ||
        number?.split(" ")?.[1]?.toLowerCase() === "ate" ||
        number?.split(" ")?.[1]?.toLowerCase() === "ait" ||
        number?.split(" ")?.[1]?.toLowerCase() === "ait" ||
        number?.split(" ")?.[1]?.toLowerCase() === "ate"
    );
  } else if (numberInView === 9) {
    result = text?.some(
      (number: string) =>
        number?.split(" ")?.[1] === numberInView.toString() ||
        number?.split(" ")?.[1]?.toLowerCase() === "nine" ||
        number?.split(" ")?.[1]?.toLowerCase() === "nien" ||
        number?.split(" ")?.[1]?.toLowerCase() === "nien" ||
        number?.split(" ")?.[1]?.toLowerCase() === "nien" ||
        number?.split(" ")?.[1]?.toLowerCase() === "nien"
    );
  } else {
    result = false;
  }

  return result;
};

export const getNextTextSize = (curr: number) => {
  switch (curr) {
    case 202.6:
      return 173.3;
    case 173.3:
      return 144;
    case 144:
      return 116;
    case 116:
      return 86.6;
    case 86.6:
      return 57.3;
    case 57.3:
      return 44;
    case 44:
      return 28;
    case 28:
      return 20;
    case 20:
      return 12;
    case 12:
      return 0;
    default:
      return 0;
  }
};

export const setLongDistanceVisionTestStep = (
  step: LongDIstanceVisionTestSteps,
  setCurrentStep: React.Dispatch<
    React.SetStateAction<LongDIstanceVisionTestSteps>
  >
) => {
  switch (step) {
    case LongDIstanceVisionTestSteps.SIZE_202_6:
      setCurrentStep(LongDIstanceVisionTestSteps.SIZE_173_3);
      break;
    case LongDIstanceVisionTestSteps.SIZE_173_3:
      setCurrentStep(LongDIstanceVisionTestSteps.SIZE_144);
      break;
    case LongDIstanceVisionTestSteps.SIZE_144:
      setCurrentStep(LongDIstanceVisionTestSteps.SIZE_116);
      break;
    case LongDIstanceVisionTestSteps.SIZE_116:
      setCurrentStep(LongDIstanceVisionTestSteps.SIZE_86_6);
      break;
    case LongDIstanceVisionTestSteps.SIZE_86_6:
      setCurrentStep(LongDIstanceVisionTestSteps.SIZE_57_3);
      break;
    case LongDIstanceVisionTestSteps.SIZE_57_3:
      setCurrentStep(LongDIstanceVisionTestSteps.SIZE_44);
      break;
    case LongDIstanceVisionTestSteps.SIZE_44:
      setCurrentStep(LongDIstanceVisionTestSteps.SIZE_28);
      break;
    case LongDIstanceVisionTestSteps.SIZE_28:
      setCurrentStep(LongDIstanceVisionTestSteps.SIZE_20);
      break;
    case LongDIstanceVisionTestSteps.SIZE_20:
      setCurrentStep(LongDIstanceVisionTestSteps.SIZE_12);
      break;
    case LongDIstanceVisionTestSteps.SIZE_12:
      setCurrentStep(LongDIstanceVisionTestSteps.PASSED);
      break;
    default:
      setCurrentStep(LongDIstanceVisionTestSteps.SIZE_202_6);
      break;
  }
};

export const getNextNearTextSize = (currentSize: number) => {
  switch (currentSize) {
    case 137:
      return 69;
    case 69:
      return 55;
    case 55:
      return 48;
    case 48:
      return 34;
    case 34:
      return 28;
    case 28:
      return 21;
    case 21:
      return 17;
    case 17:
      return 14;
    case 14:
      return 11;
    case 11:
      return 0;
    default:
      return 0;
  }
};

export const setShortDistanceVisionTestStep = (
  step: ShortDistanceVisionTestSteps,
  setCurrentStep: React.Dispatch<
    React.SetStateAction<ShortDistanceVisionTestSteps>
  >
) => {
  switch (step) {
    case ShortDistanceVisionTestSteps.SIZE_J10:
      setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J7);
      break;
    case ShortDistanceVisionTestSteps.SIZE_J7:
      setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J6);
      break;
    case ShortDistanceVisionTestSteps.SIZE_J6:
      setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J5);
      break;
    case ShortDistanceVisionTestSteps.SIZE_J5:
      setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J4);
      break;
    case ShortDistanceVisionTestSteps.SIZE_J4:
      setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J3);
      break;
    case ShortDistanceVisionTestSteps.SIZE_J3:
      setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J2);
      break;
    case ShortDistanceVisionTestSteps.SIZE_J2:
      setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J1PLUS);
      break;
    case ShortDistanceVisionTestSteps.SIZE_J1PLUS:
      setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J1);
      break;
    case ShortDistanceVisionTestSteps.SIZE_J1:
      setCurrentStep(ShortDistanceVisionTestSteps.PASSED);
      break;
    default:
      setCurrentStep(ShortDistanceVisionTestSteps.SIZE_J10);
      break;
  }
};
