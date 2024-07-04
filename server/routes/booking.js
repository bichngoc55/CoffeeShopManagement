import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  getAllBooking,
  getDetailBooking,
  addBooking,
  updateBooking,
  updateBookingSchedule,
  deleteBooking,
  addBookingSchedule,
  deleteBookingSchedule,
} from "../controllers/bookingController.js";
const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllBooking);
router.get("/:id", verifyToken, getDetailBooking);

/* CREATE */
router.post("/add", addBooking);
router.patch("/add/:tableNumber", addBookingSchedule);

/* UPDATE */
router.patch("/:id", verifyToken, updateBooking);
router.patch("/:tableNumber/:bookingId", updateBookingSchedule);

/* DELETE */
router.delete("/:id", verifyToken, deleteBooking);
router.delete("/:tableNumber/:bookingId", deleteBookingSchedule);

export default router;
