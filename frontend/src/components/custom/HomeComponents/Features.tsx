import { Database, FileText, LogIn, User } from "lucide-react";
import { features } from "process";
import React from "react";

const Features = () => {
  const features = [
    {
      title: "Student Management",
      description:
        "Centralize all student records in a structured table. Easily manage personal details, class assignments, and academic information from one organized dashboard—fast, clear, and reliable.",
      icons: User,
    },
    {
      title: "Student Login",
      description:
        "Provide students with secure login access to view their personal information and academic records. Simple authentication designed for ease of use and data privacy.",
      icons: LogIn,
    },
    {
      title: "Student Data Export (PDF)",
      description:
        "Generate and print student information as professional PDF documents. Perfect for reports, records, and official documentation—clean formatting, one click away.",
      icons: FileText,
    },
  ];
  return (
    <div className="py-[72px] px-6">
      <div className="container">
        <div className="max-w-xl mx-auto">
          <h1 className=" text-center font-semibold tracking-tighter text-5xl sm:text-6xl">
            Everything you need
          </h1>
          <p className="text-center text-foreground/60 text-xl mt-5">
            Everything you need to run your school—simplified. From student
            records to teacher management, attendance, exams, and payments, our
            school management system brings all essential operations into one
            secure, easy-to-use platform. No clutter.
          </p>
        </div>

        {/* features */}

        <div className=" mt-16 flex flex-col lg:flex-row gap-4">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="space-y-4 border border-foreground/40 px-5 py-10 text-center rounded-md">
              <div className="inline-flex p-4 bg-foreground/10 rounded-full dark:bg-foreground/20 items-center justify-center">
                <item.icons />
              </div>
              <h1 className=" font-semibold">{item.title}</h1>
              <p className="text-foreground/60">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
