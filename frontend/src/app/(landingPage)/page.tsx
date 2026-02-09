"use client";
import FAQs from "@/components/custom/HomeComponents/FAQs";
import Features from "@/components/custom/HomeComponents/Features";
import Hero from "@/components/custom/HomeComponents/Hero";
import ProductShowCase from "@/components/custom/HomeComponents/ProductShowCase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div>
      <Hero />
      <Features />
      <ProductShowCase />
      <FAQs />
    </div>
  );
};

export default Home;
