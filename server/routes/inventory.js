import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  getAllIngredients,
  updateIngredient,
  createIngredient,
  getDetailIngredient,
  deleteIngredient,
} from "../controllers/inventoryController.js";
const router = express.Router();

/* READ */
router.get("/", getAllIngredients);
/* READ */
router.get("/:ingredientId", verifyToken, getDetailIngredient);
/* CREATE */
router.post("/add", createIngredient);
/* UPDATE */
router.patch("/:id", verifyToken, updateIngredient);
/* DELETE */
router.delete("/:id", verifyToken, deleteIngredient);
export default router;
