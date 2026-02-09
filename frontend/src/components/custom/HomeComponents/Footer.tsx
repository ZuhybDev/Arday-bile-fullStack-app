"use client";

import Link from "next/link";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import { ThemeToggle } from "../theme/Theme-toggle";
import { motion } from "framer-motion";
import { Github, InstagramIcon, X } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="py-5 border-t border-primary/20">
      <div className="container">
        <div className=" flex flex-col gap-4 sm:flex-row sm:justify-between p-2">
          <div className=" text-center text-primary/60">
            &copy; {year} Arday Bile School Management System. All rights
            reserved.
          </div>

          <ul className=" flex justify-center items-center gap-2.5">
            <li>
              <InstagramIcon />
            </li>
            <li>
              <Github />
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

//  <Link href="https://github.com/ZuhybDev">
//           <GitHubIcon />
//         </Link>
//         <Link href="https://www.instagram.com/its_me_zuhaibka?igsh=MW0wNDQ0OWZheHVtMw==">
//           <InstagramIcon size={20} />
//         </Link>
