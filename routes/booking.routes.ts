import express from "express";
import {
  createBooking,
  deleteBooking,
  getSoldOutBookingPerMonth,
  getAllBookings,
  getBookingOfUser,
  getLastBooking,
  getOneBooking,
  updateBooking,
  getScheduleOfBooking,
} from "../controllers/bookingControllers";
const router = express.Router();

//routes
router.post("/createBooking", createBooking);
router.get("/getBookingOfUser/:user", getBookingOfUser);
router.get("/getAllBookings", getAllBookings);
router.get("/getOneBooking/:id", getOneBooking);
router.get("/getLastBooking/:userId", getLastBooking);

router.put("/updateBooking/:id", updateBooking);

router.delete("/deleteBooking/:id", deleteBooking);

router.post("/getSoldOutBookingPerMonth", getSoldOutBookingPerMonth);

router.post("/getScheduleOfBooking", getScheduleOfBooking);

export default router;
