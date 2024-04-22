import mongoose from "mongoose";
const { Schema } = mongoose;

const DrinkSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
      min: 5,
      max: 70,
    },
    percentOfSugar: {
      type: Number,
      default: 100,
    },
    Description: {
      type: String,
      default: "",
    },
    Size: {
      type: Array,
      enum: ["S", "L"],
    },
    Price: {
      type: Number,
      required: true,
    },
    Photo: {
      type: String,
      default: "",
      required: true,
    },

    LoaiDoUong: {
      type: Array,
      enum: ["Coffee", "Juice", "Tea", "Milk based", "Topping"],
    },
  },
  { timestamps: true }
);

const Drinks = mongoose.model("Drinks", DrinkSchema);

export default Drinks;
