import mongoose from "mongoose";
const { Schema } = mongoose;

const billSchema = new mongoose.Schema(
  {
    items: [
      {
        drink: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Drinks",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        percentOfSugar: {
          type: String,
          enum: ["30", "50", "100", ""],
        },
        size: {
          type: String,
          enum: ["S", "M", "L", ""],
        },
        hotOrCold: {
          type: String,
          enum: ["hot", "cold", ""],
        },

        percentOfIce: {
          type: String,
          enum: ["0", "50", "100", ""],
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },
    PaymentMethod: {
      type: String,
      required: true,
      enum: ["Cash", "Card", "Digital"],
    },
    TableNo: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    Staff: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    PhuThu: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Bill = mongoose.model("Bill", billSchema);

export default Bill;
