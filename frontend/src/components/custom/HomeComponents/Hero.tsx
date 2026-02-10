import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="relative min-h-screen p-[72px] bg-background">
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute inset-0
    bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.2),transparent_70%)]"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40
    bg-gradient-to-b from-transparent to-background"
      />

      {/* Content */}
      <div className="relative container">
        <div className="flex justify-center w-full">
          <h1 className="bg-sidebar-border/30 text-foreground/80 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide">
            Empower Your Academic Journey
          </h1>
        </div>

        <p className="text-center sm:text-7xl text-6xl font-semibold tracking-tighter mt-8">
          One Task at a Time
        </p>

        <p className="text-center text-xl mt-8">
          Simplify your school management with our all-in-one platform. From
          student records and attendance to grades and schedules, everything is
          organized in one intuitive dashboard.
        </p>

        <div className="flex gap-4 justify-center mt-8 cursor-pointer">
          <Button>
            <Link href="/accounts/school-register">Start now</Link>
          </Button>
          <Button>
            <Link href="/accounts/school-register">I'm a student</Link>
          </Button>
        </div>
      </div>

      <div className="absolute sm:bottom-16 left-0 w-full overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)]">
        <div className=" mt-12 flex w-max animate-infinite-scroll whitespace-nowrap text-4xl sm:text-5xl font-bold text-foreground/30">
          {/* Block 1 */}

          <div className="flex items-center">
            <span className="mx-4">
              🚀 Empower Your Academic Journey • One Task at a Time • Simplify
              School Management •
            </span>
          </div>

          {/* Block 2 (The Twin) - This makes it seamless */}
          <div className="flex items-center">
            <span className="mx-4">
              Empower Your Academic Journey • One Task at a Time • Simplify
              School Management • 🚀
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
