import React from "react";
import NavBar from "./Components/NavBar";
import Searchbar from "./Components/Searchbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container mx-auto">
      <NavBar />
      <Searchbar />
      <Outlet />
    </div>
  );  
};

export default Layout;
