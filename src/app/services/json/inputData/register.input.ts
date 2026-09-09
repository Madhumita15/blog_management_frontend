import { RegisterType } from "@/typescript/type/auth.type";
import { InputType } from "@/typescript/type/input.type";

export const RegisterInput:InputType<RegisterType>[] = [
  {
    label: "Name",
    required: true,
    name: "name",
    type: "text",
    placeholder: "Enter your name",
  },
  {
    label: "Email",
    required: true,
    name: "email",
    type: "text",
    placeholder: "Enter your email",
  },
  {
    label: "Password",
    required: true,
    name: "password",
    type: "password",
    placeholder: "Enter your password",
  },
  {
    label: "Phone",
    required: true,
    name: "phone",
    type: "text",
    placeholder: "Enter your Phone No",
  },
 
];
