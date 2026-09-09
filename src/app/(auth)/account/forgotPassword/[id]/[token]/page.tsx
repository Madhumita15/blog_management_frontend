
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
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DynamicInput from "@/components/DynamicInput";
import { ForgotPasswordType } from "@/typescript/type/auth.type";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { Spinner } from "@/components/ui/spinner";
import { forgotPasswordSchema } from "@/app/services/validation/forgotPassword.validation";
import { forgotPasswordInput } from "@/app/services/json/inputData/forgotPassword.input";

const ForgotPassword = () => {
  const { loading, forgotPassword } = useAuthStore();
  const { id, token } = useParams();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<ForgotPasswordType>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: {newPassword: string, confirmPassword: string}) => {
    try {
      const response = await forgotPassword({
        data: data,
        id: id as string,
        token: token as string,
      });

      console.log("response from forgot password link page", response);

      if (response?.status === true) {
        toast.success(response.message);
        reset({
          newPassword: "",
          confirmPassword: "",
        });
        router.push("/login");
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-950 min-h-screen flex justify-center items-center px-4">
      <Card className="w-full max-w-sm p-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
        <CardHeader>
          <CardTitle className="text-white text-xl font-semibold">
            Create a new password
          </CardTitle>

          <CardDescription className="text-slate-400 text-sm leading-6">
            Choose a strong password that you have not used before.
          </CardDescription>

          <CardAction>
            <Link
              href="/login"
              className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
            >
              Back to Login
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col gap-6">
              {forgotPasswordInput.map((input) => (
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
              {loading ? <Spinner /> : "Reset Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;