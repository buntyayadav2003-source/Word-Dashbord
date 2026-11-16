
import React from "react";
import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaUsers,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Users",
      path: "/users",
      icon: <FaUsers />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartBar />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  const handleLogout = () => {
    // Add your logout API logic here
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        ></div>
      )}

      <aside className={`sidebar ${isOpen ? "show" : ""}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <h4 className="mb-0">
            <span className="brand-icon">A</span>
            AdminPanel
          </h4>

          <button
            className="btn close-sidebar d-lg-none"
            onClick={closeSidebar}
          >
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}
        <div className="sidebar-menu">
          <p className="menu-title">MAIN MENU</p>

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
              onClick={closeSidebar}
            >
              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button
            className="sidebar-link logout-btn"
            onClick={handleLogout}
          >
            <span className="sidebar-icon">
              <FaSignOutAlt />
            </span>
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
