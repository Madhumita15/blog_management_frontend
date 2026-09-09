import { verifyEmailType } from "@/typescript/type/auth.type";
import { InputType } from "@/typescript/type/input.type";


export const verifyEmail: InputType<verifyEmailType>[] = [
  {
    label: "email",
    required: true,
    name: "email",
    type: "text",
    placeholder: "Enter your email"
  },
  {
    label: "OTP",
    required: true,
    name: "otp",
    type: "text",
    placeholder: "Enter otp"
  }
];