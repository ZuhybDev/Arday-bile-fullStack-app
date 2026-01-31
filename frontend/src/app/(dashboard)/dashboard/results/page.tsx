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
import React, { useState } from "react";
import { toast } from "sonner";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";

type Student = { id: string; name: string };
type Subject = { id: string; name: string };

const CreateResult = () => {
  const [studentId, setStudentId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [search, setSearch] = useState("");
  const [grade, setGrade] = useState("");

  // 1. Debounce the search input to avoid spamming the API
  // If you don't have a hook, you can use: const debouncedSearch = search
  const debouncedSearch = useDebounce(search, 500);

  // 2. Fetch Students (Runs only when search has 2+ characters)
  const { data: students = [] } = useQuery<Student[]>({
    queryKey: ["students", debouncedSearch],
    queryFn: async () => {
      const res = await api.get(`/student/search?student=${debouncedSearch}`);
      return res.data;
    },
    enabled: debouncedSearch.length > 1,
  });

  // 3. Fetch Subjects
  const { data: subjects = [] } = useQuery<Subject[]>({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await api.get(`/subjects/subject-data`);
      const { allsubjects } = res.data;
      return allsubjects.map((s: any) => ({ id: s.id, name: s.name }));
    },
  });

  // 4. Create Result Mutation
  const mutation = useMutation({
    mutationFn: async (payload: {
      studentId: string;
      subjectId: string;
      grade: number;
    }) => {
      return await api.post("result/register", payload);
    },
    onSuccess: () => {
      toast.success("Result created successfully");
      setGrade("");
      setStudentId("");
      setSubjectId("");
    },
    onError: (error: any) => {
      const errmsg = error.response?.data?.message || "Something went wrong";
      toast.error(errmsg);
    },
  });

  const handleSubmit = () => {
    if (!studentId || !subjectId || !grade) {
      toast.error("Please fill all fields");
      return;
    }
    mutation.mutate({
      studentId,
      subjectId,
      grade: Number(grade),
    });
  };

  return (
    <main>
      <div className="ml-2">
        <h1 className="text-2xl font-medium">Result</h1>
        <p className="text-sm font-light text-foreground/70">
          Create, delete and update your student's examination results
        </p>
      </div>

      <div className="flex flex-grow items-center justify-center mt-16">
        <div className="w-full max-w-md">
          <Card className="w-full flex flex-col gap-6 p-8">
            <h1 className="text-center text-xl font-medium">Create result</h1>

            {/* Student Search */}
            <div className="flex flex-col gap-2">
              <Label className="font-medium mb-2">Search Student</Label>
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
                  {students.map((s) => (
                    <SelectItem value={s.id} key={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Subject Select */}
            <div className="space-y-2">
              <Label className="font-medium mb-2">Select Subject</Label>
              <Select onValueChange={setSubjectId} value={subjectId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((sub) => (
                    <SelectItem value={sub.id} key={sub.id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Grade Input */}
            <div className="space-y-2">
              <Label>Marks</Label>
              <Input
                type="number"
                placeholder="Enter marks e.g 60"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                min={0}
              />

              <Button
                className="w-full text-center mt-2"
                onClick={handleSubmit}
                disabled={
                  mutation.isPending || !studentId || !subjectId || !grade
                }
              >
                {mutation.isPending ? (
                  <Loader2Icon className="animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default CreateResult;
