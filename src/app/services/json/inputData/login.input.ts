import { LoginType } from "@/typescript/type/auth.type";
import { InputType } from "@/typescript/type/input.type";


export const LoginInput: InputType<LoginType>[] = [
  {
    label: "email",
    required: true,
    name: "email",
    type: "text",
    placeholder: "Enter your email"
  },
  {
    label: "password",
    required: true,
    name: "password",
    type: "password",
    placeholder: "Enter your password"
  },
];
