import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  getAllInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} from "../controllers/inventoryController.js";
const router = express.Router();

/* READ */
router.get("/", verifyToken, getAllInventory);
/* CREATE */
router.post("/add", addInventory);
/* UPDATE */
router.patch("/:id", verifyToken, updateInventory);
/* DELETE */
router.delete("/:id", verifyToken, deleteInventory);
export default router;
