
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaBars,
  FaSearch,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaUser,
  FaCheck,
} from "react-icons/fa";

const Navbar = ({ toggleSidebar, title = "Dashboard" }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [search, setSearch] = useState("");

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Welcome to World Dashboard!",
      time: "Just now",
      read: false,
    },
    {
      id: 2,
      message: "Dashboard is ready to use.",
      time: "Recently",
      read: false,
    },
    {
      id: 3,
      message: "Check your latest country reports.",
      time: "Today",
      read: true,
    },
  ]);

  const navigate = useNavigate();

  const unreadCount = notifications.filter(
    (item) => !item.read
  ).length;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setShowProfile(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate(`/dashboard?search=${encodeURIComponent(search.trim())}`);
  };

  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, read: true }))
    );
  };

  const markRead = (id) => {
    setNotifications((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, read: true } : item
      )
    );
  };

  return (
    <nav className="dashboard-navbar">

      {/* Left Section */}
      <div className="navbar-left">
        <button
          className="menu-toggle"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <h5 className="page-title">{title}</h5>
      </div>

      {/* Right Section */}
      <div className="navbar-right">

        {/* Search */}
        <form className="navbar-search" onSubmit={handleSearch}>
          <FaSearch />
          <input
            type="search"
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button
            className="notification-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
          >
            <FaBell />

            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "10px",
                  minWidth: "17px",
                  height: "17px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                right: 0,
                width: "300px",
                background: "white",
                color: "#333",
                borderRadius: "10px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                padding: "15px",
                zIndex: 1000,
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">Notifications</h6>

                <button
                  type="button"
                  className="btn btn-sm btn-link text-decoration-none"
                  onClick={markAllRead}
                >
                  Mark all read
                </button>
              </div>

              {notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markRead(item.id)}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #eee",
                    background: item.read ? "white" : "#f0f6ff",
                    cursor: "pointer",
                    borderRadius: "5px",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <small>{item.message}</small>
                    {!item.read && (
                      <span className="text-primary">
                        <FaCheck />
                      </span>
                    )}
                  </div>

                  <small className="text-muted">{item.time}</small>
                </div>
              ))}

              {notifications.length === 0 && (
                <p className="text-muted text-center mb-0">
                  No notifications
                </p>
              )}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="profile-wrapper">
          <button
            className="profile-btn"
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
          >
            <img
              src="./sourabh.jpg.jpeg"
              alt="Sourabh Yadav"
              className="profile-icon"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />

            <div className="profile-info">
              <span className="profile-name">
                Sourabh Yadav
              </span>
              <small>Administrator</small>
            </div>
          </button>

          {showProfile && (
            <div className="profile-dropdown">
              <Link
                to="/profile"
                onClick={() => setShowProfile(false)}
              >
                <FaUser /> My Profile
              </Link>

              <Link
                to="/settings"
                onClick={() => setShowProfile(false)}
              >
                <FaCog /> Settings
              </Link>

              <hr />

              <button onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
