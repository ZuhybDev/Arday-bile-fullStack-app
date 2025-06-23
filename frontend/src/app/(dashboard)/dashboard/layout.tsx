"use client";

import DesktopNavbbar, {
  routes,
} from "@/components/custom/DashboardComponents/DesktopNavbbar";

import React, { ReactNode, useState } from "react";
import MobileSidebar from "@/components/custom/DashboardComponents/MobileSidebar";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
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
        className={`flex p-4 flex-col transition-all duration-200 ease-in-out ${
          isOpen ? "md:ml-[220px] block" : "md:ml-[80px] block ml-5"
        }`}
      >
        <span className=" text-[16px] antialiased">{activeRouteName}</span>
        <Separator />
      </div>
      <MobileSidebar />
      <DesktopNavbbar isOpen={isOpen} toggleOpen={() => setIsOpen(!isOpen)} />
      <main
        className={`transition-all duration-200 p-2 ease-in-out ${
          isOpen ? "md:ml-[220px] block" : "md:ml-[80px] block ml-1"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default layout;
