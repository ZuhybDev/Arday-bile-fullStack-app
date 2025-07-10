"use client";

import { api } from "@/axios/client";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
interface SchoolData {
  students: number;
  subjects: number;
  passed: number;
  failure: number;
}
const Home = ({ schoolId }: { schoolId: string | null }) => {
  const [schoolData, setSchoolData] = useState<SchoolData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/school/school-data/${schoolId}`);

        const data = res.data;

        const schoolData: SchoolData = {
          students: data.students,
          subjects: data.subjects,
          passed: data.passedPercentage,
          failure: data.failurePercentage,
        };
        console.log(schoolData, schoolId);
        setSchoolData(schoolData);
      } catch (error: any) {
        setError(error.response.data.message);
        toast.error("Something went wrong");
      }
      fetchSchoolData();
    };
  }, [schoolId]);

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
    <div className=" flex m-2 justify-center items-center">
      <div className=" grid grid-cols-2 md:grid-cols-4 mt-2 gap-6 ">
        <span className=" p-2 flex flex-col rounded-md  bg-card shadow-md ">
          <h1 className=" text-5xl text-center font-semibold mt-2">
            {schoolData?.students}
          </h1>
          <h1 className=" text-xl text-center">Students</h1>
          <p className=" text-sm text-muted-foreground">
            Current student active
          </p>
        </span>
        <span className=" p-2 flex flex-col rounded-md  bg-card shadow-md ">
          <h1 className=" text-5xl text-center font-semibold mt-2">
            {schoolData?.subjects}
          </h1>
          <h1 className=" text-xl text-center">Subjects</h1>
          <p className=" text-sm text-muted-foreground">Available subjects</p>
        </span>
        <span className=" p-2 flex flex-col rounded-md  bg-card shadow-md ">
          <h1 className=" text-5xl text-center font-semibold mt-2  bg-gradient-to-b from-white to-green-300 bg-clip-text text-transparent">
            {" "}
            {schoolData?.passed}{" "}
          </h1>
          <h1 className=" text-xl text-center">Passed</h1>
          <p className=" text-sm text-muted-foreground">
            Current passed student
          </p>
        </span>
        <span className=" p-2 flex flex-col rounded-md  bg-card shadow-md ">
          <h1 className=" text-5xl text-center font-semibold mt-2  bg-gradient-to-b from-white to-red-300 bg-clip-text text-transparent">
           
            {schoolData?.failure}{" "}
          </h1>
          <h1 className=" text-xl text-center">Failed</h1>
          <p className=" text-sm text-muted-foreground">
            Current failed student
          </p>
        </span>
      </div>
    </div>
  );
};

export default Home;
