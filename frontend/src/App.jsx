import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ContractorDashboard from "./pages/ContractorDashboard";
import SiteManagerDashboard from "./pages/SiteManagerDashboard";
import Sites from "./pages/Sites";
import SiteManagers from "./pages/SiteManagers";
import ContractorTools from "./pages/ContractorTools";
import SiteManagerTools from "./pages/SiteManagerTools";
import ToolRequests from "./pages/ToolRequests";



const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    const handleRoleChange = () => {
      setRole(localStorage.getItem("role"));
    };
    window.addEventListener("roleChange", handleRoleChange);
    return () => window.removeEventListener("roleChange", handleRoleChange);
  }, []);

  return (
    <Routes key={role}>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Contractor Routes */}
      <Route
        path="/contractor/dashboard"
        element={
          role === "contractor" ? (
            <ContractorDashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/contractor/sites"
        element={role === "contractor" ? <Sites /> : <Navigate to="/" />}
      />

      <Route
        path="/contractor/site-managers"
        element={role === "contractor" ? <SiteManagers /> : <Navigate to="/" />}
      />

      <Route
        path="/contractor/tools"
        element={role === "contractor" ? <ContractorTools /> : <Navigate to="/" />}
      />

      <Route
        path="/contractor/tool-requests"
        element={role === "contractor" ? <ToolRequests /> : <Navigate to="/" />}
      />

      {/* <Route
        path="/contractor/tool-requests"
        element={role === "contractor" ? <ToolRequests /> : <Navigate to="/" />}
      /> */}

      {/* Site Manager */}
      <Route
        path="/site_manager/dashboard"
        element={
          role === "site_manager" ? (
            <SiteManagerDashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/site_manager/tools"
        element={
          role === "site_manager" ? (
            <SiteManagerTools />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
