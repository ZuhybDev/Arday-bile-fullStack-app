"use client";

import React, { useEffect, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import { LucidePanelRightOpen } from "lucide-react";
import Logo from "./Logo";
import { sections } from "./HomeNvbar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../theme/Theme-toggle";
import Link from "next/link";
const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState<string>("home");

  //   finind pages by ID
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(entry.target.id.toLowerCase());
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="block md:hidden items-center inset-0  top-0 left-0 sticky z-50 shadow-md">
      <div className="flex justify-between items-center backdrop-blur-2xl p-4 bg-foreground/5 w-full top-0 ">
        <Logo />
        <motion.span
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <LucidePanelRightOpen className="cursor-pointer hover:bg-foreground/5" />
        </motion.span>

        {/* blur */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className=" min-h-screen fixed inset-0 z-10 backdrop-blur-2xl transition-all duration-300 bg-card/65"
          ></div>
        )}

        <motion.div
          onClick={() => setIsOpen(!isOpen)}
          initial={{ opacity: 0 }}
          animate={{ width: isOpen ? 170 : 0, opacity: 1 }}
          className=" shadow-md md:hidden block h-screen bg-card text-primary fixed top-0 right-0 z-40 overflow-hidden"
        >
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: easeInOut }}
              className=" flex flex-col gap-2  mt-6 m-4 items-center"
            >
              {sections.map((id, idx) => (
                <motion.a
                  key={idx}
                  href={`#${id}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.2 }}
                  className={cn(
                    "transition-colors hover:text-primary font-san antialiased",
                    isActive === id.toLocaleLowerCase()
                      ? "dark:text-muted-foreground text-muted-foreground"
                      : "text-foreground"
                  )}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </motion.a>
              ))}
              <Button>
                <Link href="/accounts/login">Start Now</Link>
              </Button>
              <ThemeToggle />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MobileSidebar;
