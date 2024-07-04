import mongoose from "mongoose";
const { Schema } = mongoose;
const bookingSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  Booking: [
    {
      customerName: {
        type: String,
      },
      bookingDate: {
        type: Date,
      },
      bookingTime: {
        type: String,
      },
      numberOfPeople: {
        type: Number,
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
      },
    },
  ],
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
