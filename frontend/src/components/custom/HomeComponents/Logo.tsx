import { cn } from "@/lib/utils";
import { School, SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className=" flex gap-2 items-center font-san antialiased font-semibold text-[18px] "
    >
      <Link
        href="/"
        className={cn(
          " font-extrabold items-center bg-primary/90 rounded-sm p-2"
        )}
      >
        <div>
          <School size={22} className="dark:text-background text-secondary" />
        </div>
      </Link>
      <h1 className=" font-san text-xl tracking-wider text-primary">
        Arday Bile
      </h1>
    </motion.div>
  );
};

export default Logo;
