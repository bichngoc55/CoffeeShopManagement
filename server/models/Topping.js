import mongoose from "mongoose";
const { Schema } = mongoose;

const toppingSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
      enum: [
        "Tran chau den",
        "Tran chau trang",
        "Suong sao",
        "Pho mai vien",
        "Kem trung",
        "Thach dua",
      ],
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
  },
  { timestamps: true }
);

const Topping = mongoose.model("Topping", toppingSchema);

export default Topping;
