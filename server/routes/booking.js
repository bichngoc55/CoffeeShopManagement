import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  getAllBooking,
  getDetailBooking,
  addBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/bookingController.js";
const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllBooking);
router.get("/:id", verifyToken, getDetailBooking);

/* CREATE */
router.post("/add", addBooking);

/* UPDATE */
router.patch("/:id", verifyToken, updateBooking);

/* DELETE */
router.delete("/:id", verifyToken, deleteBooking);

export default router;
