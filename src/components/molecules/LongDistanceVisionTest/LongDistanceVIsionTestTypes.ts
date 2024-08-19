export enum LongDIstanceVisionTestSteps {
  FAILED = "FAILED",
  PASSED = "PASSED",
  SIZE_202_6 = "SIZE_202_6", //152pt
  SIZE_173_3 = "SIZE_173_3", //130pt
  SIZE_144 = "SIZE_144", //108pt
  SIZE_116 = "SIZE_116", //87pt
  SIZE_86_6 = "SIZE_86_6", //65pt
  SIZE_57_3 = "SIZE_57_3", //43pt
  SIZE_44 = "SIZE_44", //33pt
  SIZE_28 = "SIZE_28", //21pt
  SIZE_20 = "SIZE_20", //15pt
  SIZE_12 = "SIZE_12", //9pt
}

export enum PersonalizedDistance {
  ONEMETER = 1,
  POINTFIMEMETER = 0.5,
  TWOMETER = 2,
  FOURMETER = 4,
}

export enum ResultStatus {
  FAILED = "FAILED",
  PASSED = "PASSED",
  NULL = "NULL",
}
export type VisionTestStateType = {
  date: Date;
  week: number;
  year: number;
  testCompleted: boolean;
  testResults: {
    leftEye: {
      result: {
        202.6: number;
        173.3: number;
        144: number;
        116: number;
        86.6: number;
        57.3: number;
        44: number;
        28: number;
        20: number;
        12: number;
      };
      status: string;
    };
    rightEye: {
      result: {
        202.6: number;
        173.3: number;
        144: number;
        116: number;
        86.6: number;
        57.3: number;
        44: number;
        28: number;
        20: number;
        12: number;
      };
      status: string;
    };
  };
};

export type Results = {
  [key: string]: number;
};
