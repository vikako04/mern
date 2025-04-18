import express from "express";
import {
  register,
  login,
  refreshToken,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validateLogin, validateRegistration } from "../middleware/validate.js";

const router = express.Router();

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);
router.post("/refresh-token", refreshToken);
router.get("/profile", protect, (req, res) => {
  const { id, username, email } = req.user;
  res.json({ id, username, email });
});

export default router;
