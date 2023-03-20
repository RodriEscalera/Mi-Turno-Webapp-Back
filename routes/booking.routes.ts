import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingOfUser,
} from "../controllers/bookingControllers";
const router = express.Router();

router.post("/createBooking", createBooking);
router.get("/getBookingOfUser/:user", getBookingOfUser);
router.get("/getAllBookings", getAllBookings);

export default router;
