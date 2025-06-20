"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "../theme/Theme-toggle";
import { cn } from "@/lib/utils";

// sections
const sections = ["home", "features", "analytics", "about"];

const DesktobNavbar = () => {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id.toLowerCase());
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
    <motion.div
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="hidden md:block w-full sticky top-0 z-50 backdrop-blur dark:bg-input/30 shadow-md"
    >
      <div className="flex items-center justify-between w-full p-4">
        {/* Logo */}
        <div className="flex items-center">
          <Logo />
        </div>

        {/* Center nav links - absolute center */}
        <div className="flex items-center gap-6 mx-auto">
          {sections.map((id) => (
            <motion.a
              key={id}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              href={`#${id}`}
              className={cn(
                "transition-colors hover:text-primary font-san antialiased",
                active === id.toLowerCase()
                  ? "text-primary"
                  : "text-primary dark:text-primary"
              )}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </motion.a>
          ))}
        </div>

        {/* Button group */}
        <motion.span
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <ThemeToggle />
          <Button className="font-san antialiased font-semibold">
            <Link href="/account/login">Start now</Link>
          </Button>
        </motion.span>
      </div>
    </motion.div>
  );
};

export default DesktobNavbar;
