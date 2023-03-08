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
exports.seedBooking = void 0;
const mongoose = require("mongoose");
const Booking_1 = __importDefault(require("../models/Booking"));
//seed turnos
const turnos = [
    {
        reservationDate: "13:00hs",
        email: "Turnos@Booking.com",
        password: "IsBooking@1234",
        phone: "12345667",
        fullName: "usuario 1"
    },
    {
        reservationDate: "13:30hs",
        email: "Turnos@Booking.com",
        password: "IsBooking@1234",
        phone: "12345667",
        fullName: "usuario 24"
    }, {
        reservationDate: "14:00hs",
        email: "Turnos@Booking.com",
        password: "IsBooking@1234",
        phone: "12345667",
        fullName: "usuario 18"
    }, {
        reservationDate: "14:30hs",
        email: "Turnos@Booking.com",
        password: "IsBooking@1234",
        phone: "12345675667",
        fullName: "usuario 5"
    }, {
        reservationDate: "15:00hs",
        email: "Turnos@Booking.com",
        password: "IsBooking@1234",
        phone: "12312345667",
        fullName: "usuario 20"
    }, {
        reservationDate: "15:30hs",
        email: "Turnos@Booking.com",
        password: "IsBooking@1234",
        phone: "123452345667",
        fullName: "usuario 21"
    }, {
        reservationDate: "16:00hs",
        email: "Turnos@Booking.com",
        password: "IsBooking@1234",
        phone: "12345123667",
        fullName: "usuario 12"
    }, {
        reservationDate: "16:30hs",
        email: "Turnos@Booking.com",
        password: "IsBooking@1234",
        phone: "12345457667",
        fullName: "usuario 8"
    }, {
        reservationDate: "17:00hs",
        email: "Turnos@Booking.com",
        password: "IsBooking@1234",
        phone: "12345532667",
        fullName: "usuario 17"
    }, {
        reservationDate: "17:30hs",
        email: "Turnos@Booking.com",
        password: "IsBooking@1234",
        phone: "12312345667",
        fullName: "usuario 6"
    }, {
        reservationDate: "18:00hs",
        email: "Turnos@Booking.com",
        password: "IsBooking@1234",
        phone: "123452560067",
        fullName: "usuario 22"
    }, {
        reservationDate: "18:30hs",
        email: "Turnos@Booking.com",
        password: "IsBooking@1234",
        phone: "120034535667",
        fullName: "usuario 13"
    }, {
        reservationDate: "19:00hs",
        email: "Turnos@Booking.com",
        password: "IsBooking@1234",
        phone: "123456100167",
        fullName: "usuario 1"
    }
];
const seedBooking = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Booking_1.default.deleteMany();
        function createBooking() {
            return __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < turnos.length; i++) {
                    let booking = new Booking_1.default(turnos[i]);
                    booking.save();
                }
            });
        }
        createBooking();
        console.log("Booking seed successful!");
    }
    catch (e) {
        console.error(e);
    }
});
exports.seedBooking = seedBooking;
/* mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://localhost/mi-turno-webapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    seedBooking().then(() => console.log('booking seeded successfully')).catch(console.error);
  })
  .catch(() => {
    console.log("Couldn't connect with the booking seeder :(");
  }); */
