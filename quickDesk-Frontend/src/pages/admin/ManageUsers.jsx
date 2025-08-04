import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("/auth/users");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`/auth/users/${id}`);
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="border-t">
              <td className="py-2 px-4">{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => deleteUser(u._id)} className="text-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
