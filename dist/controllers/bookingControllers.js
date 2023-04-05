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
exports.getScheduleOfBooking = exports.getSoldOutBookingPerMonth = exports.deleteBooking = exports.updateBooking = exports.getLastBooking = exports.createBooking = exports.getBookingOfUser = exports.getAllBookings = exports.getOneBooking = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
const Branch_1 = __importDefault(require("../models/Branch"));
const functions_1 = require("../utils/functions");
const getOneBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findBooking = yield Booking_1.default.findById(id).populate("branch");
        if (findBooking) {
            res.status(200).send(findBooking);
        }
        else {
            res.status(404).json({ message: "Turno no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el turno" });
    }
});
exports.getOneBooking = getOneBooking;
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
//
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branch, user, time, date, fullName, phone, email } = req.body;
    console.log(req.body);
    const today = new Date();
    const createdAt = today.toLocaleString("es-AR");
    const findBranch = yield Branch_1.default.findById(branch);
    if (!findBranch)
        return res.sendStatus(400);
    const exists = yield Booking_1.default.findOne({ branch, date, time });
    if (exists) {
        console.log("este turno ya existe, mira:", exists);
        return res.sendStatus(400);
    }
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
    yield (findBranch === null || findBranch === void 0 ? void 0 : findBranch.updateOne({
        booking: [...findBranch.booking, newBooking === null || newBooking === void 0 ? void 0 : newBooking._id],
    }));
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
    try {
        const { id } = req.params;
        const { branch, user, time, date, fullName, phone, email } = req.body;
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
const getSoldOutBookingPerMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, branch } = req.body;
        const month = date.split("-")[1];
        const bookings = yield Booking_1.default.find({
            date: { $regex: `-${month}-` },
            branch: branch,
        });
        const findBranch = yield Branch_1.default.findById(branch);
        console.log(findBranch);
        const reserves = bookings.map((element) => element.date);
        const toShow = (0, functions_1.countWordOccurrences)(reserves);
        const soldOut = [];
        toShow.forEach((element) => {
            for (const key in element) {
                if (element[key] >= 8) {
                    soldOut.push(key);
                }
            }
        });
        console.log(soldOut);
        res.send(soldOut);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});
exports.getSoldOutBookingPerMonth = getSoldOutBookingPerMonth;
const getScheduleOfBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, branch } = req.body;
        const bookings = yield Booking_1.default.find({ date, branch });
        const returning = bookings.map((element) => element.time);
        res.send(returning);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});
exports.getScheduleOfBooking = getScheduleOfBooking;
