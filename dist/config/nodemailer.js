"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer = require("nodemailer");
require("dotenv").config();
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false,
    },
});
exports.transporter
    .verify()
    .then(() => {
    console.log("Ready for send emails!");
})
    .catch((err) => {
    console.log(err, "Not ready for send emails :(");
});
