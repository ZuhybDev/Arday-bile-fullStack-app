"use client";

import { Loader } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/axios/client";
import AddSubjects from "@/components/custom/DashboardComponents/Subject/SubjectActions/Addsubject";
import { Subject } from "@/components/custom/DashboardComponents/Subject/Column";
import { SubjectDataTable } from "@/components/custom/DashboardComponents/Subject/Subject.Table";

const SubjectPage = () => {
  // 1. Fetching logic using React Query
  const {
    data: subjects = [],
    isLoading,
    error,
  } = useQuery<Subject[]>({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await api.get("/subjects/subject-data", {
        withCredentials: true,
      });

      // Handle both { allsubjects: [] } and a direct [] return
      const rawData = res.data;
      const allsubjects = Array.isArray(rawData) ? rawData : rawData?.allsubjects || [];

      if (allsubjects.length === 0) return [];

      // Format the data 
      return allsubjects.map((subject: any) => ({
        id: subject.id,
        name: subject.name,
        passMark: subject.passMark,
      }));
    },
  });

  // 2. Loading State (Original mt-38 layout)
  if (isLoading)
    return (
      <div className="mt-38 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center">
        <Loader className="animate-spin" size={25} />
      </div>
    );

  // 3. Error State (Original mt-38 layout)
  if (error)
    return (
      <div className="mt-38 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center px-6">
        <p>Something went wrong, please refresh the page</p>
        <span className="text-destructive text-sm mt-2">
          {(error as any)?.response?.data?.message || error.message}
        </span>
      </div>
    );

  return (
    <div className="p-2">
      {/* Header Section */}
      <section className="mb-4">
        <h1 className="text-xl text-foreground font-semibold">
          Welcome to your Subjects Data
        </h1>
        <p className="antialiased text-sm text-primary dark:text-muted-foreground">
          Manage student's{" "}
          <span className="px-1 rounded-sm py-1 bg-sidebar-ring dark:bg-input">
            subjects
          </span>{" "}
          with the detailed information presented in the table below.
        </p>
      </section>

      {/* 4. Empty vs Data Display (Original mt-34 layout) */}
      {subjects.length === 0 ? (
        <div className="mt-34 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center">
          <p className="text-lg font-medium">No subjects registered yet.</p>
          <p className="text-sm mt-1 mb-2">Click "+ Add" to get started.</p>
          <AddSubjects />
        </div>
      ) : (
        <SubjectDataTable data={subjects} />
      )}
    </div>
  );
};

export default SubjectPage;