import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="min-h-screen p-[72px] bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.1),transparent_60%)]">
      <div className="container">
        <div className="flex items-center justify-center flex-col">
          <h1 className="p-1 px-2 bg-sidebar-border/70 rounded-full">
            Empower Your Academic Journey
          </h1>
        </div>

        <p className="italic text-center text-7xl font-semibold tracking-tighter mt-8">
          One Task at a Time
        </p>

        <p className="text-center text-xl mt-8">
          Simplify your school management with our all-in-one platform. From
          student records and attendance to grades and schedules, everything is
          organized in one intuitive dashboard.
        </p>

        <div className="flex gap-4 justify-center mt-8 cursor-pointer">
          <Button className="cursor-pointer">
            <Link href="/accounts/school-register">Start now</Link>
          </Button>
          <Button className="cursor-pointer">
            <Link href="/accounts/school-register">Look your academic</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
