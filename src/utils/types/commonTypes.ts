export enum Genders {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export type RegisterUserRequest = {
  username: string;
  email: string;
  name: string;
  password: string;
  gender: string;
  date_of_birth: Date;
  phone: string;
  eye_deciease: string;
  location: string;
  occupation: string;
};

export type UserType = {
  data: {
    otherDetails: {
      __v: number;
      _id: string;
      createdAt: string;
      date_of_birth: string;
      email: string;
      eye_deciease: string;
      gender: "MALE" | "FEMALE" | "OTHER";
      is_active: boolean;
      is_loggedIn: boolean;
      location: string;
      name: string;
      occupation: string;
      phone: string;
      updatedAt: string;
      username: string;
      image?: string;
    };
    token: string;
  };
  message: string;
};

export type VisionTestChallenge = {
  id: number;
  task: string;
  status: "PENDING" | "COMPLETED";
  dificulty: "easy" | "medium" | "hard";
  identification: string[];
  scorePoints: number;
  minDistanceRequirement?: number;
  _id: string;
};

export type VisionTestChallengesResponse = {
  data: VisionTestChallenge[];
  message: string;
};