import Booking from "../models/bookingModel.js";
import Student from "../models/studentModel.js";

// Create booking
export const createBooking = async (req, res) => {
  try {
    const { studentId, hostelName, roomNumber, duration } = req.body;
    if (!studentId || !hostelName || !roomNumber || !duration)
      return res.status(400).json({ msg: "All fields required" });

    const student = await Student.findById(studentId);
    if (!student) return res.status(404).json({ msg: "Student not found" });

    const booking = await Booking.create({ student: studentId, hostelName, roomNumber, duration });
    res.status(201).json({ msg: "Booking created", booking });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("student", "firstName lastName studentWebmail");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status))
      return res.status(400).json({ msg: "Invalid status" });

    const booking = await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
    if (!booking) return res.status(404).json({ msg: "Booking not found" });

    res.status(200).json({ msg: `Booking ${status}`, booking });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
