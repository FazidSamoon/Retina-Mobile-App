export const identifiyLetters = (text: string[], letterInView: string): boolean => {
    const result = text?.some((letter: string) => letter?.split(" ")[1]?.toLowerCase() === letterInView.toLowerCase());
    return result;
};
