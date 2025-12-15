import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const ProtectedRoute = () => {

  return (
    <div>
      <Navbar />
      <div className="lg:ml-16">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoute;
