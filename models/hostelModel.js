import mongoose from "mongoose";

const hostelSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  roomsAvailable: { type: Number, required: true },
  pricePerRoom: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Hostels", hostelSchema);