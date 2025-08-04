import Ticket from "../models/Ticket.js";
import path from "path";
import fs from "fs";

// ✅ Create a new ticket
export const createTicket = async (req, res) => {
  try {
    const { subject, description, category } = req.body;
    const file = req.file?.filename;

    const ticket = await Ticket.create({
      subject,
      description,
      category,
      attachment: file || null,
      user: req.user.id,
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Ticket creation failed", error: err.message });
  }
};

// ✅ Get all tickets created by current user
export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).sort({ updatedAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};

// ✅ Get all tickets (for agent/admin), with user + assignedTo populated
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("user", "name email")          // user who created the ticket
      .populate("assignedTo", "name email")    // agent assigned (if any)
      .sort({ updatedAt: -1 });

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};

// ✅ Update status of a ticket (admin/agent)
export const updateTicketStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = ["Open", "In Progress", "Resolved", "Closed"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updated = await Ticket.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

// ✅ Vote on a ticket (upvote/downvote)
export const voteTicket = async (req, res) => {
  const { id } = req.params;
  const { type } = req.body; // "upvote" or "downvote"

  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (type === "upvote") ticket.upvotes++;
    else if (type === "downvote") ticket.downvotes++;
    else return res.status(400).json({ message: "Invalid vote type" });

    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Vote failed" });
  }
};

//assign ticked to agent 

export const assignTicketToAgent = async (req, res) => {
  try {
    const { ticketId, agentId } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(
      ticketId,
      { assignedTo: agentId, status: "In Progress" },
      { new: true }
    ).populate("assignedTo", "name email");
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Failed to assign ticket" });
  }
};
   // getting ticket details 
export const getTicketDetails = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("user", "name email")
      .populate("assignedTo", "name email")
      .populate("comments.user", "name");
    res.json(ticket);
  } catch {
    res.status(404).json({ message: "Ticket not found" });
  }
};


// comment system  
export const addComment = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    ticket.comments.push({ user: req.user.id, text: req.body.text });
    await ticket.save();
    res.status(201).json(ticket);
  } catch {
    res.status(500).json({ message: "Could not add comment" });
  }
};
