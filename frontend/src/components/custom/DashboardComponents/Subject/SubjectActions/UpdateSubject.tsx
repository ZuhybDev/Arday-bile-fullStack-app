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
import { updateSubjectSchema } from "@/validation/Student";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "@/axios/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type StudentInput = z.infer<typeof updateSubjectSchema>;

interface Props {
  open: boolean;
  setOpen: (val: boolean) => void;
  subejctId: string;
}

export function UpdateSubjectDailog({ open, setOpen, subejctId }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StudentInput>({
    resolver: zodResolver(updateSubjectSchema),
  });

  // ✅ This will fetch student info and fill form when dialog opens
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/subjects/subject/${subejctId}`); // this just fetches data
        const { subject } = res.data;
        reset({
          name: subject.name,
          passMark: subject.passMark,
        });
      } catch (err: any) {
        toast.error(err?.response?.data?.message || "Failed to load subjects.");
        setOpen(false);
      }
    };

    if (open) {
      fetchStudent();
    }
  }, [open, subejctId, reset, setOpen]);

  //  This only runs when form is submitted
  const onSubmit = async (data: StudentInput) => {
    const payload = {
      ...data,
      passMark: Number(data.passMark), // change number before sending it
    };
    try {
      const res = await api.patch(`/subjects/update/${subejctId}`, payload, {
        withCredentials: true,
      });
      const { message } = res.data;
      toast.success(message);
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
            <Label>Subject new name</Label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label>Full Marks</Label>
            <div className="relative">
              <Input
                {...register("passMark")}
                type="number"
                inputMode="numeric"
                pattern="[1-9]*"
                min="1"
                step="1"
                placeholder="Please new full marks"
              />
            </div>
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
