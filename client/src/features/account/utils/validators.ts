import * as yup from "yup";

export const validationLoginSchema = yup.object({
  username: yup
    .string()
    .trim("Username is required")
    .max(20, "Username should be of maximum 20 characters length")
    .required("Username is required"),
  password: yup
    .string()
    .trim("Username is required")
    .min(8, "Password should be of minimum 8 characters length")
    .max(20, "Password should be of minimum 20 characters length")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password should be containd one special character and one digit"
    )
    .required("Password is required"),
});
