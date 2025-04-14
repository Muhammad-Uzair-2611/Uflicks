import React from "react";
import NavBar from "./Components/NavBar";
import Searchbar from "./Components/Searchbar";
import { Outlet, useMatches } from "react-router-dom";

const Layout = () => {
  const matches = useMatches();

  const is404 = matches.some((match) => match.handle?.hideSearch);

  return (
    <div className="container mx-auto">
      <NavBar />
      {!is404 && <Searchbar /> }
      <Outlet />
    </div>
  );
};

export default Layout;
