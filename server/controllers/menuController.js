import Drinks from "../models/Drinks.js";
// Get all bookings
const getAllMenus = async (req, res) => {
  try {
    const menus = await Drinks.find();
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ error: "Failed to get menus" });
  }
};

// Get booking details
const getDetailMenu = async (req, res) => {
  try {
    const menu = await Drinks.findById(req.params.id);
    if (!menu) {
      return res.status(404).json({ error: "Menu not found" });
    }
    res.status(200).json(menu);
  } catch (error) {
    res.status(500).json({ error: "Failed to get menu details" });
  }
};

// Update a Menu
const updateMenu = async (req, res) => {
  try {
    const drink = await Drinks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!drink) {
      return res.status(404).json({ error: "drink not found" });
    }
    res.status(200).json(drink);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Menu" });
  }
};

// Add a new Menu
const addDrink = async (req, res) => {
  try {
    console.log("req.body : ", req.body);
    const drink = new Drinks(req.body);
    await drink.save();
    res.status(201).json(drink);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Menu
const deleteDrink = async (req, res) => {
  try {
    const drink = await Drinks.findByIdAndDelete(req.params.id);
    if (!drink) {
      return res.status(404).json({ error: "drink not found" });
    }
    res.status(200).json({ message: "Drink deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete drink" });
  }
};

export { getAllMenus, getDetailMenu, updateMenu, addDrink, deleteDrink };
