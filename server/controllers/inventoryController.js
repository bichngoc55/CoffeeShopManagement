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
    const ingredient = new Ingredient(req.body);
    await ingredient.save();
    res.status(201).json(ingredient);
  } catch (error) {
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
export {
  getAllIngredients,
  updateIngredient,
  createIngredient,
  deleteIngredient,
  getDetailIngredient,
};
