import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useAuth } from "../../../context/AuthContext";

export default function AllTickets() {
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token, user } = useAuth();

  // ✅ Fetch all tickets
  useEffect(() => {
    axios
      .get("/tickets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTickets(res.data))
      .finally(() => setLoading(false));
  }, [token]);

  // ✅ Fetch agents (for admin only)
  useEffect(() => {
    if (user?.role === "admin") {
      axios
        .get("/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const onlyAgents = res.data.filter((u) => u.role === "agent");
          setAgents(onlyAgents);
        });
    }
  }, [token, user]);

  // ✅ Update ticket status
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `/tickets/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTickets((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status } : t))
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  // ✅ Assign agent to ticket
  const assignAgent = async (ticketId, agentId) => {
    try {
      const res = await axios.put(
        "/tickets/assign",
        { ticketId, agentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the assigned agent in UI
      setTickets((prev) =>
        prev.map((t) =>
          t._id === ticketId ? { ...t, assignedTo: res.data.assignedTo } : t
        )
      );
    } catch (err) {
      alert("Failed to assign ticket");
    }
  };

  const statuses = ["Open", "In Progress", "Resolved", "Closed"];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Tickets</h1>
      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <div className="grid gap-4">
          {tickets.map((ticket) => (
            <div key={ticket._id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between">
                <h2 className="font-semibold text-lg">{ticket.subject}</h2>
                <span className="text-sm text-gray-500">
                  {ticket.status}
                </span>
              </div>

              <p className="text-gray-600">{ticket.description}</p>

              <p className="text-sm text-gray-500 mt-2">
                User: {ticket.user?.name} | Email: {ticket.user?.email}
              </p>

              <p className="text-sm mt-1 text-gray-500">
                Assigned To: {ticket.assignedTo?.name || "Unassigned"}
              </p>

              {/* ✅ Change status dropdown */}
              <div className="mt-3 flex gap-2 items-center">
                <label className="text-sm font-medium">Change Status:</label>
                <select
                  className="border px-2 py-1 rounded"
                  value={ticket.status}
                  onChange={(e) => updateStatus(ticket._id, e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* ✅ Assign agent dropdown (admin only) */}
              {user?.role === "admin" && (
                <div className="mt-3 flex gap-2 items-center">
                  <label className="text-sm font-medium">Assign Agent:</label>
                  <select
                    className="border px-2 py-1 rounded"
                    value={ticket.assignedTo?._id || ""}
                    onChange={(e) =>
                      assignAgent(ticket._id, e.target.value)
                    }
                  >
                    <option value="">Select Agent</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
