import React, { useEffect } from "react";
import NavBar from "./Components/NavBar";
import { Outlet, useLocation, useMatches, useNavigate } from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop";
import { MoviesInfoProvider } from "./Context/MovieInfoContext";
import { useSearch } from "./Context/Searchcontext";
import Searchbar from "./Components/Searchbar";
import useDocumentTitle from "./hooks/useDocumentTitle";

const Layout = () => {
  const matches = useMatches();
  const { isFocus } = useSearch();
  const navigate = useNavigate();
  const location = useLocation()
  const hideSearNav = matches.some((match) => match.handle?.hide_navbar);
  
  // Set dynamic document title
  useDocumentTitle();

// useEffect(() => {
//   if (isFocus && !location.pathname.includes("/search")) {
//     navigate("/search/movies");
//   }
// }, [isFocus, navigate, location.pathname]);


  return (
    <div className="min-h-screen bg-[#181A1B]">
      <ScrollToTop />
      {!hideSearNav && <NavBar />}
      <div className="block lg:hidden px-3 sm:px-4 py-3">
        <Searchbar />
      </div>
      <MoviesInfoProvider>
        <Outlet />
      </MoviesInfoProvider>
    </div>
  );
};

export default Layout;
