import Image from "next/image";
import React, { useRef } from "react";
import appScreen from "../../../assets/images/productShowCase.png";
import { useScroll, useTransform, motion } from "framer-motion";

const ProductShowCase = () => {
  const appImage = useRef<HTMLImageElement>(null);

  const { scrollYProgress } = useScroll({
    target: appImage,
    offset: ["start end", "end end"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [15, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <div className="py-[72px] p-10" id="product">
      <div className=" container">
        <h2 className=" text-center font-semibold text-4xl mb-4 sm:text-6xl tracking-tight">
          Intuitive interface
        </h2>

        <div className="max-w-xl mx-auto">
          <p className=" text-center text-xl text-foreground/70">
            From student records to schedules and grades, everything you need is
            organized in one simple, intuitive dashboard.
          </p>
        </div>

        <motion.div
          style={{
            opacity: opacity,
            rotateX: rotateY,
            transformPerspective: "800px",
          }}>
          <Image
            src={appScreen}
            alt="product show case image"
            className="mt-14 shadow-lg rounded-md"
            ref={appImage}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ProductShowCase;
