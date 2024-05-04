export const identifiyLetters = (
  text: string[],
  letterInView: string
): boolean => {
  const result = text?.some(
    (letter: string) =>
      letter?.split(" ")[1]?.toLowerCase() === letterInView.toLowerCase()
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
