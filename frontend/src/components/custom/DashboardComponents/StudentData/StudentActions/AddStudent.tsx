"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import React, { useState } from "react";

import { api } from "@/axios/client";
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

type StudentRegister = z.infer<typeof studentSchema>;

const AddStudent = () => {
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false); // Control dialog visibility

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

  // 1. Mutation setup
  const mutation = useMutation({
    mutationFn: async (data: StudentRegister) => {
      const res = await api.post("/student/register", data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Student registered successfully!");
      // 2. Invalidate student-related queries to refresh UI
      queryClient.invalidateQueries({ queryKey: ["students"] });
      reset();
      setOpen(false); // Close dialog on success
    },
    onError: (error: any) => {
      const errMessage = error.response?.data?.message || "Registration failed";
      toast.error(errMessage);
    },
  });

  const onSubmit = (data: StudentRegister) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">+ Add Student</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[320px]">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Register Student</DialogTitle>
            <DialogDescription>
              Register a student by filling the form below
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              {...register("name")}
              placeholder="Student name"
              autoComplete="off"
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Password</Label>
            <div className="relative">
              <Input
                {...register("password")}
                placeholder="Student password"
                type={showPassword ? "text" : "password"}
                autoComplete="off"
              />
              <button
                type="button" // Important: prevents form submission
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label>Class name</Label>
            <Input
              {...register("className")}
              placeholder="Class name"
              autoComplete="off"
            />
            {errors.className && (
              <p className="text-xs text-red-500">{errors.className.message}</p>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                <Loader2Icon className="animate-spin mr-2" size={18} />
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
