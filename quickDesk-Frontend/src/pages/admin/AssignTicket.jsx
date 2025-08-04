import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function AssignTicket() {
  const [tickets, setTickets] = useState([]);
  const [agents, setAgents] = useState([]);

  const fetch = async () => {
    const [ticketRes, agentRes] = await Promise.all([
      axios.get("/tickets?status=Open"),
      axios.get("/auth/users?role=agent"),
    ]);
    setTickets(ticketRes.data);
    setAgents(agentRes.data);
  };

  const assign = async (ticketId, agentId) => {
    await axios.put("/tickets/assign", { ticketId, agentId });
    fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Assign Tickets to Agents</h2>
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket._id} className="bg-white shadow p-4 rounded">
            <p className="font-semibold">{ticket.subject}</p>
            <select
              onChange={(e) => assign(ticket._id, e.target.value)}
              className="mt-2 border px-3 py-2 rounded"
              defaultValue=""
            >
              <option disabled value="">
                -- Select Agent --
              </option>
              {agents.map((a) => (
                <option key={a._id} value={a._id}>
                  {a.name} ({a.email})
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
