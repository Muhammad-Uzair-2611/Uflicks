import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
const NavBar = () => {
  return (
    <nav className="z-50 sm:sticky top-0 left-0 bg-neutral-950 w-full sm:h-20 h-15 px-5 flex py-3 justify-between items-center">
      <div className="logo">
        <a href="/">
          <img className="sm:w-20 w-15" src="./Logo.png" alt="" />
        </a>
      </div>

      <div className="md:hidden block text-2xl mb-1">
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
