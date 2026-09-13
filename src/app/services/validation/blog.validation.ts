import { BlogType, UpdateBlogType } from "@/typescript/type/blog.input";
import * as yup from "yup";
export const blogSchema:yup.ObjectSchema<BlogType> = yup.object({
  title: yup
    .string()
    .trim()
    .matches(
      /^[A-Za-z0-9\s"',.()?&#@!-;:]+$/,
      "Blog title can contain letters, numbers, spaces and basic punctuation",
    )
    .required("Blog title is required"),
  content: yup
    .string()
    .trim()
    .matches(
      /^[A-Za-z0-9\s"',.()?&#@!;:]+$/,
      "Blog content can contain letters, numbers, spaces and basic punctuation",
    )
    .required("Blog content is required"),

  category: yup.string().trim().required("Category is required"),
  blog_image: yup.mixed<File>().nullable().required("Blog Image is required"),
});


export const updateblogSchema:yup.ObjectSchema<BlogType> = yup.object({
  title: yup
    .string()
    .trim()
    .matches(
      /^[A-Za-z0-9\s"',.()?&#@!-;:]+$/,
      "Blog title can contain letters, numbers, spaces and basic punctuation",
    )
    .required("Blog title is required"),
  content: yup
    .string()
    .trim()
    .matches(
      /^[A-Za-z0-9\s"',.()?&#@!;:]+$/,
      "Blog content can contain letters, numbers, spaces and basic punctuation",
    )
    .required("Blog content is required"),

  category: yup.string().trim().required("Category is required"),
  blog_image: yup.mixed<File>().nullable().notRequired(),
});
