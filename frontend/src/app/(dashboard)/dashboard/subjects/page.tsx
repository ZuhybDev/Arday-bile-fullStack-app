"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader } from "lucide-react";

import { api } from "@/axios/client";
import AddSubjects from "@/components/custom/DashboardComponents/Subject/SubjectActions/Addsubject";
import { Subject } from "@/components/custom/DashboardComponents/Subject/Column";
import { SubjectDataTable } from "@/components/custom/DashboardComponents/Subject/Subject.Table";

const SubjectPage = () => {
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get("/subjects/subject-data", {
          withCredentials: true,
        });

        const { count, allsubjects } = res.data;

        if (count === 0) {
          setSubjects([]);
          return;
        }

        const formattedSubjects: Subject[] = allsubjects.map(
          (subject: any) => ({
            id: subject.id,
            name: subject.name,
            passMark: subject.passMark,
          })
        );

        setSubjects(formattedSubjects);
      } catch (err: any) {
        const msg = err?.response?.data?.message || "Failed to fetch subjects";
        if (!Array.isArray(subjects)) {
          setError(msg);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
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
          Welcome to your Subjects Data
        </h1>
        <p className=" antialiased text-sm text-primary dark:text-muted-foreground">
          Manage student's{" "}
          <span className=" px-1 rounded-sm py-1 bg-sidebar-ring dark:bg-input">
            subjects
          </span>{" "}
          with the detailed information presented in the table below.{" "}
        </p>
      </section>
      {subjects.length === 0 ? (
        <div className="  mt-34 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center">
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
