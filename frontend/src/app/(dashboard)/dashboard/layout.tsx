"use client";

import DesktopNavbbar, {
  routes,
} from "@/components/custom/DashboardComponents/DesktopNavbbar";

import React, { ReactNode, useState } from "react";
import MobileSidebar from "@/components/custom/DashboardComponents/MobileSidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/custom/theme/Theme-toggle";
import { SchoolProviderWrapper } from "../SchoolProviderWrapper";

const layout = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const activeRoute = [...routes]

    .sort((a, b) => b.path.length - a.path.length)
    .find((route) => pathName.startsWith(route.path));

  const activeRouteName = activeRoute?.name || "Home";
  return (
    <div className=" flex flex-col">
      <div
        className={`flex md:p-1 p-2 flex-col transition-all duration-200 ease-in-out ${
          isOpen ? "md:ml-[220px] block" : "md:ml-[60px] block ml-5"
        }`}
      >
        {/* acticve route and mode */}
        <div className=" flex items-center justify-between ml-2 ">
          <span className=" text-[16px] antialiased">{activeRouteName}</span>
          <ThemeToggle />
        </div>
        <Separator />
      </div>
      <MobileSidebar />
      <DesktopNavbbar isOpen={isOpen} toggleOpen={() => setIsOpen(!isOpen)} />
      <main
        className={`transition-all duration-200 p-2 ease-in-out ${
          isOpen ? "md:ml-[220px] block" : "md:ml-[60px] block ml-1"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default layout;
