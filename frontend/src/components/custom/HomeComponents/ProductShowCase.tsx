import Image from "next/image";
import React from "react";
import appScreen from "../../../assets/images/productShowCase.png";

const ProductShowCase = () => {
  return (
    <div className="py-[72px] p-10">
      <div className=" container">
        <h2 className=" text-center font-semibold text-5xl sm:text-6xl tracking-tight">
          Intuitive interface
        </h2>

        <div className="max-w-xl mx-auto">
          <p className=" text-center text-xl text-foreground/70">
            From student records to schedules and grades, everything you need is
            organized in one simple, intuitive dashboard.
          </p>
        </div>
        <Image
          src={appScreen}
          alt="product show case image"
          className="mt-14 shadow-lg rounded-md"
        />
      </div>
    </div>
  );
};

export default ProductShowCase;
