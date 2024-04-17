import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
import { getAllOrder, getDetailOrder } from "../controllers/orderController.js";
const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllOrder);

/* READ */
router.get("/:id", verifyToken, getDetailOrder);
// /* CREATE */
// router.post("/:id/add", verifyToken, addStaff);
// /* UPDATE */
// router.patch("/:id", verifyToken, updateStaff);

// /* DELETE */
// router.delete("/:id", verifyToken, deleteStaff);
export default router;
