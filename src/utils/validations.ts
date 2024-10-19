import * as Yup from "yup";
import {
  lowerCasePattern,
  numberPattern,
  specialCharacterPattern,
  upperCasePattern,
} from "./common/regexPatterns";

export const createAccountValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please provide the email")
    .email("Invalid email format")
    .test("valid-email", "Invalid email format", (value) =>
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(value)
    ),
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Please enter the password")
    .min(8, "New password must be at least 8 characters long")
    .matches(
      lowerCasePattern(),
      "New password must contain a lowercase character"
    )
    .matches(
      upperCasePattern(),
      "New password must contain at least one uppercase character"
    )
    .matches(
      specialCharacterPattern(),
      "New password must contain at least one special character[@,$,%]"
    )
    .matches(numberPattern(), "New password must contain at least one number"),
  confirmPassword: Yup.string()
    .required("Please enter the correct password")
    .min(8, "Confirm new password must be at least 8 characters long")
    .oneOf([Yup.ref("password"), null], "Passwords do not match"),
});

export const completionValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  location: Yup.string().required("Location is required"),
  occupation: Yup.string().required("Occupation is required"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please provide the email")
    .email("Invalid email format")
    .test("valid-email", "Invalid email format", (value) =>
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(value)
    ),
  password: Yup.string().required("Password is required"),
});

export const mealFormValidationSchema = Yup.object().shape({
  mealPreference: Yup.string().required("Please select a meal preference"),
  weight: Yup.number()
    .required("Weight is required")
    .positive("Weight must be a positive number")
    .typeError("Weight must be a valid number"),
  height: Yup.number()
    .required("Height is required")
    .positive("Height must be a positive number")
    .typeError("Height must be a valid number"),
  mealType: Yup.string().required("Please select a meal type"),
  exerciseLevel: Yup.string().required("Please select your exercise level"),
});

export const exerciseValidationSchema = Yup.object().shape({
  exerciseName: Yup.string().required("Exercise is required"),
  exerciseTime: Yup.string()
    .required("Time is required")
    .matches(/^\d+$/, "Time must be a valid number"),
});

export const myInfoValidationSchema = Yup.object().shape({
  retinopathy: Yup.string().required("This field is required"),
  age: Yup.number()
    .required("Age is required")
    .min(1, "Age must be at least 1")
    .max(120, "Age must be less than or equal to 120")
    .typeError("Age must be a number"),
  heartProblems: Yup.string().required("Heart Problems is required"),
  bloodPressure: Yup.string().required("Blood Pressure is required"),
});