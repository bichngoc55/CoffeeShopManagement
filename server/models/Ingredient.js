import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  ExpiryDate: {
    type: Date,
    required: true,
  },
  BaoQuan: {
    type: String,
    required: true,
  },
  NgayNhapKho: {
    type: Date,
    required: true,
  },
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

export default Ingredient;
