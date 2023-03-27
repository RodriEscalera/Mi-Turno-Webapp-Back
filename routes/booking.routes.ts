import express from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookingOfUser,
  getLastBooking,
  getOneBooking,
  updateBooking,
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

export default router;
