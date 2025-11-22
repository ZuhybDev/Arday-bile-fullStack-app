"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateStudentSchema } from "@/validation/Student";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/axios/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type StudentInput = z.infer<typeof updateStudentSchema>;

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  studentId: string;
}

export function UpdateStudentDialog({ open, setOpen, studentId }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentInput>({
    resolver: zodResolver(updateStudentSchema),
    defaultValues: {
      name: "",
      className: "",
      password: "",
    },
  });

  // ✅ This will fetch student info and fill form when dialog opens
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/student/student-data/${studentId}`); // this just fetches data
        const student = res.data;
        reset({
          name: student.student.name,
          className: student.student.className,
          password: "", // don't prefill password
        });
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to load student.");
        setOpen(false);
      }
    };

    if (open) {
      fetchStudent();
    }
  }, [open, studentId, reset, setOpen]);

  //  This only runs when form is submitted
  const onSubmit = async (data: StudentInput) => {
    try {
      const res = await api.patch(`/student/update/${studentId}`, data, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[320px]">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Update Student</DialogTitle>
          </DialogHeader>

          <div className="grid gap-3">
            <Label>Name</Label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label>Password</Label>
            <div className="relative">
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
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
            <Label>Class Name</Label>
            <Input {...register("className")} />
            {errors.className && (
              <p className="text-sm text-red-500">{errors.className.message}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Confirm</Button>
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
