
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DynamicInput from "@/components/DynamicInput";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { verifyEmailSchema } from "@/app/services/validation/verifyEmail.validation";
import { verifyEmail } from "@/app/services/json/inputData/verifyEmail";
import { Spinner } from "@/components/ui/spinner";
import { VerifyEmailData } from "@/typescript/type/auth.type";

const VerifyEmail = () => {
  const { loading, verifyUserEmail } = useAuthStore();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<VerifyEmailData>({
    resolver: yupResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const onSubmit = async (data: {email: string, otp: string}) => {
    console.log(data);
    try {
      const response = await verifyUserEmail(data);
      // console.log("verify email user from verifyEmail", response);

      if (response?.status === true) {
        toast.success(response?.message);
        reset({
          email: "",
          otp: "",
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
            Verify your email
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col gap-6">
              {verifyEmail.map((input) => (
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
              disabled={loading}
              type="submit"
              className="w-full cursor-pointer bg-pink-600 hover:bg-pink-700 text-white font-medium transition-colors duration-200"
            >
              {loading ? <Spinner /> : "verify email"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmail;
