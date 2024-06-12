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
router.get("/", getAllOrder);

/* READ */
router.get("/:id", getDetailOrder);
/* CREATE */
router.post("/add", createBill);
/* UPDATE */
router.patch("/:id", updateBill);

/* DELETE */
router.delete("/:id", deleteBill);
export default router;
