import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ContractorDashboard from "./pages/ContractorDashboard";
import SiteManagerDashboard from "./pages/SiteManagerDashboard";



const App = () => {
  const role = localStorage.getItem("role");

  return (
    <Routes>
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

      {/* <Route
        path="/contractor/sites"
        element={role === "contractor" ? <Sites /> : <Navigate to="/" />}
      />

      <Route
        path="/contractor/site-managers"
        element={role === "contractor" ? <SiteManagers /> : <Navigate to="/" />}
      />

      <Route
        path="/contractor/tools"
        element={role === "contractor" ? <Tools /> : <Navigate to="/" />}
      />

      <Route
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

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
