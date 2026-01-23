"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  FileChartLine,
  FilePen,
  Trash,
  EllipsisVertical,
  FileSlidersIcon,
  Download,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { api } from "@/axios/client";
import { UpdateStudentDialog } from "./UpdateStudent";
import { studentData } from "@/app/(dashboard)/dashboard/studentInfo/page";
import GenerateStudentPDF from "@/components/custom/pdf/ReportPDF";

interface ActionsProps {
  id: string;
  name: string;
}

export const Actions: React.FC<ActionsProps> = ({ id, name }) => {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  // report

  const [studentData, setStudentData] = useState<studentData | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchStudentData = async () => {
      try {
        const res = await api.get(`/student/student-data/${id}`);
        const student = res.data.student;

        const studentInfo: studentData = {
          id: student.id,
          name: student.name,
          code: student.code,
          className: student.className,
          total: res.data.total,
          grade: res.data.grade,
          average: res.data.average,
          school: student.school.name,
          subjects: res.data.formattedResult.map((sub: any) => ({
            name: sub.name,
            grade: sub.grade,
            status: sub.status,
            passMark: sub.passMark,
          })),
        };

        setStudentData(studentInfo);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchStudentData();
  }, [id]);

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
            onClick={() => studentData && GenerateStudentPDF(studentData)}
          >
            <Download className="mr-2 h-4 w-4" /> Download Report
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/dashboard/studentInfo?studentId=${id}`)
            }
          >
            <FileSlidersIcon className="mr-2 h-4 w-4" /> View Profile
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
              <Trash className="mr-2 h-4 w-4 text-red-500" /> Delete
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
