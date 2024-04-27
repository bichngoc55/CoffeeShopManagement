import mongoose from "mongoose";
const { Schema } = mongoose;

const billSchema = new mongoose.Schema({
  customerName: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  items: [
    {
      drink: {
        type: Schema.Types.ObjectId,
        ref: "Drinks",
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
      topping: {
        type: String,
        default: [],
        enum: [
          "Tran chau trang",
          "Tran chau den",
          "Pho mai vien",
          "Suong sao",
          "Kem trung",
          "Thach dua",
        ],
      },
      percentOfIce: {
        type: Number,
        default: 100,
        enum: [0, 50, 80, 100],
      },
      additionalNote: {
        type: String,
        default: "",
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
    type: Number,
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
