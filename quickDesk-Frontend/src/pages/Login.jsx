import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaLock, FaEnvelope } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      login(res.data);

      // Redirect based on role
      const role = res.data.user?.role;
      if (role === "admin") navigate("/admin");
      else if (role === "agent") navigate("/agent");
      else navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4">
      <div
        className="w-full max-w-md p-8 rounded-3xl shadow-xl bg-white bg-opacity-80 backdrop-blur-md animate-fade-in"
      >
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold shadow">
            Q
          </div>
          <h2 className="mt-4 text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-sm text-gray-500">Login to continue to QuickDesk</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                <FaEnvelope />
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 rounded-md border shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                <FaLock />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2 rounded-md border shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
