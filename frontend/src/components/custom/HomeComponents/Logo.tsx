"use client";

import { cn } from "@/lib/utils";
import { School } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className=" flex gap-2 items-center font-san antialiased text-[18px] "
    >
      <Link
        href="/"
        className={cn(
          " font-extrabold bg-foreground/90 items-center  rounded-md p-2"
        )}
      >
        <div>
          <School size={22} className="dark:text-background text-background" />
        </div>
      </Link>
      <h1 className=" font-logo text-xl md:hidden block"> Arday Bile</h1>
    </motion.div>
  );
};

export default Logo;
