import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const AgentDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "My Assigned Tickets",
      description: "Work on tickets assigned to you.",
      action: () => navigate("/agent/my-tickets"),
    },
    {
      title: "Unassigned Tickets",
      description: "Pick tickets from the open queue.",
      action: () => navigate("/agent/unassigned"),
    },
    {
      title: "All Tickets",
      description: "View and manage all support tickets.",
      action: () => navigate("/agent/all-tickets"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Agent Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-indigo-600">{card.title}</h2>
              <p className="text-gray-600 mt-2">{card.description}</p>
              <button
                onClick={card.action}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Go
              </button>
            </div>
          ))}
        </div>
      </div>
       <LogoutButton />
    </div>
  );
};

export default AgentDashboard;
