import mongoose from "mongoose";
const { Schema } = mongoose;

const billSchema = new mongoose.Schema({
  items: [
    {
      drinkName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  notes: [
    {
      percentOfSugar: {
        type: Number,
        default: 100,
        enum: [0, 50, 80, 100],
      },
      size: {
        type: String,
        default: [],
        enum: ["S", "M", "L"],
      },
      hotOrCold: {
        type: String,
        default: [],
        enum: ["Hot", "Cold"],
      },

      percentOfIce: {
        type: Number,
        default: 100,
        enum: [0, 50, 80, 100],
      },
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
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
});

const Bill = mongoose.model("Bill", billSchema);

export default Bill;
