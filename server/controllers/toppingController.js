import Topping from "../models/Topping.js";
// Get all toppings
const getAllTopping = async (req, res) => {
  try {
    const toppings = await Topping.find();
    res.status(200).json(toppings);
  } catch (error) {
    res.status(500).json({ error: "Failed to get toppings" });
  }
};

// Get a single topping by ID
const getDetailTopping = async (req, res) => {
  try {
    const topping = await Topping.findById(req.params.id);
    if (!topping) {
      return res.status(404).json({ error: "Topping not found" });
    }
    res.status(200).json(topping);
  } catch (error) {
    res.status(500).json({ error: "Failed to get topping" });
  }
};

// Create a new topping
const createIngredient = async (req, res) => {
  try {
    const newTopping = new Topping(req.body);
    const savedTopping = await newTopping.save();
    res.status(201).json(savedTopping);
  } catch (error) {
    res.status(500).json({ error: "Failed to create topping" });
  }
};

// Update a topping by ID
const updateTopping = async (req, res) => {
  try {
    const updatedTopping = await Topping.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTopping) {
      return res.status(404).json({ error: "Topping not found" });
    }
    res.status(200).json(updatedTopping);
  } catch (error) {
    res.status(500).json({ error: "Failed to update topping" });
  }
};

// Delete a topping by ID
const deleteTopping = async (req, res) => {
  try {
    const deletedTopping = await Topping.findByIdAndDelete(req.params.id);
    if (!deletedTopping) {
      return res.status(404).json({ error: "Topping not found" });
    }
    res.status(200).json({ message: "Topping deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete topping" });
  }
};

export {
  getAllTopping,
  getDetailTopping,
  createIngredient,
  updateTopping,
  deleteTopping,
};
