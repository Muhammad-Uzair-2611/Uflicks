import React from "react";
import Sidebar from "./Sidebar";
import ImageCrousel from "./ImageCrousel";

const Hero = () => {
  return (
    <div className="gap-x-1 px-3 w-full h-fit flex md:flex-row flex-col ">
      <Sidebar />
      <ImageCrousel />
    </div>
  );
};

export default Hero;
