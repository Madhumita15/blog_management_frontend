import { BlogInputType } from "@/typescript/type/blog.input";
import { InputType } from "@/typescript/type/input.type";



export const blogInput: InputType<BlogInputType>[] = [
  {
    label: "title",
    required: true,
    placeholder: "Enter blog title",
    name: "title",
    type: "text",
  },
  {
    label: "content",
    required: true,
    placeholder: "Enter blog content",
    name: "content",
    type: "textarea",
  }
];
