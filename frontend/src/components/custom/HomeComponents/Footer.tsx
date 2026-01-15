"use client";

import Link from "next/link";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ThemeToggle } from "../theme/Theme-toggle";
import { motion } from "framer-motion";
import { InstagramIcon } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <motion.div className=" flex w-full p-2 dark:bg-input/30 items-center justify-center">
      <motion.div className=" flex gap-3 items-center">
        <span> &copy;{year}</span>
        <span>Zuhyb Dev</span>
        <Link href="https://github.com/ZuhybDev">
          <GitHubIcon />
        </Link>
        <Link href="https://github.com/ZuhybDev">
          <InstagramIcon size={20} />
        </Link>
        <ThemeToggle />
      </motion.div>
    </motion.div>
  );
};

export default Footer;
