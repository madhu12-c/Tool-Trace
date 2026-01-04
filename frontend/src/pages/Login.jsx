import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import SiteManagerDashboard from "./SiteManagerDashboard";

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

    const { role, contractorId, siteId } = res.data;

    localStorage.setItem("role", role);
    if (contractorId) localStorage.setItem("contractorId", contractorId);
    if (siteId) localStorage.setItem("siteId", siteId);

    // IMPORTANT: return after navigate
    if (role === "contractor") {
      navigate("/contractor");
      return;
    }

    if (role === "site_manager") {
      navigate("/site_manager");
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
          <div className="text-3xl">🏗️</div>
          <h1 className="text-2xl font-bold text-gray-800">ToolTrace</h1>
          <p className="text-sm text-gray-500">
            Construction Tool Management
          </p>
        </div>

        {/* Sign in */}
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Sign in
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your credentials to access your account
        </p>

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

          {/* Demo credentials */}
          <div className="bg-gray-100 text-sm rounded-md p-3 text-gray-700">
            <p className="font-medium mb-1">Demo Credentials</p>
            <p>Contractor: contractor@test.com / 123456</p>
            <p>Site Manager: manager@test.com / 123456</p>
          </div>

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
