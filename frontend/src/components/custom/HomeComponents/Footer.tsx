"use client";

import Link from "next/link";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ThemeToggle } from "../theme/Theme-toggle";
import { motion } from "framer-motion";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className=" flex w-full p-2 dark:bg-input/30 items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className=" flex gap-3 items-center"
      >
        <span> &copy;{year}</span>
        <span>Zuhyb Dev</span>
        <Link href="https://github.com/ZuhybDev">
          <GitHubIcon />
        </Link>
        <ThemeToggle />
      </motion.div>
    </motion.div>
  );
};

export default Footer;
