import express from "express";
import {
  login,
  register,
  refresh,
  forgotPassword,
} from "../controllers/authController.js";

const router = express.Router();
router.post("/register", register);

router.post("/login", login);
// /auth/login
// REFRESH
router.post("/refresh", refresh);
router.post("/forgotPassword", forgotPassword);

export default router;
// MVC
