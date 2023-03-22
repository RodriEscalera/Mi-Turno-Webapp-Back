"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.getLastBooking = exports.createBooking = exports.getBookingOfUser = exports.getAllBookings = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const Branch_1 = __importDefault(require("../models/Branch"));
const getAllBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBookings = yield Booking_1.default.find({});
        res.send(allBookings);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});
exports.getAllBookings = getAllBookings;
const getBookingOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = req.params.user;
        const turnos = yield Booking_1.default.find({ user: idUser }).populate("branch");
        res.status(200).send(turnos);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ message: "Hubo un error al obtener los turnos del usuario." });
    }
});
exports.getBookingOfUser = getBookingOfUser;
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branch, user, time, date, fullName, phone, email } = req.body;
    const today = new Date();
    const createdAt = today.toLocaleString("es-AR");
    const findBranch = yield Branch_1.default.findById(branch);
    if (!findBranch)
        return res.sendStatus(400);
    const newBooking = new Booking_1.default({
        branch,
        user,
        fullName,
        email,
        phone,
        date,
        time,
        createdAt,
    });
    yield newBooking.save();
    res.send(newBooking);
});
exports.createBooking = createBooking;
const getLastBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const bookings = yield Booking_1.default.find({ user: userId })
            .sort({
            createdAt: "desc",
        })
            .populate("branch");
        res.send(bookings[0]);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});
exports.getLastBooking = getLastBooking;
//new
const updateBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { branch, user, time, date, fullName, phone, email } = req.body;
    try {
        const booking = yield Booking_1.default.findById(id);
        if (!booking) {
            res.status(404).json({ message: "Booking not found" });
            return;
        }
        booking.branch = branch;
        booking.user = user;
        booking.time = time;
        booking.date = date;
        booking.fullName = fullName;
        booking.phone = phone;
        booking.email = email;
        yield booking.save();
        res.json(booking);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating booking" });
    }
});
exports.updateBooking = updateBooking;
const deleteBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const booking = yield Booking_1.default.findByIdAndDelete(id);
        if (!booking) {
            res.status(404).json({ message: "Booking not found" });
            return;
        }
        res.json(booking);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting booking" });
    }
});
exports.deleteBooking = deleteBooking;
