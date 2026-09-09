import * as yup from "yup";
export const forgotPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "New Password must contain at least one letter, one digit, and one special character")
    .min(6, "New Password must be at least 6 character")
    .max(15, "New Password cannot exceed 15 character")
    .required("New Password is required"),
  confirmPassword: yup
    .string()
    .trim()
    .required("Confirm Password is required"),  
});
