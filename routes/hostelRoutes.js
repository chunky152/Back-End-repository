import express from "express";
import Hostel from "../models/hostelModel.js";
import { createHostel, getAllHostels, updateHostel, deleteHostel } from "../controllers/hostelController.js";

const router = express.Router();

// Create a new hostel
router.post("/", createHostel);

// Get all hostels
router.get("/", getAllHostels);

// Get single hostel by id
router.get("/:hostelId", async (req, res) => {
	try {
		const { hostelId } = req.params;
		const hostel = await Hostel.findById(hostelId);
		if (!hostel) return res.status(404).json({ msg: "Hostel not found" });
		res.status(200).json(hostel);
	} catch (err) {
		res.status(500).json({ msg: "Server error" });
	}
});

// Update hostel
router.put("/:hostelId", updateHostel);

// Delete hostel
router.delete("/:hostelId", deleteHostel);

export default router;