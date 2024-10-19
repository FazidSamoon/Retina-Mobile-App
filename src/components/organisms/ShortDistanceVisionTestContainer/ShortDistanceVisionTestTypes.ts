export enum ShortDistanceVisionTestSteps {
  FAILED = "FAILED",
  PASSED = "PASSED",
  SIZE_J10 = "SIZE_J10",
  SIZE_J7 = "SIZE_J7",
  SIZE_J6 = "SIZE_J6",
  SIZE_J5 = "SIZE_J5",
  SIZE_J4 = "SIZE_J4",
  SIZE_J3 = "SIZE_J3",
  SIZE_J2 = "SIZE_J2",
  SIZE_J1PLUS = "SIZE_J1+",
  SIZE_J1 = "SIZE_J71",
}

export enum ResultStatus {
  FAILED = "FAILED",
  PASSED = "PASSED",
  NULL = "NULL",
}
export type ShortDistanceVisionTestStateType = {
  date: Date;
  week: number;
  year: number;
  testCompleted: boolean;
  testResults: {
    leftEye: {
      result: {
        137: number;
        69: number;
        55: number;
        48: number;
        34: number;
        28: number;
        21: number;
        17: number;
        14: number;
        11: number;
      };
      status: string;
    };
    rightEye: {
      result: {
        137: number;
        69: number;
        55: number;
        48: number;
        34: number;
        28: number;
        21: number;
        17: number;
        14: number;
        11: number;
      };
      status: string;
    };
  };
};

export type Results = {
  [key: string]: number;
};
