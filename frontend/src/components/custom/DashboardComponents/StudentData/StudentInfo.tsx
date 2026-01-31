"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  GraduationCap,
  Hash,
  School,
  User,
  Gauge,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { studentData } from "@/app/(dashboard)/dashboard/studentInfo/page";

const StudentInfo = ({ data }: { data: studentData }) => {
  return (
    <div className="max-w-lg w-full mx-auto space-y-4">
      <Card className="overflow-hidden border-none shadow-lg p-3 space-y-3">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 p-5 rounded-xl bg-foreground/5"
        >
          <div className="h-20 w-20 rounded-full bg-background flex items-center justify-center shadow-inner">
            <User size={40} className="text-foreground/40" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{data.name}</h1>
            <div className="text-sm text-foreground/70 space-y-0.5">
              <p className="flex items-center gap-2">
                <School size={14} className="text-foreground/50" />{" "}
                {data.school}
              </p>
              <p className="flex items-center gap-2">
                <BookOpen size={14} className="text-foreground/50" />{" "}
                {data.className}
              </p>
              <p className="flex items-center gap-2 font-mono text-xs">
                <Hash size={14} className="text-foreground/50" /> ID:{" "}
                {data.code}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            {
              icon: <GraduationCap size={20} />,
              val: data.total,
              label: "Total",
              sub: "Points",
            },
            {
              icon: <Gauge size={20} />,
              val: `${data.average.toFixed(1)}%`,
              label: "Average",
              sub: "Score",
            },
            {
              icon: <Award size={20} />,
              val: data.grade,
              label: "Grade",
              sub: "Level",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-3 rounded-xl bg-foreground/5 border border-foreground/5 shadow-sm text-center"
            >
              <span className="text-foreground/40 mb-1">{stat.icon}</span>
              <span className="text-xl md:text-2xl font-bold">
                {stat.val || "0"}
              </span>
              <div className="mt-1">
                <p className="text-[10px] uppercase tracking-tighter font-bold opacity-80">
                  {stat.label}
                </p>
                <p className="text-[9px] text-foreground/50 leading-none">
                  {stat.sub}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Subjects Section */}
        <div className="p-4 rounded-xl bg-foreground/5 space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold uppercase tracking-widest px-3 py-1 bg-background rounded-full shadow-sm">
              Subjects
            </h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-foreground/20 to-transparent" />
          </div>

          {data.subjects.length > 0 ? (
            <div className="space-y-4">
              {data.subjects.map((sub, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-1.5"
                >
                  <div className="flex justify-between items-end px-1">
                    <span className="text-sm font-semibold">{sub.name}</span>
                    <span className="text-xs font-medium tabular-nums text-foreground/70">
                      {sub.grade}% <span className="mx-1 opacity-30">/</span>{" "}
                      {sub.passMark}%
                    </span>
                  </div>
                  <Progress value={parseInt(sub.grade)} className="h-1.5" />
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="py-6 text-center text-xs text-foreground/40 italic">
              No subject data available
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default StudentInfo;
