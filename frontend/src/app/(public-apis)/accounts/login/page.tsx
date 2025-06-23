"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/store/axios/api";
import { loginSchema } from "@/validation/login/user.login.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type userLogin = z.infer<typeof loginSchema>;

const login = () => {
  const router = useRouter();
  //use states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<userLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  // calling api
  const onSubmit = async (data: userLogin) => {
    try {
      setLoading(true);
      const res = await api.post("/auth-admin/login", {
        ...data,
      });

      const { name } = res.data;
      // add custom funny greating
      const greatings = [
        "Welocme back!!",
        "Hi !!",
        "Hello",
        "Hi there",
        "Salam",
      ];
      const randomGreating =
        greatings[Math.floor(Math.random() * greatings.length)];
      toast.success(`${randomGreating} ${name}`);
      //and push the user into the dashboard
      router.push("/dashboard");
    } catch (error: any) {
      console.log({
        ...data,
      });
      const message = error.response.data.message;
      toast.error(message || "Something went wrong please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-grow items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full max-w-md ">
        <Card className=" w-full flex flex-col gap-6 p-10">
          {/* name */}
          <span className=" flex flex-col items-center justify-center">
            <h1 className=" font-semibold text-3xl">Arday Bile</h1>
            <p className=" text-sm text-secondary-foreground dark:text-primary">
              Welcome Back !!
            </p>
          </span>
          {/* Login data */}

          <div className="flex flex-col gap-4">
            {/* email */}
            <section>
              <Label className=" block mb-1">Email</Label>
              <Input {...register("email")} placeholder="Enter your email" />

              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
              {/* password */}
            </section>
            {/* Password section */}
            <section className=" relative">
              <Label className=" block mb-1">Password</Label>
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your passpwrd"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}

              <span
                className=" absolute right-4 top-6.5 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </section>
            {/* submit button */}
            <Button
              className=" flex items-center tracking-wide"
              type="submit"
              disabled={loading}
            >
              {loading ? <Loader2Icon className=" animate-spin" /> : "Login"}
            </Button>

            {/* link */}
            <div className="flex flex-col gap-2 items-center justify-center text-sm text-secondary-foreground dark:text-primary">
              <Link href="/accounts/signup" className="hover:underline">
                I don't have an account?
              </Link>

              <Link
                href="/accounts/school-register"
                className="hover:underline"
              >
                I didn't register a school?
              </Link>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default login;
