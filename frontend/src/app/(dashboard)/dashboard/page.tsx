"use client";

import { api } from "@/axios/client";
import { Loader } from "lucide-react";
import React from "react";
import { useQuery } from "@tanstack/react-query";

interface SchoolData {
  id: string;
  name: string;
  totalAdmins: number;
  totalStudents: number;
  totalSubjects: number;
  passedCount: number;
  passRate: string; // Calculated field
}

const Home = () => {
  // 1. React Query Fetching Logic
  const { data, isLoading, error } = useQuery<SchoolData>({
    queryKey: ["school-overview"],
    queryFn: async () => {
      const res = await api.get("/school/school-data", {
        withCredentials: true,
      });

      const d = res.data;
     
      return {
        id: d.school.id,
        name: d.school.name,
        totalAdmins: d.totalAdmins,
        totalStudents: d.totalStudents,
        totalSubjects: d.totalSubjects,
        passedCount: d.passedCount,
        passRate: `${d.passedCount}%`,
      };
    },
  });

  // 2. Loading State
  if (isLoading)
    return (
      <div className="mt-38 min-h-[400px] flex flex-col items-center justify-center text-muted-foreground text-center">
        <Loader className="animate-spin text-primary mb-4" size={30} />
        <p className="animate-pulse">Loading dashboard data...</p>
      </div>
    );

  // 3. Error State
  if (error)
    return (
      <div className="mt-38 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center px-4">
        <p className="text-destructive font-medium">Failed to load school data</p>
        <p className="text-sm">{(error as any)?.message || "Please check your connection"}</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground">
            {data?.name || "School Overview"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A real-time summary of academic performance and enrollment.
          </p>
          <div className="h-1.5 w-12 bg-primary rounded-full" />
        </div>

        <div className="text-sm text-muted-foreground font-medium bg-muted/50 px-3 py-1 rounded-full w-fit">
          Status: Live
        </div>
      </header>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Student Card */}
        <div className="group flex flex-col p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-all">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Total Students
          </p>
          <div className="flex items-baseline gap-2 mt-3">
            <h2 className="text-5xl font-bold tracking-tight">
              {data?.totalStudents ?? 0}
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-6 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Active enrollment
          </p>
        </div>

        {/* Subjects Card */}
        <div className="group flex flex-col p-6 rounded-2xl bg-card border shadow-sm hover:shadow-md transition-all">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Curriculum
          </p>
          <div className="flex items-baseline gap-2 mt-3">
            <h2 className="text-5xl font-bold tracking-tight">
              {data?.totalSubjects ?? 0}
            </h2>
            <span className="text-lg font-semibold text-muted-foreground">Units</span>
          </div>
          <p className="text-xs text-muted-foreground mt-6 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Registered subjects
          </p>
        </div>

        {/* Passed Card */}
        <div className="group flex flex-col p-6 rounded-2xl bg-card border border-l-8 border-l-emerald-500 shadow-sm hover:shadow-md transition-all">
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
            Passing Rate
          </p>
          <div className="mt-3">
            <h2 className="text-5xl font-bold tracking-tight text-emerald-600">
              {data?.passRate}
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            Based on {data?.passedCount} passing students
          </p>
        </div>

        {/* Admins Card */}
        <div className="group flex flex-col p-6 rounded-2xl bg-card border border-l-8 border-l-blue-500 shadow-sm hover:shadow-md transition-all">
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            Total Admins
          </p>
          <div className="mt-3">
            <h2 className="text-5xl font-bold tracking-tight text-blue-600">
              {data?.totalAdmins ?? 0}
            </h2>
          </div>
          <p className="text-xs text-muted-foreground mt-6 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            System managers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;