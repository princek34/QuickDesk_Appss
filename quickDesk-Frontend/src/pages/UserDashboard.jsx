import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "../components/LogoutButton";
import { CircleAlert, PlusCircle } from "lucide-react";

export default function UserDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    axios
      .get("/tickets/my")
      .then((res) => setTickets(res.data))
      .catch(() => setTickets([]))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleString();

  const statusBadge = (status) => {
    const styles = {
      Open: "bg-yellow-200 text-yellow-800",
      "In Progress": "bg-blue-200 text-blue-800",
      Resolved: "bg-green-200 text-green-800",
      Closed: "bg-gray-300 text-gray-700",
    };
    return (
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full shadow-sm ${
          styles[status] || "bg-gray-200 text-gray-600"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome, {user?.name || "User"} 👋
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Here's a futuristic view of your support dashboard.
          </p>
        </header>

        <div className="mb-6">
          <a
            href="/dashboard/create"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-5 py-2 rounded-full shadow-lg transition-all duration-300"
          >
            <PlusCircle className="w-5 h-5" />
            Create New Ticket
          </a>
        </div>

        <h2 className="text-2xl font-semibold text-white mb-6">
          My Tickets
        </h2>

        {loading ? (
          <p className="text-gray-300">Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <div className="text-gray-400 flex items-center gap-2">
            <CircleAlert className="w-5 h-5" />
            No tickets found. You can create one now!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="backdrop-blur-md bg-white/10 border border-white/10 text-white p-5 rounded-xl shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-transform duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-emerald-300">
                    {ticket.subject}
                  </h3>
                  {statusBadge(ticket.status)}
                </div>
                <p className="text-sm text-gray-200 line-clamp-3">
                  {ticket.description}
                </p>

                <div className="mt-4 text-xs text-gray-400 space-y-1">
                  <p>
                    <span className="font-semibold">Category:</span>{" "}
                    {ticket.category || "Uncategorized"}
                  </p>
                  <p>
                    <span className="font-semibold">Updated:</span>{" "}
                    {formatDate(ticket.updatedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-10 text-right">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
