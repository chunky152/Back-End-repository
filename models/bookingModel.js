import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  hostelName: { type: String, required: true, trim: true },
  roomNumber: { type: String, required: true, trim: true },
  duration: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
}, { timestamps: true });

export default mongoose.model("Bookings", bookingSchema);
