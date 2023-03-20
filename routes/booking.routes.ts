import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingOfUser,
  getLastBooking,
} from "../controllers/bookingControllers";
const router = express.Router();

router.post("/createBooking", createBooking);
router.get("/getBookingOfUser/:user", getBookingOfUser);
router.get("/getAllBookings", getAllBookings);
router.get("/getLastBooking/:userId", getLastBooking);

export default router;
