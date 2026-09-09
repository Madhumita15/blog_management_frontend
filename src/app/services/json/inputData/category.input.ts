import { categoryType } from "@/typescript/type/category.input";
import { InputType } from "@/typescript/type/input.type";

export const categoryInput: InputType<categoryType>[] = [
  {
    label: "name",
    required: true,
    placeholder: "Enter category name",
    name: "name",
    type: "text",
  },
  
];
