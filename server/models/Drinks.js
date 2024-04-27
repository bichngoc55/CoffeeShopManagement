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

    Description: {
      type: String,
      default: "",
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
      type: String,
      default: [],
      enum: ["Coffee", "Juice", "Tea", "Milk based", "Topping"],
    },
  },
  { timestamps: true }
);

const Drinks = mongoose.model("Drinks", DrinkSchema);

export default Drinks;
