import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
const NavBar = () => {
  return (
    <nav className="z-50 sm:sticky top-0 left-0 bg-neutral-950 w-full h-20  px-5 flex py-3 justify-between items-center">
      <div className="logo">
        <img className="sm:w-20 w-17" src="./Logo.png" alt="" />
      </div>
      <div className="md:hidden block text-3xl">
        <GiHamburgerMenu />
      </div>
      <ul className="hidden md:flex gap-x-6 font-bold text-xl [&>li]:hover:cursor-pointer ">
        <li>Favourite</li>
        <li>About me </li>
      </ul>
    </nav>
  );
};

export default NavBar;
