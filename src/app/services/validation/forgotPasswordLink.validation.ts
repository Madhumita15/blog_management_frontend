import * as yup from "yup";
export const forPasswordLinkSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Email is required"),
  
});
