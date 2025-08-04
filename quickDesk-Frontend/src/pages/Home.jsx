import { useAuth } from "../context/AuthContext";
import { Navigate, Link } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();

  if (user) {
    if (user.role === "admin") return <Navigate to="/admin" />;
    if (user.role === "agent") return <Navigate to="/agent" />;
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to QuickDesk</h1>
      <p className="text-gray-600 text-center max-w-xl mb-6">
        A simple, powerful help desk system to streamline ticket management between customers, support agents, and admins.
      </p>

      <div className="space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
