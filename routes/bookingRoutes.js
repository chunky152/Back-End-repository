import express from "express";
import { createBooking, getAllBookings, updateBookingStatus } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/create", createBooking);
router.get("/", getAllBookings);
router.put("/:bookingId/status", updateBookingStatus);

export default router;