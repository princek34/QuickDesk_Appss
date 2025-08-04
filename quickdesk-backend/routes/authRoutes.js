import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  deleteUser,
} from "../controllers/authController.js";
import { protect, restrictTo } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Admin protected routes
router.get("/users", protect, restrictTo("admin"), getAllUsers);
router.delete("/users/:id", protect, restrictTo("admin"), deleteUser);

export default router;
