"use client";

import {
  AlignJustify,
  AlignLeft,
  BookCopy,
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
    name: "Me",
    icon: UserCog,
    path: "/dashboard/me",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

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
      animate={{ width: isOpen ? 220 : 80 }}
      transition={{ duration: 0.3, ease: easeInOut }}
      className="hidden md:block h-screen bg-card text-primary fixed top-0 left-0 z-20 shadow-md"
    >
      {/* heading */}
      <div className="flex items-center justify-between p-2 ">
        <motion.button onClick={toggleOpen}>
          <AlignJustify className=" cursor-pointer" />
        </motion.button>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className=" cursor-pointer hover:rounded-full hover:bg-input/30 text-lg font-heading"
          >
            {/* add the search functions student subjects  */}
            <Search size={16} />
          </motion.span>
        )}
      </div>

      <Separator />
      <nav className=" mt-4 space-y-2 ">
        {routes.map(({ name, icon: Icon, path }) => {
          const isActive = pathName === path;
          return (
            <Link href={path} key={path}>
              <div
                className={` flex items-center gap-2 py-2 cursor-pointer transition ${
                  isActive
                    ? "dark:bg-border bg-input dark:text-primary text-primary "
                    : "hover:dark:bg-secondary bg-card"
                }`}
              >
                <Icon size={20} className=" ml-2 shrink-0  min-w-[20px]" />
                <span
                  className={`transition-all duration-200 overflow-hidden  ${
                    isOpen ? "opacity-100 " : "opacity-0"
                  }`}
                >
                  <span className=" block whitespace-nowrap"> {name}</span>
                </span>
              </div>
            </Link>
          );
        })}
      </nav>
    </motion.div>
  );
};

export default DesktopNavbbar;
