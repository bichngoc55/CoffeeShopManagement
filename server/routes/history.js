import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  getAllOrder,
  getDetailOrder,
  createBill,
  deleteBill,
  updateBill,
} from "../controllers/historyController.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllOrder);

/* READ */
router.get("/:id", verifyToken, getDetailOrder);
/* CREATE */
router.post("/add", createBill);
/* UPDATE */
router.patch("/:id", verifyToken, updateBill);

/* DELETE */
router.delete("/:id", verifyToken, deleteBill);
export default router;
