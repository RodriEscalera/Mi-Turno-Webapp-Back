const nodemailer = require("nodemailer");
require("dotenv").config();
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.NODE_MAILER_USER, // generated ethereal user
    pass: process.env.NODE_MAILER_PASS, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Ready for send emails!");
  })
  .catch((err: any) => {
    console.log(err, "Not ready for send emails :(");
  });
