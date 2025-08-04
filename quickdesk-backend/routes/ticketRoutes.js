import express from "express";
import multer from "multer";
import path from "path";

import { protect, restrictTo } from "../middleware/auth.js";
import {
  createTicket,
  getMyTickets,
  getAllTickets,
  updateTicketStatus,
  voteTicket,
  assignTicketToAgent,
  getTicketDetails,
  addComment,
} from "../controllers/ticketController.js";

import { verifyAgentOrAdmin } from "../middleware/roleMiddleware.js"; // You must create this if not exists

const router = express.Router();

// 🖼️ Multer config for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// 🎫 Ticket routes
router.post("/", protect, upload.single("attachment"), createTicket);
router.get("/my", protect, getMyTickets);
router.get("/", protect, restrictTo("agent", "admin"), getAllTickets);

router.patch("/:id/status", protect, restrictTo("agent", "admin"), updateTicketStatus);
router.post("/:id/vote", protect, voteTicket);

// 🧑‍💼 Admin route to assign tickets
router.put("/assign", protect, restrictTo("admin"), assignTicketToAgent);

// 🔍 View full ticket (admin/agent)
router.get("/:id", protect, restrictTo("admin", "agent"), getTicketDetails);

// 💬 Comment/reply on ticket
router.post("/:id/comment", protect, restrictTo("admin", "agent"), addComment);

export default router;
