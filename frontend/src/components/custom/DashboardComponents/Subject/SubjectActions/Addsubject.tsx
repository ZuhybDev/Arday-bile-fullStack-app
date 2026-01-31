"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // Added these
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
import { useState } from "react";

type SubjectFormData = z.infer<typeof subjectSchema>;

const AddSubjects = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false); // Track dialog state

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubjectFormData>({
    resolver: zodResolver(subjectSchema),
  });

  // 1. Define the Mutation
  const mutation = useMutation({
    mutationFn: async (formData: SubjectFormData) => {
      const payload = {
        ...formData,
        passMark: Number(formData.passMark),
      };
      const res = await api.post("/subjects/register", payload, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Subject registered!");

      // 2. The Magic: Tell the SubjectPage to refresh its data
      queryClient.invalidateQueries({ queryKey: ["subjects"] });

      reset();
      setIsOpen(false); // Close dialog on success
    },
    onError: (err: any) => {
      const msg = err?.response?.data?.message || "Registration failed.";
      toast.error(msg);
    },
  });

  const onSubmit = (data: SubjectFormData) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <Label htmlFor="passMark">Full Marks</Label>
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
            <DialogClose asChild>
              <Button
                type="button"
                variant="destructive"
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="cursor-pointer"
            >
              {mutation.isPending ? (
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
