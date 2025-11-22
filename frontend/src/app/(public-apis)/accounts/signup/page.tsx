"use client";

import {
  registerSchema,
  schoolName,
} from "@/validation/register/user.register";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { api } from "@/axios/client";
import { easeInOut, motion } from "framer-motion";

type userRegister = z.infer<typeof registerSchema>;

const signUp = () => {
  //useStates

  const [step, setStep] = useState<"basic" | "password">("basic");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirPassword, setShowConfirPassword] = useState(false);
  const router = useRouter();

  //zod validation
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<userRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  //function toggle password
  const onBasicNext = async () => {
    const isValid = await trigger(["name", "email"]);
    if (isValid) {
      setStep("password");
    }
  };

  const backStepOne = () => {
    setStep("basic");
  };

  // get schoolId from URL
  const searchParam = useSearchParams();
  const schoolId = searchParam.get("schoolId");

  const onSubmit = async (data: userRegister) => {
    try {
      setLoading(true);
      // caliing api
      const res = await api.post("/auth-admin/register", {
        ...data,
        schoolId,
      });

      router.push(`/dashboard`);

      const { admin } = res.data;
      // add custom funny greating
      const greatings = [
        "Yo, you're in",
        "Hi !!",
        "Hello",
        "Welcome aboard",
        "Salam",
      ];
      const randomGreating =
        greatings[Math.floor(Math.random() * greatings.length)];

      toast.success(`${randomGreating} ${admin}`);
    } catch (error: any) {
      const message = error.response.data.message;
      toast.error(message || "Registration failed. Try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: easeInOut }}
      className="flex flex-grow items-center justify-center"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <Card className="w-full flex flex-col gap-6 p-10">
          <span className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-3xl">Arday Bile</h1>
            <p className="text-sm text-secondary-foreground dark:text-primary">
              Register your account
            </p>
          </span>

          {/* step one hide name */}

          {step === "basic" && (
            <>
              <div>
                <Label className="mb-2 block"> Name</Label>
                <Input
                  autoComplete="new-password"
                  placeholder="Enter your name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-400 mt-2 text-sm">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label className="mb-2 block">Email</Label>
                <Input placeholder="Enter your email" {...register("email")} />
                {errors.email && (
                  <p className="text-red-400 mt-2 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                type="button"
                onClick={onBasicNext}
                className="hover:space-x-1 transition-all duration-200 "
              >
                <span>Next</span>
                <ArrowRight />
              </Button>
            </>
          )}

          {/* password section */}
          {step === "password" && (
            <>
              <span className="hover:gap-2">
                <Button size="sm" onClick={backStepOne}>
                  <ArrowLeft />
                </Button>
              </span>
              <div className=" relative">
                <Label className="mb-2 block">Password</Label>
                <Input
                  autoComplete="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                />
                <span
                  className=" absolute right-4 top-7.5 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
                {errors.password && (
                  <p className="text-red-400 mt-2 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className=" relative">
                <Label className="mb-2 block">Confirm Password</Label>
                <Input
                  autoComplete="new-password"
                  type={showConfirPassword ? "text" : "password"}
                  placeholder="Enter conirm passowrd"
                  {...register("confirmPassword")}
                />
                <span
                  className=" absolute right-4 top-7.5 cursor-pointer"
                  onClick={() => setShowConfirPassword((prev) => !prev)}
                >
                  {showConfirPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </span>

                {errors.confirmPassword && (
                  <p className="text-red-400 mt-2 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button
                disabled={loading}
                type="submit"
                className="w-full flex items-center justify-center"
              >
                {loading ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Register"
                )}
              </Button>
            </>
          )}

          {/* link */}
          <div className="flex flex-col gap-2 items-center justify-center text-sm text-secondary-foreground dark:text-primary">
            <Link href="/accounts/login" className="hover:underline">
              I have an account?
            </Link>

            <Link href="/accounts/school-register" className="hover:underline">
              I didn't register a school?
            </Link>
          </div>
        </Card>
      </form>
    </motion.div>
  );
};

export default signUp;
