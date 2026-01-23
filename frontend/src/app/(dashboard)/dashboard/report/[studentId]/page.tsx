"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { api } from "@/axios/client";
import { Loader } from "lucide-react";
import { studentData } from "../../studentInfo/page";
import ReportPDF from "@/components/custom/pdf/ReportPDF";

export default function Page() {
  const { studentId } = useParams<{ studentId: string }>();

  const [studentData, setStudentData] = useState<studentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!studentId) return;

    const fetchStudentData = async () => {
      try {
        setLoading(true);

        const res = await api.get(`/student/student-data/${studentId}`);
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
        setError(err?.response?.data?.message || "Failed to fetch student");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (loading) {
    return (
      <div className="mt-38 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center">
        <Loader className="animate-spin" size={25} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-38 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center">
        <p>Something went wrong, please refresh the page.</p>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return <div>{studentData && <ReportPDF data={studentData} />}</div>;
}
