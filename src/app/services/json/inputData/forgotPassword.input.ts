import { ForgotPasswordType } from "@/typescript/type/auth.type";
import { InputType } from "@/typescript/type/input.type";


export const forgotPasswordInput: InputType<ForgotPasswordType>[] = [
  {
    label: "NewPassword",
    required: true,
    name: "newPassword",
    type: "password",
    placeholder: "Enter your new password"
  },
  {
    label: "ConfirmPassword",
    required: true,
    name: "confirmPassword",
    type: "password",
    placeholder: "Enter your confirm password"
  }
  
];