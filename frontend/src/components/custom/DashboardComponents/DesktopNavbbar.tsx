"use client";

import {
  AlignJustify,
  AlignLeft,
  BookCopy,
  ChartSpline,
  ClipboardCheck,
  ClipboardPenLine,
  Home,
  Icon,
  LucideReceiptText,
  ReceiptText,
  School,
  Search,
  Settings,
  UserCog,
  Users,
  Users2,
} from "lucide-react";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { easeInOut, motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const routes = [
  {
    name: "Home",
    icon: Home,
    path: "/dashboard",
  },
  {
    name: "Student",
    icon: Users,
    path: "/dashboard/student",
  },
  {
    name: "Subjects",
    icon: BookCopy,
    path: "/dashboard/subjects",
  },
  {
    name: "Result",
    icon: ReceiptText,
    path: "/dashboard/results",
  },
  {
    name: "Report",
    icon: ClipboardPenLine,
    path: "/dashboard/report",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

export const features = [
  {
    name: "Attendancy",
    icon: ClipboardCheck,
    path: "/dashboard/attendancy",
  },
  {
    name: "Teacheres",
    icon: Users2,
    path: "/dashboard/teachers",
  },
  {
    name: "Analysis",
    icon: ChartSpline,
    path: "/dashboard/analysis",
  },
];

// search
// export const search = [
//   {
//     icon: Search,
//     path: "/dashboard/search",
//   },
// ];

const DesktopNavbbar = ({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  //   user states
  const pathName = usePathname();
  return (
    <motion.div
      animate={{ width: isOpen ? 220 : 60 }}
      transition={{ duration: 0.3, ease: easeInOut }}
      className="hidden md:block h-screen bg-card text-primary fixed top-0 left-0 z-20 shadow-md"
    >
      {/* heading */}
      <div className="flex items-center justify-between p-2 ">
        <motion.button onClick={toggleOpen}>
          <AlignJustify className=" cursor-pointer ml-3" />
        </motion.button>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className=" cursor-pointer hover:rounded-full hover:bg-input/30 text-lg font-heading"
          >
            {/* add the search functions student subjects  */}
            {/* {search.map(({ icon: Icon, path }) => (
              <Link href={path} key={path}>
                <Icon size={20} />
              </Link>
            ))} */}
          </motion.span>
        )}
      </div>

      <Separator />
      <nav className=" mt-3.5 space-y-2 ">
        {routes.map(({ name, icon: Icon, path }) => {
          const isActive = pathName === path;
          return (
            <Link href={path} key={path}>
              <div
                className={` relative group flex items-center gap-2 py-2 cursor-pointer transition ${
                  isActive
                    ? "dark:bg-border bg-input dark:text-primary text-primary "
                    : "hover:dark:bg-secondary bg-card"
                }`}
              >
                <Icon size={20} className=" ml-5 shrink-0  min-w-[20px]" />

                <span
                  className={`transition-all duration-200 overflow-hidden  ${
                    isOpen ? "opacity-100 " : "opacity-0"
                  }`}
                >
                  <span className=" block whitespace-nowrap"> {name}</span>
                </span>

                {/* maual tooltip */}
                {!isOpen && (
                  <div className="absolute ml-8 top-2  translate-x-1/2 whitespace-nowrap dark:bg-primary bg-primary dark:text-primary-foreground text-secondary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 z-50 pointer-events-none">
                    {name}
                  </div>
                )}
              </div>
            </Link>
          );
        })}

        <Separator className=" w-full" />

        {/* features read only */}
        <section className=" mt-2 flex-col flex gap-1 cursor-event-none">
          {features.map(({ name, icon: Icon, path }) => {
            const isActive = pathName === path;
            return (
              <div key={path}>
                <div
                  className={`relative group  flex items-center gap-2 py-2 transition ${
                    isActive
                      ? "dark:bg-border bg-input dark:text-primary text-primary "
                      : "hover:dark:bg-secondary bg-card"
                  }`}
                >
                  <Icon size={20} className=" ml-5 shrink-0 min-w-[20px]" />
                  <span
                    className={`transition-all duration-200 overflow-hidden  ${
                      isOpen ? "opacity-100 " : "opacity-0"
                    }`}
                  >
                    <span className=" block whitespace-nowrap"> {name}</span>

                    {/* maual tooltip */}
                  </span>
                  {!isOpen && (
                    <div className="absolute ml-4 top-2  translate-x-10 whitespace-nowrap dark:bg-primary bg-primary dark:text-primary-foreground text-secondary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition duration-200 z-50 pointer-events-none">
                      Comming soon | {name}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      </nav>
    </motion.div>
  );
};

export default DesktopNavbbar;
