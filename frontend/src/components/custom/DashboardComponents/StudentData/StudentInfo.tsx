"use client";
import { studentData } from "@/app/(dashboard)/dashboard/studentInfo/page";

import { Card } from "@/components/ui/card";

import {
  Award,
  BookOpen,
  FlipHorizontal,
  Gauge,
  GraduationCap,
  Hash,
  Image,
  School,
} from "lucide-react";
import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const StudentInfo = ({ data }: { data: studentData }) => {
  return (
    <div className=" max-w-lg w-full">
      <Card className=" w-full items-center justify-center p-2">
        {/*Profile card  */}
        <motion.span
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="shadow-md p-6 w-full rounded-sm  bg-foreground/5 gap-2 items-center flex"
        >
          <section className=" rounded-full bg-card p-8 m-2">
            <Image />
          </section>

          <div className=" flex flex-col">
            <h1 className=" text-2xl">{data.name}</h1>
            <ul className=" flex flex-col gap-1">
              <li className=" flex items-center gap-1">
                <School size={18} className=" font-semibold" /> {data.school}
              </li>
              <li className=" flex items-center gap-1">
                <BookOpen size={18} className=" font-semibold" /> Class:
                {data.className}
              </li>
              <li className=" flex items-center gap-1">
                <Hash size={18} /> ID: #{data.code}
              </li>
            </ul>
          </div>
        </motion.span>

        {/* Acievements */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className=" grid grid-cols-3  mt-1 gap-2 "
        >
          <div className=" bg-foreground/5 p-4 z-20 rounded-md flex flex-col gap-2 items-center">
            <GraduationCap />
            {/* change here */}
            <h2 className=" shadow-md mt-1 text-3xl font-semibold antialiased">
              {data.total || "0"}
            </h2>
            <div className=" flex flex-col space-y-1">
              <h1 className=" text-[14px] font-semibold tracking-widest">
                Total Pionts
              </h1>
              <p className="text-foreground/50">Academic Score</p>
            </div>
          </div>

          <div className=" shadow-md bg-foreground/5 p-4 z-20 rounded-md flex flex-col gap-2 items-center">
            <Gauge />
            <h2 className=" mt-1 text-3xl font-semibold antialiased">
              {data.average.toFixed(2) || "0.0"}%
            </h2>
            <div className=" flex flex-col space-y-1">
              <h1 className=" text-[14px] font-semibold tracking-widest">
                Average
              </h1>
              <p className="text-foreground/50">Performance</p>
            </div>
          </div>

          <div className=" shadow-md bg-foreground/5 p-4 z-20 rounded-md flex flex-col gap-2 items-center">
            <Award />
            <h2 className=" mt-1 text-3xl font-semibold antialiased">
              {data.grade || "?"}
            </h2>
            <div className=" flex flex-col space-y-1">
              <h1 className=" text-[14px] font-semibold tracking-widest">
                Grade
              </h1>
              <p className="text-foreground/50">Current Level</p>
            </div>
          </div>
        </motion.div>

        {/* Bottom subjects */}

        <div className=" w-full p-2 bg-foreground/5 rounded-md mt-1">
          {/* subject and smooth fade */}
          <div className=" relative w-full flex items-center">
            <h2 className="text-xl p-0.5 pr-2 pl-2 z-10 bg-foreground/5 rounded-full items-center">
              Subjects
            </h2>
            <div className=" absolute left-0 mb-0.5 right-0 top-1/2 h-1 rounded-full bg-gradient-to-r from-foreground/40 to-transparent  z-0 w-84  transform translate-x-26" />
          </div>

          {/* actual data */}
          {data.subjects.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className=" mt-4 space-y-4"
            >
              {data.subjects.map((sub, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.2 }}
                  className=" space-y-1 gap-2"
                  key={idx}
                >
                  <div className=" flex items-center justify-between text-sm font-medium ml-2 text-foreground/90">
                    <main> {sub.name}</main>
                    <span className=" flex items-center font-medium">
                      {" "}
                      {sub.grade}% | {sub.passMark}%
                    </span>
                  </div>

                  <div>
                    <Progress value={parseInt(sub.grade)} className=" h-2" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className=" text-sm text-foreground/70 italic text-center">
              No subject found for this student
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default StudentInfo;
