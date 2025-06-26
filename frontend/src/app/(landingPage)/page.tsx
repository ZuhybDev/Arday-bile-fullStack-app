"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className=" flex flex-col gap-4 m-4">
      Hello home
      <Link href="/accounts/school-register">
        <Button>school</Button>
      </Link>
      <Link href="/accounts/signup">
        <Button>signup</Button>
      </Link>
      <Link href="/accounts/login">
        <Button>login</Button>
      </Link>
    </div>
  );
};

export default Home;
