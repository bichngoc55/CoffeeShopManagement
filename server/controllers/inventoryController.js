import Ingredient from "../models/Ingredient.js";

// get all ingredients
const getAllIngredients = async (req, res) => {
  try {
    const Ingredients = await Ingredient.find();
    res.status(200).json(Ingredients);
  } catch (error) {
    res.status(500).json({ error: "Failed to get Ingredients" });
  }
};
// get details ingredients
const getDetailIngredient = async (req, res) => {
  try {
    const { _id } = req.params;
    const ingredient = await Ingredient.findById(_id);
    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found" });
    }
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500).json({ error: "Failed to get Ingredient details" });
  }
};
// update an ingredient
const updateIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found" });
    }
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Ingredient" });
  }
};

// create an ingredient
const createIngredient = async (req, res) => {
  try {
    const {
      name,
      quantity,
      BaoQuan,
      unit,
      price,
      ExpiryDate,
      NgayNhapKho,
    } = req.body;

    // Validate required fields
    if (!name || !quantity || !unit || !price || !NgayNhapKho) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const ingredient = new Ingredient({
      name,
      quantity,
      BaoQuan,
      unit,
      price,
      ExpiryDate,
      NgayNhapKho,
    });

    await ingredient.save();
    res.status(201).json(ingredient);
  } catch (error) {
    console.error("Error creating ingredient:", error);
    res.status(500).json({ error: "Failed to create Ingredient" });
  }
};

// delete an ingredient
const deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!ingredient) {
      return res.status(404).json({ error: "Ingredient not found" });
    }
    res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Ingredient" });
  }
};

export const ktraGanHetHan = async (req, res) => {
  try {
    const daysThreshold = 7;

    const currentDate = new Date();
    const thresholdDate = new Date(currentDate.getTime() + daysThreshold * 24 * 60 * 60 * 1000);

    console.log(`Current Date: ${currentDate}`);
    console.log(`Threshold Date: ${thresholdDate}`);

    // Tìm các nguyên liệu có ngày hết hạn từ currentDate đến thresholdDate
    const nearlyExpiredIngredients = await Ingredient.find({
      ExpiryDate: { $gte: currentDate, $lte: thresholdDate }
    });

    res.status(200).json({
      count: nearlyExpiredIngredients.length,
      data: nearlyExpiredIngredients
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

export {
  getAllIngredients,
  updateIngredient,
  createIngredient,
  deleteIngredient,
  getDetailIngredient,
};
