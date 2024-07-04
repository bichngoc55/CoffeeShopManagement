import Booking from "../models/Booking.js";
// Get all bookings
const getAllBooking = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to get bookings" });
  }
};

// Get booking details
const getDetailBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to get booking details" });
  }
};

// Update a booking
const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Failed to update booking" });
  }
};
// Update booking schedule
const updateBookingSchedule = async (req, res) => {
  try {
    const { tableNumber, bookingId } = req.params;
    const updateData = req.body;

    const booking = await Booking.findOne({ tableNumber });

    if (!booking) {
      return res.status(404).json({ message: "Table not found" });
    }

    const bookingIndex = booking.Booking.findIndex(
      (b) => b._id.toString() === bookingId
    );

    if (bookingIndex === -1) {
      return res.status(404).json({ message: "Booking not found" });
    }

    Object.assign(booking.Booking[bookingIndex], updateData);

    await booking.save();

    res
      .status(200)
      .json({
        message: "Booking updated successfully",
        booking: booking.Booking[bookingIndex],
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating booking", error: error.message });
  }
};
// Add a new booking
const addBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addBookingSchedule = async (req, res) => {
  try {
    const { tableNumber } = req.params;
    const {
      customerName,
      bookingDate,
      bookingTime,
      numberOfPeople,
      phoneNumberBooking,
      note,
      status,
    } = req.body;

    let booking = await Booking.findOne({ tableNumber });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const newBookingEntry = {
      customerName,
      bookingDate: new Date(bookingDate),
      bookingTime,
      numberOfPeople,
      phoneNumberBooking,
      note,
      status,
    };

    booking.Booking.push(newBookingEntry);
    await booking.save();

    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch (error) {
    console.error("Error updating booking:", error);
    res
      .status(500)
      .json({ message: "Error updating booking", error: error.message });
  }
};
// Delete a booking
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete booking" });
  }
};
const deleteBookingSchedule = async (req, res) => {
  try {
    const { tableNumber, bookingId } = req.params;

    const booking = await Booking.findOne({ tableNumber });

    if (!booking) {
      return res.status(404).json({ message: "Table not found" });
    }

    const bookingIndex = booking.Booking.findIndex(
      (b) => b._id.toString() === bookingId
    );

    if (bookingIndex === -1) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.Booking.splice(bookingIndex, 1);

    await booking.save();

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting booking", error: error.message });
  }
};
export {
  getAllBooking,
  getDetailBooking,
  updateBooking,
  updateBookingSchedule,
  addBookingSchedule,
  addBooking,
  deleteBooking,
  deleteBookingSchedule,
};
