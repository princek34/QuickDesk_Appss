import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

export default function TicketDetails() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTicket = async () => {
    try {
      const res = await axios.get(`/tickets/${id}`);
      setTicket(res.data);
      setStatus(res.data.status);
    } catch {
      alert("Failed to load ticket");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async () => {
    await axios.put(`/tickets/${id}/status`, { status });
    fetchTicket();
  };

  const addComment = async () => {
    await axios.post(`/tickets/${id}/comment`, { text: comment });
    setComment("");
    fetchTicket();
  };

  useEffect(() => {
    fetchTicket();
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (!ticket) return <p className="p-4">Ticket not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-blue-700">{ticket.subject}</h2>
      <p className="text-gray-600">{ticket.description}</p>
      <p className="text-sm text-gray-500 mt-2">Category: {ticket.category}</p>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">Update Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="mt-1 border rounded px-3 py-2"
        >
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>
        <button onClick={updateStatus} className="ml-3 px-4 py-2 bg-blue-600 text-white rounded">
          Update
        </button>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Comments</h3>
        <ul className="space-y-2 mb-3">
          {ticket.comments?.map((c, i) => (
            <li key={i} className="bg-gray-100 p-2 rounded">
              <span className="text-sm font-medium">{c.user?.name || "Agent"}:</span>{" "}
              {c.text}
            </li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border px-3 py-2 rounded w-full mb-2"
        />
        <button onClick={addComment} className="px-4 py-2 bg-green-600 text-white rounded">
          Add Comment
        </button>
      </div>
    </div>
  );
}
