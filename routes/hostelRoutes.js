import express from "express";
import { createHostel, getAllHostels, updateHostel, deleteHostel } from "../controllers/hostelController.js";

const router = express.Router();

router.post("/create", createHostel);
router.get("/", getAllHostels);
router.put("/:hostelId", updateHostel);
router.delete("/:hostelId", deleteHostel);

export default router;