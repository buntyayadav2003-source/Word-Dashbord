
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../components/DashboardLayout.jsx";
import Dashboard from "../features/index.jsx";
import Users from "../features/Users.jsx";
import Reports from "../features/Reports.jsx";
import Settings from "../features/Settings.jsx";
import Login from "../features/Login.jsx";
import Profile from "../features/Profile.jsx";

<Route path="/users" element={<Users />} />




const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
