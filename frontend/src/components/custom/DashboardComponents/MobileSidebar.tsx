"use client";

import { AlignLeft, Icon, Search } from "lucide-react";
import React, { useState } from "react";
import { easeInOut, motion } from "framer-motion";
import Link from "next/link";
import { routes } from "./DesktopNavbbar";
import { usePathname } from "next/navigation";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const pathName = usePathname();
  return (
    <div>
      <span
        onClick={() => setIsOpen(!isOpen)}
        className=" cursor-pointer ml-2 flex mt-4.5 fixed top-0 left-0 z-20 "
      >
        <AlignLeft size={20} />
      </span>

      {/* blur  */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className=" fixed inset-0 z-10 backdrop-blur-sm transition-all duration-300 bg-card/65"
        ></div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ width: isOpen ? 126 : 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: easeInOut }}
        className=" md:hidden block h-screen bg-card text-primary fixed top-0 left-0 z-40 overflow-hidden "
        onClick={() => setIsOpen(false)}
      >
        <div
          className={` ${
            isOpen
              ? "  cursor-pointer mt-6 p-1 flex justify-end items-center"
              : "hidden"
          } `}
        >
          {/* add search function for student */}
          <Search size={16} />
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: easeInOut }}
          >
            {routes.map(({ name, icon: Icons, path }) => {
              const isActive = pathName == path;
              return (
                <Link
                  key={path}
                  href={path}
                  className={`flex items-center gap-2 py-2 cursor-pointer transition-all duration-200 ${
                    isActive
                      ? "dark:bg-border bg-input dark:text-primary text-primary"
                      : "hover:dark:bg-secondary bg-card"
                  } `}
                >
                  <Icons size={16} className="ml-2" />

                  <span className=" block whitespace-nowrap text-[12px]">
                    {name}
                  </span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default MobileSidebar;
