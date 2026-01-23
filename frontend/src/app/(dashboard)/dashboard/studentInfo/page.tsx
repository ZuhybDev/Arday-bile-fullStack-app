"use client";

import { api } from "@/axios/client";
import StudentInfo from "@/components/custom/DashboardComponents/StudentData/StudentInfo";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export interface Subjects {
  name: string;
  id: string;
  grade: string;
  status: string;
  passMark: string;
}

export interface studentData {
  id: string;
  name: string;
  code: string;
  className: string;
  school: string;
  grade: string;
  average: number;
  total: number;
  subjects: Subjects[];
}
const studetnInfo = () => {
  const useParams = useSearchParams();

  const studentId = useParams.get("studentId");

  const [studentData, setStudentData] = useState<studentData | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
      } catch (error: any) {
        setError(error.response.data.message || "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [studentId]);

  // go back to student
  const router = useRouter();

  if (loading)
    return (
      <div className=" mt-38 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center">
        <Loader className=" animate-spin" size={25} />
      </div>
    );

  if (error)
    return (
      <div className="  mt-38 min-h-[200px] flex flex-col items-center justify-center text-muted-foreground text-center">
        <p>Something went please refresh the page</p>
        {error}
      </div>
    );
  return (
    <div className=" p-4">
      <h1 className=" text-xl font-medium">Student Information</h1>
      <div className=" flex text-foreground/60">
        Here's
        <p className=" text-primary ml-1 mr-1">{studentData?.name}</p> info
      </div>
      <Button
        className=" mt-2 hover:mr-2  "
        onClick={() => router.push("/dashboard/student")}
      >
        <ArrowLeft className=" " /> Go back
      </Button>
      <div className=" flex flex-col items-centertext-muted-foreground text-center">
        {studentData && (
          <div className=" flex  items-center justify-center mt-4">
            <StudentInfo data={studentData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default studetnInfo;
