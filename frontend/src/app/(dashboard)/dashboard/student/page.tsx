"use client";

import { Student } from "@/components/custom/DashboardComponents/StudentData/Columns";
import { DataTable } from "@/components/custom/DashboardComponents/StudentData/DataTable";
import { api } from "@/axios/client";
import AddStudent from "@/components/custom/DashboardComponents/StudentData/StudentActions/AddStudent";
import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const StudentsPage = () => {
  // 1. Unified Fetching Hook
  const {
    data: students = [],
    isLoading,
    error,
  } = useQuery<Student[]>({
    queryKey: ["students"], // This matches the key we invalidate in AddStudent
    queryFn: async () => {
      const res = await api.get("/student/all-student", {
        withCredentials: true,
      });

      // Format the data inside the query function
      return res.data.map((student: any) => ({
        id: student.id,
        code: student.code,
        name: student.name,
        class: student.class,
        grade: student.overallGrade,
      }));
    },
  });

  // 2. Loading State
  if (isLoading)
    return (
      <div className="mt-38 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center">
        <Loader className="animate-spin" size={25} />
      </div>
    );

  // 3. Error State
  if (error)
    return (
      <div className="mt-38 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center">
        <p className="font-medium text-foreground">Something went wrong</p>
        <p className="text-sm">Please refresh the page</p>
        <span className="text-destructive text-xs mt-2">
          {(error as any)?.response?.data?.message ||
            "Failed to fetch students"}
        </span>
      </div>
    );

  return (
    <div className="p-2">
      <section className="mb-4">
        <h1 className="text-xl text-foreground">
          Welcome to your Student Data Hub
        </h1>
        <p className="antialiased text-sm text-primary dark:text-muted-foreground">
          Manage your students with the detailed information presented in the
          table below.
        </p>
      </section>

      {/* 4. Conditional Rendering based on data length */}
      {students.length === 0 ? (
        <div className="mt-34 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center">
          <p className="text-lg font-medium">No students registered yet.</p>
          <p className="text-sm mt-1 mb-2">Click "+ Add" to get started.</p>
          <AddStudent />
        </div>
      ) : (
        <DataTable data={students} />
      )}
    </div>
  );
};

export default StudentsPage;
