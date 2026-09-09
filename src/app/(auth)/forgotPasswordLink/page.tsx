
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
import { yupResolver } from "@hookform/resolvers/yup";
import DynamicInput from "@/components/DynamicInput";
import { ForgotPasswordLinkType } from "@/typescript/type/auth.type";
import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";
import { Spinner } from "@/components/ui/spinner";
import { forPasswordLinkSchema } from "@/app/services/validation/forgotPasswordLink.validation";
import { forgotPasswordLinkInput } from "@/app/services/json/inputData/forgotPasswordLink";

const ForgotPasswordLink = () => {
  const { loading, forgotUserPasswordLink } = useAuthStore();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<ForgotPasswordLinkType>({
    resolver: yupResolver(forPasswordLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: {email: string}) => {
    try {
      const response = await forgotUserPasswordLink(data);
      // console.log("response from forgot password link page", response);

      if (response?.status === true) {
        toast.success(response.message);
        reset({
          email: "",
        });
        router.push("/checkMail");
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
              Forgot your password?
            </CardTitle>

            <CardDescription className="text-slate-400 text-sm leading-6">
              Enter your email address and we will send you a link to reset
              your password.
            </CardDescription>

            <CardAction>
              <Link
                href={"/login"}
                className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
              >
                Go Back
              </Link>
            </CardAction>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex flex-col gap-6">
                {forgotPasswordLinkInput.map((input) => (
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
                {loading ? <Spinner /> : "Send Reset Link"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ForgotPasswordLink;