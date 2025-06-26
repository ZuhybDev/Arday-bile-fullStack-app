"use client";

import DesktopNavbar from "@/components/custom/HomeComponents/DesktobNavbar";
import Footer from "@/components/custom/HomeComponents/Footer";
import MobileSidebar from "@/components/custom/HomeComponents/MobileNavbar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <DesktopNavbar />
      <MobileSidebar />
      {/* Main content takes all remaining height */}
      <main className="flex-grow">{children}</main>

      {/* Footer stays pushed down */}
      <Footer />
    </div>
  );
};

export default layout;
