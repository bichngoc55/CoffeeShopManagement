import express from "express";
import { login, register, refresh } from "../controllers/authController.js";

const router = express.Router();
router.post("/register", register);

router.post("/login", login);
// /auth/login
// REFRESH
router.post("/refresh", refresh);
export default router;
// MVC
