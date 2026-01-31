"use client";

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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner"; // Assuming you use a toast library

interface AdminData {
  id: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
}

const Settings = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<AdminData | null>(null);

  // 1. Fetch Data
  const { data: adminList, isLoading } = useQuery<AdminData[]>({
    queryKey: ["adminData"],
    queryFn: async () => {
      const res = await api.get("/auth-admin/admin-data");
      return res.data.admin;
    },
  });

  // 2. Set local state when data arrives (taking the first admin for the form)
  useEffect(() => {
    if (adminList && adminList.length > 0) {
      setFormData(adminList[0]);
    }
  }, [adminList]);

  // 3. Update Mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedUser: AdminData) => {
      return await api.patch("/auth-admin/update", updatedUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminData"] });
      toast.success("Profile updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      updateMutation.mutate(formData);
    }
  };

  const readableDate = new Date(adminList?.[0]?.createdAt).toLocaleDateString();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold tracking-wide">
          Profile Settings
        </h1>
        <p className="text-sm font-medium text-foreground/70">
          Manage your Account
        </p>
        <Separator className="my-4" />

        {/* Display Current Data */}
        <h1 className="mb-4">Admin Data</h1>
        <div className="mb-4 bg-foreground/10 p-4 md:p-6 rounded-md">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <Label className="text-foreground/80 text-xs">Name</Label>
              <span className="font-medium">
                {adminList?.[0]?.name || "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <Label className="text-foreground/80 text-xs">Email</Label>
              <span className="font-medium">
                {adminList?.[0]?.email || "N/A"}
              </span>
            </div>
            <div className="flex flex-col">
              <Label className="text-foreground/80 text-xs">Registered</Label>
              <span className="font-medium">{readableDate || "N/A"}</span>
            </div>
          </div>
        </div>

        <Separator />
        <h1 className="mt-4 mb-4">Update your account</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleSave}>
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>

              {formData && (
                <FieldGroup className="py-4">
                  <Field>
                    <Label>Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </Field>
                  <Field>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </Field>
                  <Field>
                    <Label>New Password</Label>
                    <Input
                      type="password"
                      placeholder="Leave blank to keep current"
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                  </Field>
                </FieldGroup>
              )}

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="destructive" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Settings;
