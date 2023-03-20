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
exports.createBooking = exports.getBookingOfUser = exports.getAllBookings = void 0;
const Booking_1 = __importDefault(require("../models/Booking"));
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
        const turnos = yield Booking_1.default.find({ user: idUser })
            .populate("branch");
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
    const newBooking = new Booking_1.default({
        branch,
        user,
        fullName,
        email,
        phone,
        date,
        time,
    });
    yield newBooking.save();
    res.send(newBooking);
});
exports.createBooking = createBooking;
