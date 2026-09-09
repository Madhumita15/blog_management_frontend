
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/app/services/validation/login.validation";
import { yupResolver } from "@hookform/resolvers/yup";
import DynamicInput from "@/components/DynamicInput";
import { LoginType } from "@/typescript/type/auth.type";
import { LoginInput } from "@/app/services/json/inputData/login.input";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { Spinner } from "@/components/ui/spinner";

const Login = () => {
  const router = useRouter();
  const { loginUser, loading, error } = useAuthStore();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<LoginType>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log("errof from login", error);

  const onSubmit = async (data: LoginType) => {
    try {
      const response = await loginUser(data);


      if (response.status === true) {
        toast.success(response.message);

        reset({
          email: "",
          password: "",
        });

        if (response?.data?.role === "user") {
          router.push("/");
        } else if (
          response?.data?.role === "admin" ||
          response?.data?.role === "writer"
        ) {
          router.push("/admin/dashboard");
        }
      } else {
        console.log(response)
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
            <CardTitle className="text-white text-xl font-semibold pt-3">
              Login to your account
            </CardTitle>

            <CardDescription className="text-slate-400">
              Enter your email below to login to your account
            </CardDescription>

            <CardAction>
              <Link
                href={"/register"}
                className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
              >
                Sign Up
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex flex-col gap-6">
                {LoginInput.map((input) => (
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

              <Button
                type="submit"
                className="w-full cursor-pointer bg-pink-600 hover:bg-pink-700 text-white font-medium transition-colors duration-200"
              >
                {loading ? <Spinner /> : "Login"}
              </Button>
            </form>
          </CardContent>

          <Link
            href={"/forgotPasswordLink"}
            className="text-center text-sm text-slate-400 hover:text-pink-400 transition-colors"
          >
            Forgot your Password?
          </Link>
        </Card>
      </div>
    </>
  );
};

export default Login;
