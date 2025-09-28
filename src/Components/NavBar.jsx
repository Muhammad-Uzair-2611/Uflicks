import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { FaSkull, FaMap } from "react-icons/fa";
import { HiHome } from "react-icons/hi2";
import { MdMovie } from "react-icons/md";
import { PiFilmReel } from "react-icons/pi";
import { GiCrossedSwords, GiMonoWheelRobot } from "react-icons/gi";
import { LuTv } from "react-icons/lu";
import { FaMasksTheater } from "react-icons/fa6";
import { BsPerson } from "react-icons/bs";
import Searchbar from "./Searchbar";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="z-50 sticky top-0 left-0 bg-[#181A1B] w-full py-2 h-16 px-3 sm:px-4 md:px-5 flex justify-between items-center">
      <div className="logo">
        <a href="/">
          <img
            className="w-10 sm:w-12 md:w-14 lg:w-16 h-auto"
            src="/Logo.png"
            alt="UFlicks Logo"
            width={76}
            height={76}
          />
        </a>
        {/* <button
          onClick={() => getMovieDetails(456)}
          className="px-4 py-2 bg-amber text-black rounded-md hover:bg-amber/80 transition-colors"
        >
          Get Movie Details
        </button> */}
      </div>
      <div className="flex text-xl sm:text-2xl mb-2 gap-x-3 sm:gap-x-5">
        <div className="hidden lg:block">
          <Searchbar />
        </div>
        <span className="lg:hidden cursor-pointer hover:text-amber-400 transition-colors" onClick={toggleMenu}>
          <GiHamburgerMenu />
        </span>
      </div>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } transition-all duration-300 ease-in-out bg-black shadow-lg shadow-neutral-400 absolute top-0 right-0 z-50 p-4 space-y-5 h-screen w-64 sm:w-72`}
      >
        <div className="w-full text-2xl flex justify-end">
          <span className="cursor-pointer hover:text-amber-400 transition-colors" onClick={toggleMenu}>
            <RxCross2 />
          </span>
        </div>
        <div>
          <ul
            className="space-y-4 w-full [&>li]:flex [&>li]:px-3 [&>li]:py-2 
            [&>li]:cursor-pointer [&>li]:rounded-md [&>li]:gap-x-3 [&>li]:text-base sm:text-lg 
            [&>li>span]:text-[16px] sm:[&>li>span]:text-[18px] [&>li]:hover:bg-neutral-600 [&>li]:transition-colors"
          >
            <li>
              <Link
                to="/"
                className="flex items-center gap-x-2 w-full"
                onClick={toggleMenu}
              >
                <HiHome />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="flex items-center gap-x-2 w-full"
                onClick={toggleMenu}
              >
                <MdMovie />
                <span>Movies</span>
              </Link>
            </li>
            <li>
              <Link
                to="/tv_series"
                className="flex items-center gap-x-2 w-full"
                onClick={toggleMenu}
              >
                <LuTv />
                <span>TV Series</span>
              </Link>
            </li>
            <li>
              <Link
                to="/animations/movies"
                className="flex items-center gap-x-2 w-full"
                onClick={toggleMenu}
              >
                <PiFilmReel />
                <span>Animation</span>
              </Link>
            </li>
            <li>
              <Link
                to="/horror/movies"
                className="flex items-center gap-x-2 w-full"
                onClick={toggleMenu}
              >
                <FaSkull />
                <span>Horror</span>
              </Link>
            </li>
            <li>
              <Link
                to="/action/movies"
                className="flex items-center gap-x-2 w-full"
                onClick={toggleMenu}
              >
                <GiCrossedSwords />
                <span>Action</span>
              </Link>
            </li>
            <li>
              <Link
                to="/drama/movies"
                className="flex items-center gap-x-2 w-full"
                onClick={toggleMenu}
              >
                <FaMasksTheater />
                <span>Drama</span>
              </Link>
            </li>
            <li>
              <Link
                to="/adventure/movies"
                className="flex items-center gap-x-2 w-full"
                onClick={toggleMenu}
              >
                <FaMap />
                <span>Adventure</span>
              </Link>
            </li>
            <li>
              <Link
                to="/comedy/movies"
                className="flex items-center gap-x-2 w-full"
                onClick={toggleMenu}
              >
                <GiMonoWheelRobot />
                <span>Comedy</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center gap-x-2 w-full"
                onClick={toggleMenu}
              >
                <BsPerson />
                <span>About</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <ul className="hidden lg:flex gap-x-4 xl:gap-x-6 font-bold text-base md:text-lg lg:text-xl [&>li]:hover:cursor-pointer">
        <li>
          <Link to="/about" className="hover:text-amber-400 transition-colors">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
