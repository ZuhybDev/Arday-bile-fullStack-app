"use client";

import { Student } from "@/components/custom/DashboardComponents/StudentData/Columns";
import { DataTable } from "@/components/custom/DashboardComponents/StudentData/DataTable";
import { api } from "@/axios/client";
import { getCookies } from "@/axios/getCookies";
import AddStudent from "@/components/custom/DashboardComponents/StudentData/StudentActions/AddStudent";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";

const StudentsPage = () => {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<Student[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const res = await api.get("/student/all-student", {
          withCredentials: true,
        });

        const students: Student[] = res.data.map((student: any) => ({
          id: student.id,
          code: student.code,
          name: student.name,
          class: student.class,
          grade: student.overallGrade,
        }));

        setStudent(students);
      } catch (error: any) {
        setError(error.response.data.message || "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, []);

  if (loading)
    return (
      <div className=" mt-38 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center">
        <Loader className=" animate-spin" size={25} />
      </div>
    );
  if (error)
    return (
      <div className="  mt-38 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center">
        <p>Some went please refresh the page</p>
        {error}
      </div>
    );

  return (
    <div className="p-2">
      <section className=" mb-4">
        <h1 className="text-xl text-foreground">
          Welcome to your Student Data Hub
        </h1>
        <p className=" antialiased text-sm text-primary dark:text-muted-foreground">
          Manage your students with the detailed information presented in the
          table below.{" "}
        </p>
      </section>

      {student.length === 0 ? (
        <div className="  mt-34 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center">
          <p className="text-lg font-medium">No students registered yet.</p>
          <p className="text-sm mt-1 mb-2">Click "+ Add" to get started.</p>
          <AddStudent />
        </div>
      ) : (
        <DataTable data={student} />
      )}
    </div>
  );
};
export default StudentsPage;
