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

      const { count, allsubjects } = res.data;

      if (count === 0) return [];

      // Format the data right in the query function
      return allsubjects.map((subject: any) => ({
        id: subject.id,
        name: subject.name,
        passMark: subject.passMark,
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
        <p>Something went wrong, please refresh the page</p>
        <span className="text-destructive text-sm">
          {(error as any)?.response?.data?.message || error.message}
        </span>
      </div>
    );

  return (
    <div className="p-2">
      <section className="mb-4">
        <h1 className="text-xl text-foreground">
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

      {/* 4. Empty vs Data Display */}
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
