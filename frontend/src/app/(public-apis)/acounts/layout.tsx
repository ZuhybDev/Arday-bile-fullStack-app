import Footer from "@/components/custom/HomeComponents/Footer";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
