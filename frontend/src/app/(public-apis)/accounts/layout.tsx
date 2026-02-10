"use client";

import Footer from "@/components/custom/HomeComponents/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";

const layout = ({ children }: { children: ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const queryClient = new QueryClient();
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex flex-col">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </main>
      <Footer />
    </div>
  );
};

export default layout;
