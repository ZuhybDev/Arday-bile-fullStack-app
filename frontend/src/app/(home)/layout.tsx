import DesktopNavbar from "@/components/custom/HomeComponents/DesktopNavbar";
import Footer from "@/components/custom/HomeComponents/Footer";
import MobileSidebar from "@/components/custom/HomeComponents/MobileSidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <DesktopNavbar />
      <MobileSidebar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
