export type VisionTestType = {
    id: string,
    title: string,
    description: string,
    onTapLink: string,
    active?: boolean
}

export const VisionTestData: VisionTestType[] = [
    {
        id: "1",
        title: "Long Distance Vision Test",
        description: "Quickly assess your long-distance vision from anywhere. Clear, simple, and convenient.",
        onTapLink: "LongDistanceVisionTest",
        active: true
    },
    {
        id: "2",
        title: "Short Distance Vision Test",
        description: "Check your near vision instantly. Easy, accurate, anytime, anywhere.",
        onTapLink: "ShortDistanceVisionTest",
        active: true
    },
    {
        id: "3",
        title: "Color Blindness Test",
        description: "Easily test for color blindness. Quick, accurate, accessible on the go.",
        onTapLink: "ColorBlindnessTest",
        active: false
    },
    {
        id: "4",
        title: "Astigmatism Test",
        description: "Assess astigmatism quickly. Simple, accurate, anytime, anywhere.",
        onTapLink: "AstigmatismTest",
        active: false
    },
    {
        id: "5",
        title: "The Contrast Vision Test",
        description: "Check your contrast vision fast. Simple, precise, accessible anytime, anywhere.",
        onTapLink: "ContrastVisionTest",
        active: false
    }
]