import Booking from "../models/bookingModel.js";
import Student from "../models/studentModel.js";

// Create booking
export const createBooking = async (req, res) => {
  try {
    // Accept both authenticated (studentId) and guest bookings (form fields)
    const {
      studentId,
      studentName,
      email,
      phoneNumber,
      hostelName,
      roomType,
      checkInDate,
      duration,
      paymentMethod,
      mobileNumber,
      cardNumber
    } = req.body;

    // Basic required fields from the frontend form
    if (!hostelName || !studentName || !email || !checkInDate)
      return res.status(400).json({ msg: "hostelName, studentName, email and checkInDate are required" });

    // If a studentId is provided, ensure it exists (authenticated booking)
    if (studentId) {
      const student = await Student.findById(studentId);
      if (!student) return res.status(404).json({ msg: "Student not found" });
    }

    // Parse checkInDate to Date if provided
    let parsedCheckIn = null;
    if (checkInDate) {
      parsedCheckIn = new Date(checkInDate);
      if (isNaN(parsedCheckIn.getTime())) {
        return res.status(400).json({ msg: "Invalid checkInDate" });
      }
    }

    const bookingData = {
      // link to student if available
      ...(studentId ? { student: studentId } : {}),
      studentName,
      email,
      phoneNumber,
      hostelName,
      roomType,
      checkInDate: parsedCheckIn,
      duration,
      paymentMethod,
      mobileNumber,
      cardNumber
    };

    const booking = await Booking.create(bookingData);
    res.status(201).json({ msg: "Booking created", booking });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("student", "name studentWebmail");
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
