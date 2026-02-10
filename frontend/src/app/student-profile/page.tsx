"use client";

import React, { useEffect, useState } from "react";
import { Award, BookOpen, Activity, Quote } from "lucide-react";
import Footer from "@/components/custom/HomeComponents/Footer";

// --- Interfaces ---
interface StudentReport {
  message: string;
  student: Student;
  formattedResult: SubjectResult[];
  total: number;
  average: number;
  grade: string;
}

interface Student {
  id: string;
  name: string;
  code: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
  school: { name: string };
}

interface SubjectResult {
  name: string;
  grade: number;
  status: string;
}

const StudentProfile = () => {
  const [report, setReport] = useState<StudentReport | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("active_student");
    if (!raw) return;
    try {
      setReport(JSON.parse(raw));
    } catch {
      console.error("Error parsing student data");
    }
  }, []);

  if (!report) return null;

  const getQuote = (grade: string) => {
    const g = grade.toUpperCase();
    if (g.includes("A"))
      return "Excellence is not a skill, it’s an attitude. Keep setting the standard!";
    if (g.includes("B"))
      return "Great work! You're consistently proving your potential. Aim for the top!";
    if (g.includes("C"))
      return "Progress is progress. Stay focused, work hard, and the results will follow.";
    return "Every master was once a beginner. Don't stop now; your breakthrough is coming.";
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-6 md:py-12 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* 1. Header (Themed) */}
        <header className="flex flex-col md:flex-row justify-between items-center md:items-end border-b border-border pb-8 gap-6">
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">
              Arday Bile
            </h1>
            <p className="text-muted-foreground font-bold text-xs tracking-widest uppercase">
              {report.student.school.name}
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] mb-1">
              Official Transcript
            </span>
            <p className="text-xl font-bold border border-border px-4 py-1 rounded-sm bg-muted/30">
              {report.student.code}
            </p>
          </div>
        </header>

        {/* 2. Identity (High Contrast) */}
        <section className="flex flex-col md:flex-row items-center gap-6">
          <div className="h-24 w-24 rounded-none border-2 border-foreground flex items-center justify-center text-3xl font-black bg-foreground text-background shrink-0">
            {report.student.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
              {report.student.name}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-1">
              <span className="bg-foreground text-background text-[10px] px-2 py-1 font-black uppercase tracking-tighter">
                {report.student.role}
              </span>
              <span className="text-muted-foreground text-xs">
                {report.student.id}
              </span>
            </div>
          </div>
        </section>

        {/* 3. The Quote (Themed bg) */}
        <section className="relative p-6 bg-muted border-l-4 border-foreground overflow-hidden rounded-sm">
          <Quote
            className="absolute -top-2 -right-2 text-foreground/5 rotate-12"
            size={80}
          />
          <p className="relative text-lg md:text-xl font-medium italic text-foreground leading-relaxed">
            "{getQuote(report.grade)}"
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
            — Academic Mentorship Team
          </p>
        </section>

        {/* 4. Core Metrics (Responsive Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-border p-2 rounded-lg">
          <StatBox label="Final Grade" value={report.grade} />
          <StatBox label="Average" value={`${report.average.toFixed(1)}%`} />
          <StatBox label="Total Score" value={report.total.toString()} />
        </div>

        {/* 5. Results (Mobile Cards vs Desktop Table) */}
        <div className="space-y-4">
          <h3 className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground text-center md:text-left">
            Detailed Results
          </h3>

          {/* Mobile Cards */}
          <div className="block md:hidden space-y-3">
            {report.formattedResult.map((sub, idx) => (
              <div
                key={idx}
                className="bg-card border border-border p-5 flex justify-between items-center rounded-lg">
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                    {sub.name}
                  </p>
                  <p className="text-2xl font-black">{sub.grade}</p>
                </div>
                <div
                  className={`text-2xl font-black ${getStatusColor(sub.status)}`}>
                  {sub.status}
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block border border-border rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground text-[10px] uppercase tracking-[0.2em]">
                  <th className="px-6 py-4 font-black border-b border-border">
                    Subject Name
                  </th>
                  <th className="px-6 py-4 font-black border-b border-border">
                    Marks Obtained
                  </th>
                  <th className="px-6 py-4 font-black text-right border-b border-border">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {report.formattedResult.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-5 font-bold uppercase text-sm">
                      {sub.name}
                    </td>
                    <td className="px-6 py-5 text-xl">{sub.grade}</td>
                    <td
                      className={`px-6 py-5 text-right font-black text-xl ${getStatusColor(sub.status)}`}>
                      {sub.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

// --- Helper Components ---

const StatBox = ({ label, value }: { label: string; value: string }) => (
  <div className="p-6 flex flex-col items-center justify-center space-y-1 bg-card/50 rounded-md">
    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">
      {label}
    </p>
    <p className="text-3xl font-black tracking-tighter">{value}</p>
  </div>
);

const getStatusColor = (s: string) => {
  const grade = s.toUpperCase();
  // We keep these semantic colors as they are essential "status" indicators
  if (["A", "A+", "B"].includes(grade)) return "text-emerald-500";
  if (["C"].includes(grade)) return "text-amber-500";
  return "text-destructive"; // Shadcn native error/red color
};

export default StudentProfile;
