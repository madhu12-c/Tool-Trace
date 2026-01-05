import { useState } from "react";
import api from "../api/axios";
import publicImage from "../public/image.png";

const Signup = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/users", {
        name: companyName,
        email,
        password,
        role: "contractor",
      });

      setSuccess("Company registered successfully. Please sign in.");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <div className="flex justify-center"><img className="size-8 mb-3" src={publicImage} alt="logo" /></div>
          <h1 className="text-2xl font-bold">ToolTrack</h1>
          <p className="text-sm text-gray-500">
            Construction Tool Management
          </p>
        </div>

        <h2 className="text-xl font-semibold text-center mb-1">
          Register Company
        </h2>
        <p className="text-center text-sm text-gray-500 mb-5">
          Create your contractor account
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />

          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register Company
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-sm text-center mt-3">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-sm text-center mt-3">{success}</p>
        )}

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
