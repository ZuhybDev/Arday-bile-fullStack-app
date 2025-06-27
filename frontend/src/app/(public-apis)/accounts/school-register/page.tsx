"use client";
import { schoolName } from "@/validation/register/user.register";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { api } from "@/axios/client";

type SchoolName = z.infer<typeof schoolName>;

const school = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchoolName>({
    resolver: zodResolver(schoolName),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (name: SchoolName) => {
    try {
      setLoading(true);
      // caliing api
      const res = await api.post("/school/register", name);

      const { message, schoolId } = res.data;

      router.push(`/accounts/signup?schoolId=${schoolId}`);

      toast.success(message);
    } catch (error: any) {
      toast.error(error.response.data || "Registration failed. Try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-grow items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <Card className="w-full flex flex-col gap-6 p-10">
          <span className="flex flex-col items-center justify-center">
            <h1 className="font-bold text-3xl">Arday Bile</h1>
            <p className="text-sm text-secondary-foreground dark:text-primary">
              School registration
            </p>
          </span>
          <div>
            <Label className="mb-2 block">School name</Label>
            <Input placeholder="Enter school name" {...register("name")} />
            {errors.name && (
              <p className="text-red-400 mt-2 text-sm">{errors.name.message}</p>
            )}
          </div>
          <Button
            disabled={loading}
            type="submit"
            className="w-full flex items-center justify-center"
          >
            {loading ? <Loader2Icon className="animate-spin" /> : "Register"}
          </Button>

          {/* link */}
          <div className="flex gap-2 items-center text-sm text-secondary-foreground dark:text-primary">
            I have an account?
            <Link href="/accounts/login" className="hover:underline">
              Sign in
            </Link>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default school;
