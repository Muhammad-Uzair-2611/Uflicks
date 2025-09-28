import { NavLink, useLocation } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { MdMovie } from "react-icons/md";
import { LuTv } from "react-icons/lu";
import { PiFilmReel } from "react-icons/pi";
import { FaSkull, FaMasksTheater, FaMap } from "react-icons/fa6";
import { GiCrossedSwords, GiJesterHat } from "react-icons/gi";

const Sidebar = () => {
  const location = useLocation();

  const isCurrentSection = (path) => location.pathname.startsWith(path);
  return (
    <div className={`lg:block hidden h-full py-4 lg:py-6 xl:py-8`}>
      <ul
        className="space-y-3 lg:space-y-4 xl:space-y-6 w-48 lg:w-56 xl:w-60    
        [&>a]:flex 
        [&>a]:px-2 lg:px-3
        [&>a]:cursor-pointer 
        [&>a]:rounded-sm 
        [&>a>li]:gap-x-2 lg:gap-x-3
        [&>a>li]:text-lg lg:text-xl xl:text-[22px]
        [&>a>li]:flex 
        [&>a>li]:items-center 
        [&>a>li]:py-2 lg:py-3
        [&>a>li>span]:text-lg lg:text-xl xl:text-[22px] 
        [&>a>li>span]:h-5
        [&>a]:transition-all
        [&>a>li]:hover:scale-105"
      >
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "bg-neutral-600" : "")}
        >
          <li>
            <HiHome />
            <span>Home</span>
          </li>
        </NavLink>

        <NavLink
          to={"/movies"}
          className={({ isActive }) => (isActive ? "bg-neutral-600" : "")}
        >
          <li>
            <MdMovie />
            <span>Movies</span>
          </li>
        </NavLink>

        <NavLink
          to="/tv_series"
          className={({ isActive }) => (isActive ? "bg-neutral-600" : "")}
        >
          <li>
            <LuTv />
            <span>TV Series</span>
          </li>
        </NavLink>

        <NavLink
          to="/animations/movies"
          className={`${
            isCurrentSection("/animations") ? "bg-neutral-600" : ""
          }`}
        >
          <li>
            <PiFilmReel />
            <span>Animations</span>
          </li>
        </NavLink>

        <NavLink
          to="/horror/movies"
          className={`${isCurrentSection("/horror") ? "bg-neutral-600" : ""}`}
        >
          <li>
            <FaSkull />
            <span>Horror</span>
          </li>
        </NavLink>

        <NavLink
          to="/action/movies"
          className={`${isCurrentSection("/action") ? "bg-neutral-600" : ""}`}
        >
          <li>
            <GiCrossedSwords />
            <span>Action</span>
          </li>
        </NavLink>

        <NavLink
          to="/drama/movies"
          className={`${isCurrentSection("/drama") ? "bg-neutral-600" : ""}`}
        >
          <li>
            <FaMasksTheater />
            <span>Drama</span>
          </li>
        </NavLink>

        <NavLink
          to="/adventure/movies"
          className={`${
            isCurrentSection("/adventure") ? "bg-neutral-600" : ""
          }`}
        >
          <li>
            <FaMap />
            <span>Adventure</span>
          </li>
        </NavLink>

        <NavLink
          to="/comedy/movies"
          className={`${isCurrentSection("/comedy") ? "bg-neutral-600" : ""}`}
        >
          <li>
            <GiJesterHat />
            <span>Comedy</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
