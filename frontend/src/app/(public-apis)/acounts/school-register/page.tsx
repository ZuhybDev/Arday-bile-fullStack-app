"use client";
import { schoolName } from "@/validation/register/user.register";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/store/axios/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";

type SchoolName = z.infer<typeof schoolName>;

const school = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // about metadata
  useEffect(() => {
    document.title = "School Register";
  }, []);

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

      const { message, id } = res.data;

      const query = new URLSearchParams({ id }).toString();

      router.push(`/acounts/register/${query}`);

      toast(message);
    } catch (error: any) {
      toast(error.response.data || "Registration failed. Try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <Card className="w-full shadow-md flex flex-col gap-6 p-10">
          <h1 className="font-bold text-3xl mb-6 text-center">Arday Bile</h1>
          <div>
            <Label className="mb-2 block">School name</Label>
            <Input placeholder="Enter school name" {...register("name")} />
            {errors.name && (
              <p className="text-red-400 mt-2 text-sm">{errors.name.message}</p>
            )}
          </div>
          <Button disabled={loading} type="submit" className="w-full">
            {loading ? <Loader2Icon /> : "Register"}
          </Button>
        </Card>

        {/* link */}
        <div className=" ">
          <Link
            href="/acounts/login"
            className=" text-sm text-secondary-foreground dark:text-primary"
          >
            I have and acount
          </Link>
        </div>
      </form>
    </div>
  );
};

export default school;
