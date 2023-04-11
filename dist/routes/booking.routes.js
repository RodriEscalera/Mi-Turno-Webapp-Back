"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingControllers_1 = require("../controllers/bookingControllers");
const router = express_1.default.Router();
//routes
router.post("/createBooking", bookingControllers_1.createBooking);
router.get("/getBookingOfUser/:user", bookingControllers_1.getBookingOfUser);
router.get("/getAllBookings", bookingControllers_1.getAllBookings);
router.get("/getOneBooking/:id", bookingControllers_1.getOneBooking);
router.get("/getLastBooking/:userId", bookingControllers_1.getLastBooking);
router.put("/updateBooking/:id", bookingControllers_1.updateBooking);
router.put("/updateBookingAvailability/:id", bookingControllers_1.updateBookingAvailability);
router.delete("/deleteBooking/:id", bookingControllers_1.deleteBooking);
router.post("/getSoldOutBookingPerMonth", bookingControllers_1.getSoldOutBookingPerMonth);
router.post("/getScheduleOfBooking", bookingControllers_1.getScheduleOfBooking);
exports.default = router;
