import Image from "next/image";
import React from "react";
import aboutUs from "../../../assets/images/aboutUsImage.jpg";

const AboutUs = () => {
  return (
    <div className="px-8" id="about">
      <div className=" container mx-auto">
        <div className="">
          <h1 className=" text-4xl sm:text-6xl text-center font-semibold mb-12">
            About Us
          </h1>

          <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-20">
            {/* Left Side: Image - Takes up 1 part of the flex space */}
            <div className="flex-1 w-full">
              <Image
                src={aboutUs}
                alt="about us image"
                className="shadow-lg rounded-md"
                priority
              />
            </div>

            {/* Right Side: Text - Takes up 1 part of the flex space */}
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl lg:text-4xl text-center font-extrabold text-foreground tracking-tight">
                About Arday Bile
              </h2>

              <p className="text-lg lg:text-xl text-foreground/70 leading-relaxed text-center md:text-left">
                Arday Bile is a premier school management ecosystem designed to
                transform administrative complexity into academic clarity. We
                bridge the gap between data and excellence by providing schools
                with an intuitive platform for real-time attendance, secure
                student records, and comprehensive academic insights.
              </p>

              {/* Optional: Add a subtle highlight or stats here */}
              <div className="pt-4 border-t border-foreground/10 ">
                <p className="italic text-primary font-medium text-center">
                  “Nurturing every learner’s potential.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
