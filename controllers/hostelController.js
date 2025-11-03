import Hostel from "../models/hostelModel.js";

// Create hostel
export const createHostel = async (req, res) => {
  try {
    const { name, location, roomsAvailable, pricePerRoom } = req.body;
    if (!name || !location || !roomsAvailable || !pricePerRoom)
      return res.status(400).json({ msg: "All fields are required" });

    const hostel = await Hostel.create({ name, location, roomsAvailable, pricePerRoom });
    res.status(201).json({ msg: "Hostel added successfully", hostel });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all hostels
export const getAllHostels = async (req, res) => {
  try {
    const hostels = await Hostel.find();
    res.status(200).json(hostels);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update hostel
export const updateHostel = async (req, res) => {
  try {
    const { hostelId } = req.params;
    const updated = await Hostel.findByIdAndUpdate(hostelId, req.body, { new: true });
    if (!updated) return res.status(404).json({ msg: "Hostel not found" });
    res.status(200).json({ msg: "Hostel updated", updated });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete hostel
export const deleteHostel = async (req, res) => {
  try {
    const { hostelId } = req.params;
    const deleted = await Hostel.findByIdAndDelete(hostelId);
    if (!deleted) return res.status(404).json({ msg: "Hostel not found" });
    res.status(200).json({ msg: "Hostel deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Default export (for modules that import the controller as a default)
export default {
  createHostel,
  getAllHostels,
  updateHostel,
  deleteHostel,
};