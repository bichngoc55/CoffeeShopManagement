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
    required: true,
  },
  bookingTime: {
    type: Time,
    required: true,
  },
  NumberOfPeople: {
    type: Number,
    required: true,
  },
  PhoneNumberBooking: {
    type: String,
    required: true,
  },
  Note: {
    type: String,
    default: "",
  },
  Status: {
    type: String,
    default: "Chờ xác nhận",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
