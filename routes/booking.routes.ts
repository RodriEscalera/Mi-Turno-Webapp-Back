import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingOfUser,
  getLastBooking,
} from "../controllers/bookingControllers";
const router = express.Router();

//routes
router.post("/createBooking", createBooking);
router.get("/getBookingOfUser/:user", getBookingOfUser);
router.get("/getAllBookings", getAllBookings);
router.get("/getLastBooking/:userId", getLastBooking);
router.put("/createBooking", createBooking);
router.delete("/deleteBooking", deleteBooking);

export default router;
