"use client";

import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { easeIn, motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "../theme/Theme-toggle";
import { cn } from "@/lib/utils";

// sections
export const sections = ["home", "features", "product", "about", "FAQs"];

const HomeNavbar = () => {
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
      { threshold: 0.6 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="hidden md:block sticky top-0 z-40 ">
      <motion.div className=" p-4 flex items-center justify-between ">
        {/* Logo */}
        <div className="flex items-center ">
          <Logo />
        </div>

        <div className="flex items-center gap-6 p-2 bg-card/20 backdrop-blur-2xl px-4 rounded-full border shadow-md">
          {sections.map((id) => (
            <motion.a
              key={id}
              href={`#${id}`}
              className={cn(
                "transition-colors hover:text-primary font-san antialiased",
                active === id.toLowerCase()
                  ? "text-primary"
                  : " text-foreground",
              )}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </motion.a>
          ))}
        </div>

        {/* Button group */}
        <motion.span
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: easeIn }}
          className=" space-y-2">
          <Button className="font-san antialiased font-medium">
            <Link href="/accounts/school-register">Start now</Link>
          </Button>

          <Link href="/accounts/login">Login</Link>
        </motion.span>
      </motion.div>
    </div>
  );
};

export default HomeNavbar;
