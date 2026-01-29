"use client";

import { api } from "@/axios/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2Icon } from "lucide-react";
import { setgroups } from "process";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type Student = {
  id: string;
  name: string;
};
type Subject = {
  id: string;
  name: string;
};
const CreateResult = () => {
  const [student, setStudent] = useState<Student[]>([]);
  const [subject, setSubject] = useState<Subject[]>([]);
  const [studentId, setStudentId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");
  const [loading, setLoading] = useState(false);

  // fetch student
  const isFirstRender = useRef(true);

  useEffect(() => {
    // 2. If it's the very first time this component shows up, flip the flag and STOP
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchStudent = async () => {
      try {
        const res = await api.get(`/student/search?student=${search}`);
        setStudent(res.data);
      } catch (err: any) {
        console.error(err);
      }
    };

    const deBounce = setTimeout(() => {
      if (search.length > 1) {
        fetchStudent();
      } else {
        setStudent([]);
      }
    }, 500);

    return () => clearTimeout(deBounce);
  }, [search]);

  // fetch student

  useEffect(() => {
    const fetchSubject = async () => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }
      const res = await api.get(`/subjects/subject-data`);
      const { count, allsubjects } = res.data;

      if (count === 0) {
        setSubject([]);
        return;
      }

      const formattedSubjects: Subject[] = allsubjects.map((subject: any) => ({
        id: subject.id,
        name: subject.name,
      }));

      setSubject(formattedSubjects);
    };

    const deBounce = setTimeout(() => {
      fetchSubject();
    }, 500);

    return () => clearTimeout(deBounce);
  }, []);

  // create result

  const handleSubmit = async () => {
    if (!studentId || !subjectId || !grade) {
      toast.error("Please fill all feilds");
      return;
    }
    try {
      setLoading(true);
      await api.post("result/register", {
        studentId,
        subjectId,
        grade: Number(grade),
      });
      toast.success("Result created successfullt");

      console.log({
        studentId,
        subjectId,
        grade,
      });
    } catch (error: any) {
      const errmsg = error.response.data.message;
      toast.error(errmsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className=" ml-2">
        <h1 className="text-2xl font-medium">Result</h1>
        <p className=" text-sm font-light text-foreground/70">
          Create delete and update your student's examination results
        </p>
      </div>
      <div className=" flex flex-grow items-center justify-center mt-16">
        <div className=" w-full max-w-md ">
          <Card className="  w-full flex flex-col gap-6 p-8">
            <h1 className=" text-center text-xl font-medium">Create result</h1>
            <div className=" flex flex-col gap-2">
              <Label className=" font-medium  mb-2">Search Student</Label>
              <Input
                placeholder="Enter student name...."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Select onValueChange={setStudentId} value={studentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {student.map((s) => (
                    <SelectItem value={s.id} key={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* select */}

            <div className=" space-y-2">
              <Label className="font-medium mb-2">Select Subject</Label>
              <Select onValueChange={setSubjectId} value={subjectId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subject.map((sub) => (
                    <SelectItem value={sub.id} key={sub.id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* grade */}
            <div className=" space-y-2">
              <Label>Marks</Label>
              <Input
                type="number"
                placeholder="Enter marks e.g 60"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                min={0}
              />

              <Button
                className=" w-full text-center mt-2"
                onClick={handleSubmit}
                disabled={!studentId || !subjectId || !grade}
              >
                {loading ? <Loader2Icon className=" animate-spin" /> : "Submit"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default CreateResult;
