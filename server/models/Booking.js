import mongoose from "mongoose";
import { Time } from "mongoose-time";

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  tableNumber: {
    type: Number,
    required: true,
  },
  bookingDate: {
    type: Date,
  },
  bookingTime: {
    type: Time,
    required: true,

  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
  phoneNumberBooking: {
    type: String,
  },
  note: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["available", "occupied", "booked"],
    default: "Chờ xác nhận",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
