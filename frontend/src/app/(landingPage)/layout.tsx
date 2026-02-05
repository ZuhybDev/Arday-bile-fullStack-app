"use client";

import Footer from "@/components/custom/HomeComponents/Footer";
import HomeNavbar from "@/components/custom/HomeComponents/HomeNvbar";
import MobileSidebar from "@/components/custom/HomeComponents/mainNav";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <MobileSidebar />
      {/* Main content */}
      <main className="flex-grow">{children}</main>
      {/* Footer  */}
      <Footer />
    </div>
  );
};

export default layout;
