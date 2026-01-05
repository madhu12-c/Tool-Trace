import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import SiteManagerDashboard from "./SiteManagerDashboard";
import ContractorDashboard from "./ContractorDashboard";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    console.log("LOGIN RESPONSE:", res.data);

    const { role, contractorId, siteId, userId } = res.data;

    localStorage.setItem("role", role);
    if (contractorId) localStorage.setItem("contractorId", contractorId);
    if (siteId) localStorage.setItem("siteId", siteId);
    if (userId) localStorage.setItem("userId", userId);

    window.dispatchEvent(new Event("roleChange"));

    // IMPORTANT: return after navigate
    if (role === "contractor") {
      navigate("/contractor/dashboard");
      return;
    }

    if (role === "site_manager") {
      navigate("/site_manager/dashboard");
      return;
    }

    setError("Unknown role");
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    setError("Invalid email or password");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <div className="flex justify-center"><img className="size-8 mb-3" src="../public/image.png" alt="logo" /></div>
          <h1 className="text-2xl font-bold text-gray-800">ToolTrace</h1>
          <p className="text-sm text-gray-500 mb-7">
            Construction Tool Management
          </p>
        

        {/* Sign in */}
        <h2 className="text-xl font-bold text-gray-800 mb-1 ">
          Sign in
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your credentials to access your account
        </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="you@company.com"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="••••••••"
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign in
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">
            {error}
          </p>
        )}

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Register your company
          </a>
        </p>
      </div>
    </div>
  );
}
