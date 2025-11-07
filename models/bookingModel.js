import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: false },
  studentName: { type: String, trim: true },
  email: { type: String, trim: true, lowercase: true },
  phoneNumber: { type: String, trim: true },
  hostelName: { type: String, required: true, trim: true },
  roomType: { type: String, trim: true },
  checkInDate: { type: Date },
  paymentMethod: { type: String, enum: ["mobile-money", "card"], default: "mobile-money" },
  mobileNumber: { type: String, trim: true },
  cardNumber: { type: String, trim: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
}, { timestamps: true });

const Booking = mongoose.model("Bookings", bookingSchema);
export default Booking;
