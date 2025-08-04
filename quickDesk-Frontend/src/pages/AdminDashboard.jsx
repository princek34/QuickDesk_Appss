import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { Users, FolderKanban, ClipboardList } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Manage Users",
      description: "Create, edit, or remove users and assign roles.",
      icon: <Users className="w-6 h-6 text-indigo-400" />,
      action: () => navigate("/admin/users"),
    },
    {
      title: "Manage Categories",
      description: "Add or update ticket categories.",
      icon: <FolderKanban className="w-6 h-6 text-pink-400" />,
      action: () => navigate("/admin/categories"),
    },
    {
      title: "View All Tickets",
      description: "Browse all tickets and assign to agents.",
      icon: <ClipboardList className="w-6 h-6 text-green-400" />,
      action: () => navigate("/admin/view-all-tickets"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage users, categories, and tickets from here.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/10 border border-white/10 text-white p-6 rounded-xl shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                {card.icon}
                <h2 className="text-xl font-semibold">{card.title}</h2>
              </div>
              <p className="text-sm text-gray-300 mb-6">{card.description}</p>
              <button
                onClick={card.action}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-4 py-2 rounded-full text-white font-semibold transition duration-300"
              >
                Go
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-right">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
