import { ForgotPasswordLinkType } from "@/typescript/type/auth.type";
import { InputType } from "@/typescript/type/input.type";


export const forgotPasswordLinkInput: InputType<ForgotPasswordLinkType>[] = [
  {
    label: "email",
    required: true,
    name: "email",
    type: "text",
    placeholder: "Enter your email"
  }
  
];