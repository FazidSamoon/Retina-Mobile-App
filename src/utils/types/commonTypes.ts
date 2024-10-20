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

export interface TimeSlot {
  start: string;
  end: string;
  _id: string;
}

export interface Doctor {
  ratings: number;
  _id: string;
  name: string;
  email: string;
  location: string;
  occupation: string;
  phone: string;
  gender: string;
  user: string;
  channelingSchedule: {
    MONDAY: TimeSlot[];
    TUESDAY: TimeSlot[];
    WEDNESDAY: TimeSlot[];
    THURSDAY: TimeSlot[];
    FRIDAY: TimeSlot[];
    SATURDAY: TimeSlot[];
    SUNDAY: TimeSlot[];
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  name: string;
  password: string;
  gender: string;
  date_of_birth: string;
  phone: string;
  eye_deciease: string;
  location: string;
  occupation: string;
  is_loggedIn: boolean;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Channeling {
  _id: string;
  doctor: Doctor;
  user: User;
  date: string;
  timeSlot: TimeSlot;
  type: "IN-HOUSE" | "VIDEOCONFERENCE";
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "PENDING";
  meetLink: string | null;
  __v: number;
}
