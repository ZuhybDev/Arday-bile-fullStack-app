"use client";

import Link from "next/link";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ThemeToggle } from "../theme/Theme-toggle";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className=" flex w-full p-4 dark:bg-input/30 items-center justify-center">
      <div className=" flex gap-3 items-center justify-center">
        <span> &copy;{year}</span>
        <span>Zuhyb Dev</span>
        <Link href="https://github.com/ZuhybDev">
          <GitHubIcon />
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Footer;
