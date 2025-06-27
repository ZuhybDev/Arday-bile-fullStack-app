"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import { api } from "@/axios/client";
import { subjectSchema } from "@/validation/Student";

type SubjectFormData = z.infer<typeof subjectSchema>;

const AddSubjects = () => {
  const [formData, setFormData] = useState<SubjectFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
  });

  // 🔥 Submission logic via useEffect
  useEffect(() => {
    if (!formData) return;

    const submitSubject = async () => {
      setIsSubmitting(true);
      try {
        const payload = {
          ...formData,
          passMark: Number(formData.passMark), // convert if it's a string in schema
        };
        const res = await api.post("/subjects/register", payload, {
          withCredentials: true,
        });

        toast.success(res.data.message || "Subject registered!");
        reset();
      } catch (err: any) {
        const msg = err?.response?.data?.message || "Registration failed.";
        toast.error(msg);
      } finally {
        setIsSubmitting(false);
      }
    };

    submitSubject();
  }, [formData, reset]);

  const onSubmit = (data: SubjectFormData) => {
    setFormData(data); // 🔄 triggers the useEffect
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">+ Add Subject</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[320px]">
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Register Subject</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new subject.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3">
            <Label htmlFor="name">Subject Name</Label>
            <Input
              {...register("name")}
              placeholder="e.g. Mathematics"
              autoComplete="off"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="fullMarks">Full Marks</Label>
            <Input
              {...register("passMark")}
              placeholder="e.g. 100"
              autoComplete="off"
            />
            {errors.passMark && (
              <p className="text-sm text-red-500">{errors.passMark.message}</p>
            )}
          </div>

          <DialogFooter>
            <DialogClose asChild className=" cursor-pointer">
              <Button type="button" variant="destructive">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting}
              className=" cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="animate-spin mr-2" size={16} />
                  Saving...
                </>
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

export default AddSubjects;
