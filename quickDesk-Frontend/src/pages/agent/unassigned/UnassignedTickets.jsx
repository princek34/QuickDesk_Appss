// pages/agent/UnassignedTickets.jsx
import { useEffect, useState } from "react";
import axios from "../../../api/axios";

export default function UnassignedTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get("/tickets/unassigned").then((res) => setTickets(res.data));
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🕓 Unassigned Tickets</h2>
      {tickets.length === 0 ? (
        <p className="text-gray-500">No unassigned tickets available.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{ticket.subject}</h3>
              <p className="text-sm text-gray-600 mb-2">{ticket.description}</p>
              <p className="text-xs text-gray-400">Category: {ticket.category}</p>
              {/* Optional: Assign button */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
