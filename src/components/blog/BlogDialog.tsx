"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { blogInput } from "@/app/services/json/inputData/blog.input";
import DynamicInput from "../DynamicInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogSchema } from "@/app/services/validation/blog.validation";
import { BlogType } from "@/typescript/type/blog.input";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useCreateBlog, useUpdateBlog } from "@/hooks/useBlog";
import { Spinner } from "../ui/spinner";
import { BlogDialogType } from "@/typescript/interface/blog.interface";




const BlogDialog:React.FC<BlogDialogType> = ({
  open,
  setOpen,
  isEdit,
  setIsEdit,
  allBlogData,
  categoryData,
}) => {
  const [previewImage, setPreviewImage] = useState("");

  const { mutateAsync: createMutate, isPending: createIsPending } =
    useCreateBlog();
  const { mutateAsync: updateMutate, isPending: updateIsPending } =
    useUpdateBlog();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BlogType>({
    resolver: yupResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      blog_image: null,
    },
  });

  const onSubmit = async (data: BlogType) => {
    // console.log(data);
    // console.log("isEdit", isEdit);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("category", data.category);
    if (data.blog_image) {
      formData.append("blog_image", data.blog_image);
    }

    try {
      if (isEdit) {
        await updateMutate({ data: formData, id: isEdit });
      } else {
        await createMutate({ data: formData });
      }
      reset({
        title: "",
        content: "",
        category: "",
        blog_image: null,
      });
      setPreviewImage("");
      setIsEdit(null);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEdit && allBlogData) {
      const blogData = allBlogData?.find((item) => item._id === isEdit);
      if(!blogData) return
      reset({
        title: blogData.title ?? "",
        content: blogData.content ?? "",
        category: blogData.category._id ?? "",
      });
      if (blogData.blog_image) {
        setPreviewImage(blogData.blog_image);
      }
    }
  }, [isEdit, reset, allBlogData]);
  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) {
            reset({
              title: "",
              content: "",
              category: "",
              blog_image: null,
            });
            setIsEdit(null);
            setPreviewImage("");
          }
        }}
      >
        <DialogContent className="sm:max-w-sm bg-slate-800 border border-slate-800 text-slate-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
            <DialogHeader>
              <DialogTitle className="text-pink-500 font-bold text-xl">
                {isEdit ? "Update" : "Add"} Blog
              </DialogTitle>
            </DialogHeader>
            {blogInput.map((input) => (
              <DynamicInput
                key={input.name}
                label={input.label}
                required={input.required}
                type={input.type}
                name={input.name}
                error={errors[input.name]?.message}
                placeholder={input.placeholder}
                register={register}
                loading={createIsPending || updateIsPending}
              />
            ))}

            <div>
              <label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
                Category
              </label>
              <select
                disabled={createIsPending || updateIsPending}
                {...register("category")}
                className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 transition-all duration-200 hover:border-slate-600 focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500  w-full p-2 rounded-md "
                name="category"
              >
                <option value={""}>---select category---</option>
                {categoryData?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="flex justify-center items-center">
              {previewImage && (
                <Image
                  src={previewImage}
                  alt="profile"
                  width={100}
                  height={100}
                  className="border-pink-500 border-4 rounded-full"
                />
              )}
            </div>

            <Input
              disabled={createIsPending || updateIsPending}
              className="bg-slate-900 border-slate-700 text-slate-100 file:bg-pink-500 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 hover:border-pink-200"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;

                if (file?.size as number> 1 * 1024 * 1024) {
                  toast.error("File must be less than 1 MB");
                  return;
                }
                if (file) {
                  setPreviewImage(URL.createObjectURL(file));
                  setValue("blog_image", file, { shouldValidate: true });
                }
              }}
            />
            {errors.blog_image && (
              <p className="text-sm text-red-500">
                {errors.blog_image.message}
              </p>
            )}

            <DialogFooter className="bg-transparent">
              <Button
                disabled={createIsPending || updateIsPending}
                className={"cursor-pointer border-2 border-gray-500"}
                variant={"destructive"}
                onClick={() => {
                  setIsEdit(null);
                  reset({
                    title: "",
                    content: "",
                    category: "",
                    blog_image: null,
                  });
                  setPreviewImage("");
                  setOpen(false);
                }}
              >
                cancel
              </Button>

              <Button
                disabled={createIsPending || updateIsPending}
                type="submit"
                className={
                  "cursor-pointer  bg-pink-700 text-white hover:bg-slate-900 hover:text-pink-200 hover:border-2 hover:border-black border-2 border-white  px-3 py-1 font-bold rounded-md"
                }
              >
                {createIsPending ? <Spinner /> : isEdit ? "Update" : "Add"} Blog
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogDialog;
