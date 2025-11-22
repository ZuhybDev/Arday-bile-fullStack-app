import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowRightSquare } from "lucide-react";
import Link from "next/link";
import React from "react";

const notfound = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col space-y-2">
      <h1 className="text-4xl font-san font-semibold antialiased">404</h1>
      <p className=" text-sm dark:text-primary text-primary">
        Could not find requested resources
      </p>
      <Link href="/" className=" ">
        <Button className=" flex gap-1 hover:gap-2">
          <ArrowLeft />
          <span> Home</span>
        </Button>
      </Link>
    </div>
  );
};

export default notfound;
