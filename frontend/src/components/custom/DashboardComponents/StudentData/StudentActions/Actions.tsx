"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FileChartLine, FilePen, Trash, EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { api } from "@/axios/client";
import { UpdateStudentDialog } from "./UpdateStudent";

interface ActionsProps {
  id: string;
  name: string;
}

export const Actions: React.FC<ActionsProps> = ({ id, name }) => {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await api.delete(`/student/delete/${id}`);
      toast.success(`${res.data.message}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete.");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/report/${id}`)}
          >
            <FileChartLine className="mr-2 h-4 w-4" /> View Report
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setUpdateDialogOpen(true);
            }}
          >
            <FilePen className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setDialogOpen(true);
            }}
          >
            <span className="text-red-500 flex gap-2">
              <Trash className="mr-2 h-4 w-4" /> Delete
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        studentName={name}
        onConfirm={handleDelete}
      />

      <UpdateStudentDialog
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        studentId={id} // ✅ only passing id now
      />
    </>
  );
};
