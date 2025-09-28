import React from "react";
import Sidebar from "./Sidebar";
import ImageCrousel from "./ImageCrousel";

const Hero = () => {
  return (
    <div className="gap-x-1 px-2 sm:px-3 md:px-4 w-full h-fit flex lg:flex-row flex-col">
      <Sidebar />
      <ImageCrousel />
    </div>
  );
};

export default Hero;
