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
