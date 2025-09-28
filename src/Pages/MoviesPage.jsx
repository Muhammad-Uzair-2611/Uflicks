import React from "react";
import Hero from "../Components/Hero";
import Sliders from "../Components/Sliders";
const MoviesPage = () => {
  return (
    <>
      <Hero />
      <Sliders />
      <div className="w-full my-4 sm:my-6 tracking-widest text-sm sm:text-base md:text-lg lg:text-xl text-center px-4">
        Use <span className="text-amber">Filter</span> to get more{" "}
        <span className="text-amber">Results</span>
      </div>
    </>
  );
};

export default MoviesPage;
