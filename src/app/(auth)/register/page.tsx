
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DynamicInput from "@/components/DynamicInput";
import { registerSchema } from "@/app/services/validation/register.validation";
import { RegisterInput } from "@/app/services/json/inputData/register.input";
import { RegisterType } from "@/typescript/type/auth.type";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { Spinner } from "@/components/ui/spinner";

const Register = () => {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState("");
  const { registerUser, loading } = useAuthStore();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    register,
  } = useForm<RegisterType>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      profile_image: null,
    },
  });

  const onSubmit = async (data: RegisterType) => {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("password", data.password);
    if (data.profile_image) {
      formData.append("profile_image", data.profile_image);
    }

    console.log("formData", formData);
    try {
      const response = await registerUser({ data: formData });
      console.log("response from register page", response);
      if (response?.status === true) {
        toast.success(response?.message);
        reset({
          name: "",
          email: "",
          password: "",
          phone: "",
          profile_image: null,
        });
        router.push("/verifyEmail");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-slate-950 min-h-screen flex justify-center items-center px-4">
        <Card className="w-full max-w-sm p-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white text-xl font-semibold">
              Create your account
            </CardTitle>

            <CardAction>
              <Link
                href={"/login"}
                className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
              >
                Login
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex flex-col gap-6">
                {RegisterInput.map((input) => (
                  <DynamicInput
                    key={input.name}
                    label={input.label}
                    register={register}
                    name={input.name}
                    placeholder={input.placeholder}
                    type={input.type}
                    loading={loading}
                    error={errors[input.name]?.message}
                    required={input.required}
                  />
                ))}
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
                disabled={loading}
                type="file"
                name="profile_image"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file?.size as number> 1 * 1024 * 1024) {
                    toast.success("File size must be less than 1mb");
                    return;
                  }
                  if (file) {
                    setValue("profile_image", file, {
                      shouldValidate: true,
                    });
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
                className="bg-slate-900 border-slate-700 text-slate-300 file:bg-pink-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 hover:border-slate-600 focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500 cursor-pointer"
              />

              <Button
                disabled={loading}
                type="submit"
                className="w-full cursor-pointer bg-pink-600 hover:bg-pink-700 text-white font-medium transition-colors duration-200"
              >
                {loading ? <Spinner /> : "Sign Up"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Register;
