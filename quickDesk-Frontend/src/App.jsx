import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateTicket from "./pages/CreateTicket";
import MyTickets from "./pages/agent/my-tickets/MyTickets";
import UnassignedTickets from "./pages/agent/unassigned/UnassignedTickets";
import AllTickets from "./pages/agent/all-tickets/AllTickets";

import TicketDetails from "./pages/agent/TicketDetails";
import AssignTicket from "./pages/admin/AssignTicket";
import ManageUsers from "./pages/admin/ManageUsers";
// Context & Route Protection
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";

// Optional: A fallback component for 404s
const NotFound = () => (
  <div className="p-6 text-center text-red-500 text-xl">
    404 - Page Not Found
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🌐 Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 Protected User Routes */}
          <Route element={<PrivateRoute allowedRoles={["user"]} />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/dashboard/create" element={<CreateTicket />} />
          </Route>

          {/* 🔒 Protected Agent Routes */}
          <Route element={<PrivateRoute allowedRoles={["agent"]} />}>
            <Route path="/agent" element={<AgentDashboard />} />
            <Route path="/agent/my-tickets" element={<MyTickets />} />
            <Route path="/agent/unassigned" element={<UnassignedTickets />} />
            <Route path="/agent/all-tickets" element={<AllTickets />} />
            <Route path="/agent/ticket/:id" element={<TicketDetails />} />
          </Route>

          {/* 🔒 Protected Admin Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
             <Route path="/admin/view-all-tickets" element={<AllTickets />} />
            <Route path="/admin/assign" element={<AssignTicket />} />
            <Route path="/admin/users" element={<ManageUsers />} />

          </Route>

          {/* ⚠️ 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
