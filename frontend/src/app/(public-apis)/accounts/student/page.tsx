"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/validation/login/user.login.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "@/axios/client";
import { easeInOut, motion } from "framer-motion";
import { StudentLoginSchema } from "@/validation/Student";
import { useMutation } from "@tanstack/react-query";
import { saveReport } from "@/lib/SaveReport";

type studentLogin = z.infer<typeof StudentLoginSchema>;

const login = () => {
  const router = useRouter();
  //use states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<studentLogin>({
    resolver: zodResolver(StudentLoginSchema),
    defaultValues: {
      code: "",
      password: "",
    },
    mode: "onChange",
  });

  // calling api

  const login = useMutation({
    mutationFn: async (payload: studentLogin) => {
      const res = await api.post("/student/login", payload);
      return res.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("active_student", JSON.stringify(data));
      saveReport(data);
      router.push("/student-profile");
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Invalid Credentials";
      toast.error(msg);
    },
  });

  const onSubmit = async (data: studentLogin) => {
    login.mutate(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: easeInOut }}
      className=" flex flex-grow items-center justify-center">
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
            <section>
              <Label className="block mb-1">ID</Label>
              <Input {...register("code")} placeholder="Enter your ID" />
              {errors.code && (
                <p className="text-xs text-red-500">{errors.code?.message}</p>
              )}
            </section>

            <section className="relative">
              <Label className="block mb-1">Password</Label>
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <span
                className=" absolute right-4 top-6.5 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </section>

            <Button
              className="flex items-center tracking-wide"
              type="submit"
              disabled={login.isPending}>
              {login.isPending ? (
                <Loader2Icon className="animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </Card>
      </form>
    </motion.div>
  );
};

export default login;

const studetnData = {
  message: "Student data",
  student: {
    id: "e318792e-da0d-4032-829f-cd9a13b1bf24",
    name: "zuhaib ahmed cali",
    code: "5947",
    role: "STUDENT",
    school: {
      name: "Zuhaib Seconday School",
    },
  },
  formattedResult: [
    {
      name: "somali",
      grade: 90,
      status: "B",
    },
    {
      name: "English",
      grade: 100,
      status: "A",
    },
    {
      name: "Sceince",
      grade: 70,
      status: "C",
    },
    {
      name: "Arabic",
      grade: 80,
      status: "B",
    },
    {
      name: "Tarbia",
      grade: 90,
      status: "B",
    },
    {
      name: "maths",
      grade: 80,
      status: "B",
    },
    {
      name: "social",
      grade: 100,
      status: "A",
    },
  ],
  total: 610,
  average: 87.14285714285714,
  grade: "B",
};
