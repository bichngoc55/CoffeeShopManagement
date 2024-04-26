import express from "express";
import {
  getAllMenus,
  getDetailMenu,
  updateMenu,
  addDrink,
  deleteDrink,
} from "../controllers/menuController.js";

const router = express.Router();

/* READ */
router.get("/", getAllMenus);

/* READ */
router.get("/:id", getDetailMenu);
/* CREATE */
router.post("/add", addDrink);
/* UPDATE */
router.patch("/:id", updateMenu);
/* DELETE */
router.delete("/:id", deleteDrink);

export default router;
// MVC
