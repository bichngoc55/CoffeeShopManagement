import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
import {
    getWeekSchedule,
    updateWeekSchedule,
} from "../controllers/workScheduleController.js";

import { checkAdmin } from "../middlewares/isStaffMiddleware.js";
const router = express.Router();

/* READ */
router.get("/", getWeekSchedule);
/* UPDATE */
router.patch("/:id/week", verifyToken, updateWeekSchedule);
export default router;
