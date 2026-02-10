"use client";

import { cn } from "@/lib/utils";
import { School } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import logo from "../../../public/logo.svg";
import Image from "next/image";

const Logo = () => {
  return (
    <motion.div className=" flex gap-2 items-center antialiased text-[18px] ">
      <Link
        href="/"
        className={cn(
          " font-extrabold bg-foreground/5 items-center  rounded-md p-2",
        )}>
        <div>
          <Image src={logo} alt="Logo" className="size-8" />
        </div>
      </Link>
    </motion.div>
  );
};

export default Logo;
