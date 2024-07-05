import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
import {
    getDetailContent,
    updateContent,
} from "../controllers/homeContentController.js";

import { checkAdmin } from "../middlewares/isStaffMiddleware.js";
const router = express.Router();

/* READ */
router.get("/:id", verifyToken,  getDetailContent);
/* UPDATE */
router.patch("/:id/content", verifyToken,  updateContent);
export default router;
