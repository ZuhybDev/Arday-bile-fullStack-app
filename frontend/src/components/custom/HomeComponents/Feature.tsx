"use client";

import { LucideIcon } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const Feature = ({
  title,
  description,
  Icons,
}: {
  title: string;
  description: string;
  Icons: LucideIcon;
}) => {
  const borderTracker = useRef<HTMLDivElement>(null);

  const offsetX = useMotionValue(-100);
  const offsetY = useMotionValue(-100);
  const maskImage = useMotionTemplate`radial-gradient(100px 100px at ${offsetX}px ${offsetY}px, black, transparent)`;

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (!borderTracker.current) return;
      const borderRect = borderTracker.current.getBoundingClientRect();
      offsetX.set(e.clientX - borderRect.x);
      offsetY.set(e.clientY - borderRect.y);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return (
    <div className="relative flex-1 border border-foreground/40 px-5 py-10 text-center rounded-xl overflow-hidden">
      <motion.div
        className="absolute inset-0 border-2 border-foreground/90 rounded-xl pointer-events-none"
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
        ref={borderTracker}
      />

      <div className="relative z-10">
        {" "}
        {/* Keeps content above the glow */}
        <div className="mb-3 inline-flex p-4 bg-foreground/10 rounded-full dark:bg-foreground/20 items-center justify-center">
          <Icons />
        </div>
        <h1 className="mb-3 font-semibold">{title}</h1>
        <p className="mb-3 text-foreground/60">{description}</p>
      </div>
    </div>
  );
};

export default Feature;
