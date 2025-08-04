import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateTicket() {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("subject", subject);
    formData.append("description", description);
    formData.append("category", category);
    if (file) formData.append("attachment", file);

    try {
      await axios.post("/tickets", formData);
      alert("Ticket created!");
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to create ticket");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Create New Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded h-32 resize-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="Technical">Technical</option>
            <option value="Billing">Billing</option>
            <option value="General">General</option>
          </select>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
