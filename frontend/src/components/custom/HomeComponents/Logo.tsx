"use client";

import { cn } from "@/lib/utils";
import { School } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
    
      className=" flex gap-2 items-center antialiased text-[18px] "
    >
      <Link
        href="/"
        className={cn(
          " font-extrabold bg-foreground/90 items-center  rounded-md p-2"
        )}
      >
        <div>
          <School size={18} className="dark:text-background text-background" />
        </div>
      </Link>
    </motion.div>
  );
};

export default Logo;
