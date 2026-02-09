"use client";

import clsx from "clsx";
import { MinusIcon, Plus } from "lucide-react";
import React, { useState } from "react";

const faqs = [
  {
    question: "What is Arday Bile School Management System?",
    answer:
      "Arday Bile is an all-in-one platform for managing school operations, including registering admins, students, subjects, and recording results. It also allows students to view their academic progress and print reports.",
  },
  {
    question: "Can students access their own academic records?",
    answer:
      "Yes! Each student has a secure login where they can view grades, attendance, schedules, and print their academic reports anytime.",
  },
  {
    question: "Is Arday Bile free to use?",
    answer:
      "Currently, Arday Bile offers a free basic plan for schools, with additional premium features available for subscription in the future.",
  },
  {
    question: "Can I register new students and subjects?",
    answer:
      "Absolutely. Admins can easily register new students, assign subjects, and update records directly through the platform.",
  },
  {
    question: "Can I print student reports?",
    answer:
      "Yes, the system allows students and admins to generate and print academic reports directly from the dashboard.",
  },
  {
    question: "Is my data secure on Arday Bile?",
    answer:
      "Yes, all student and school data is securely stored and access is restricted based on user roles to protect sensitive information.",
  },
];

const AccordionItem = ({ que, ans }: { que: string; ans: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div key={que} onClick={() => setIsOpen(!isOpen)}>
      <div className="flex items-center py-7 border-b border-foreground/70">
        <span className=" flex-1  text-lg font-semibold">{que}</span>
        {isOpen ? <MinusIcon /> : <Plus />}
      </div>
      <div
        className={clsx("mt-4", {
          hidden: !isOpen,
          "": isOpen == true,
        })}>
        {ans}
      </div>
    </div>
  );
};

const FAQs = () => {
  return (
    <div className=" p-[72px] px-6">
      <div className="container">
        <h1 className=" text-center text-5xl sm:text-6xl font-semibold ">
          Frequently asked questions
        </h1>
        <div className="mt-12 max-w-[648px] mx-auto">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <AccordionItem que={faq.question} ans={faq.answer} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
