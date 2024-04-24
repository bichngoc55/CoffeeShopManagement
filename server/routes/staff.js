import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  getAllStaff,
  getDetailStaff,
  addStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staffController.js";
import { checkAdmin } from "../middlewares/isStaffMiddleware.js";
const router = express.Router();

/* READ */
router.get("/", getAllStaff);
/* READ */
router.get("/:id", verifyToken, getDetailStaff);
/* CREATE */
router.post("/add", verifyToken, checkAdmin, addStaff);
/* UPDATE */
router.patch("/:id", verifyToken, checkAdmin, updateStaff);

/* DELETE */
router.delete("/:id", verifyToken, checkAdmin, deleteStaff);
export default router;
