import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  getAllStaff,
  getDetailStaff,
  addStaff,
  updateStaff,
  deleteStaff,
} from "../controllers/staffController.js";
const router = express.Router();

/* READ */
router.get("/", getAllStaff);
//http://localhost:3005/staff/getAllStaff
/* READ */
router.get("/:id", verifyToken, getDetailStaff);
/* CREATE */
router.post("/add", verifyToken, addStaff);
/* UPDATE */
router.patch("/:id", verifyToken, updateStaff);

/* DELETE */
router.delete("/:id", verifyToken, deleteStaff);
export default router;
