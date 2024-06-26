export enum LongDIstanceVisionTestSteps {
  FAILED = "FAILED",
  PASSED = "PASSED",
  SIZE_202_6 = "SIZE_202_6",
  SIZE_173_3 = "SIZE_173_3",
  SIZE_144 = "SIZE_144",
  SIZE_116 = "SIZE_116",
  SIZE_86_6 = "SIZE_86_6",
  SIZE_57_3 = "SIZE_57_3",
  SIZE_44 = "SIZE_44",
  SIZE_28 = "SIZE_28",
  SIZE_20 = "SIZE_20",
  SIZE_12 = "SIZE_12",
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
