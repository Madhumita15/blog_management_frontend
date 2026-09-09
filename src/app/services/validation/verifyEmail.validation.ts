import * as yup from "yup";
export const verifyEmailSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),

  otp: yup.string().matches(/^\d{4}$/, "OTP must be 4 digit").required("OTP is required")  
});
