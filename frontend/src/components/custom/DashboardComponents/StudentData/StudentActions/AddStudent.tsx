"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { studentSchema } from "@/validation/Student";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2Icon, Rss } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { api } from "@/axios/client";

type StudentRegister = z.infer<typeof studentSchema>;

const AddStudent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<StudentRegister | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentRegister>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      password: "",
      className: "",
    },
  });

  // useEffect that watches formData
  useEffect(() => {
    if (!formData) return;

    const registerStudent = async () => {
      setIsSubmitting(true);
      try {
        const res = await api.post("/student/register", formData, {
          withCredentials: true,
        });

        toast.success(res.data.message);
        reset();
      } catch (error: any) {
        const errMessage =
          error.response?.data?.message || "Registration failed";
        toast.error(errMessage);
      } finally {
        setIsSubmitting(false);
      }
    };

    registerStudent();
  }, [formData]);

  const onSubmit = (data: StudentRegister) => {
    setFormData(data); // triggers useEffect
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className=" cursor-pointer">+ Add Student</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[320px]">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Register Student</DialogTitle>
            <DialogDescription>
              Register a student by filling the form below
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label>Name</Label>
            <Input
              {...register("name")}
              placeholder="Student name"
              autoComplete="off"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label>Password</Label>
            <div className="relative">
              <Input
                {...register("password")}
                placeholder="Student password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
              />
              <span
                className="absolute right-3 top-2/4 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label>Class name</Label>
            <Input
              {...register("className")}
              placeholder="Class name"
              autoComplete="off"
            />

            {errors.className && (
              <p className="text-sm text-red-500">{errors.className.message}</p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="destructive">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2Icon className="animate-spin mr-2" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddStudent;
