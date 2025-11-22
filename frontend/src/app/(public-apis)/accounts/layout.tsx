"use client";

import Footer from "@/components/custom/HomeComponents/Footer";
import { useTheme } from "next-themes";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";

const layout = ({ children }: { children: ReactNode }) => {
  const { resolvedTheme } = useTheme();
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
