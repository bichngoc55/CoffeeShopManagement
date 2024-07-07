import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  getAllIngredients,
  updateIngredient,
  createIngredient,
  getDetailIngredient,
  deleteIngredient,
  ktraGanHetHan
} from "../controllers/inventoryController.js";
const router = express.Router();

/* READ */
router.get("/", getAllIngredients);
/* READ */
router.get("/expired", verifyToken, ktraGanHetHan);
/* CREATE */
router.post("/add", verifyToken, createIngredient);
/* READ */
router.get("/:ingredientId", verifyToken, getDetailIngredient);
/* UPDATE */
router.patch("/:id", updateIngredient);
/* DELETE */
router.delete("/:id", verifyToken, deleteIngredient);
export default router;
