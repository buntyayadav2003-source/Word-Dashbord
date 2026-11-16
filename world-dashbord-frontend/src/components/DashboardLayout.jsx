
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "./sidebar";
import Navbar from "./Navbar";


const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/users": "Users Management",
    "/reports": "Reports",
    "/settings": "Settings",
    "/profile": "My Profile",
  };

  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <div>
      <Sidebar
        isOpen={isOpen}
        closeSidebar={() => setIsOpen(false)}
      />

      <main className="main-content">

        <Navbar
          title={title}
          toggleSidebar={() => setIsOpen(!isOpen)}
        />

        <div className="page-content">
          <Outlet />
        </div>

      </main>
    </div>
  );
};

export default DashboardLayout;
