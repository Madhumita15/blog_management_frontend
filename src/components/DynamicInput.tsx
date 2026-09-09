
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {  useState } from "react";
import { Textarea } from "./ui/textarea";
import { Eye, EyeOffIcon } from "lucide-react";
import { Button } from "./ui/button";
import {  FieldValues, Path, UseFormRegister } from "react-hook-form";


interface DynamicInputInterface<T extends FieldValues>{
  register: UseFormRegister<T>;
  error: string | undefined;
  label: string;
  name:  Path<T>;
  type: "text" | "email" | "password" | "number" | "textarea";
  required: boolean;
  loading: boolean;
  placeholder: string;
}

const DynamicInput = <T extends FieldValues>({
  label,
  name,
  type = "text",
  register,
  error,
  required,
  loading,
  placeholder,
}: DynamicInputInterface<T>) => {
  const [viewPassword, setViewPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      <Label className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
        {required ? (
          <>
            {label}
            <span className="text-pink-500 ml-1">*</span>
          </>
        ) : (
          label
        )}
      </Label>

      {type === "text" || type === "password" ? (
        <>
          <div className="relative">
            <Input
              disabled={loading}
              placeholder={placeholder}
              type={isPassword && !viewPassword ? "password" : "text"}
              {...register(name)}
              className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 transition-all duration-200 hover:border-slate-600 focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500"
            />

            {isPassword && (
              <Button
                className="bg-transparent hover:bg-slate-800 absolute top-0 right-1 text-slate-400 hover:text-pink-400"
                onClick={() => setViewPassword(!viewPassword)}
              >
                {viewPassword ? (
                  <EyeOffIcon className="text-slate-400 hover:text-pink-400" />
                ) : (
                  <Eye className="text-slate-400 hover:text-pink-400" />
                )}
              </Button>
            )}
          </div>
        </>
      ) : (
        <Textarea
          disabled={loading}
          placeholder={placeholder}
          rows={3}
          {...register(name)}
          className="bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500 transition-all duration-200 hover:border-slate-600 focus:ring-2 focus:ring-pink-500/30 focus:border-pink-500"
        />
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// const MemoizedDynamicInput = memo(DynamicInput) as typeof DynamicInput;

export default DynamicInput;