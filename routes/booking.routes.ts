import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingOfUser,
} from "../controllers/bookingControllers";
const router = express.Router();

//routes
router.post("/createBooking", createBooking);
router.get("/getBookingOfUser/:user", getBookingOfUser);
router.get("/getAllBookings", getAllBookings);
router.put("/createBooking", createBooking);
router.delete("/deleteBooking", deleteBooking);

export default router;
