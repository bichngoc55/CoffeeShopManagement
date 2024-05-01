import { verifyToken } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  getAllTopping,
  getDetailTopping,
  createIngredient,
  updateTopping,
  deleteTopping,
} from "../controllers/toppingController.js";

import { checkAdmin } from "../middlewares/isStaffMiddleware.js";
const router = express.Router();

/* READ */
router.get("/", getAllTopping);
/* READ */
router.get("/:id", verifyToken, getDetailTopping);
/* CREATE */
router.post("/add", createIngredient);
/* UPDATE */
router.patch("/:id", verifyToken, checkAdmin, updateTopping);

/* DELETE */
router.delete("/:id", verifyToken, checkAdmin, deleteTopping);
export default router;
