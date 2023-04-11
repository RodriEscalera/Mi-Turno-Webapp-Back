"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailChangePassword = exports.sendRegisterEmail = void 0;
const functions_1 = require("../utils/functions");
const nodemailer_1 = require("../config/nodemailer");
let handlebars = require("handlebars");
const sendRegisterEmail = (user) => {
    (0, functions_1.readHTMLFile)(__dirname + "/../utils/emailTemplates/register.html", function (err, html) {
        if (err) {
            console.log("error reading file", err);
            return;
        }
        let template = handlebars.compile(html);
        let replacements = {
            userName: user.fullName,
        };
        let htmlToSend = template(replacements);
        let mailOptions = {
            from: '"Te damos la bienvenida a Mi Turno WebApp! ⏰🚀" <mi.turno.wepapp.mails.23@gmail.com>',
            to: user.email,
            subject: "Registro completado!",
            html: htmlToSend,
        };
        nodemailer_1.transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            }
        });
    });
};
exports.sendRegisterEmail = sendRegisterEmail;
const sendMailChangePassword = (user, token) => {
    (0, functions_1.readHTMLFile)(__dirname + "/../utils/emailTemplates/changePassword.html", function (err, html) {
        if (err) {
            console.log("error reading file", err);
            return;
        }
        let template = handlebars.compile(html);
        let replacements = {
            userName: user.fullName,
            id: user._id,
            token: token,
        };
        let htmlToSend = template(replacements);
        let mailOptions = {
            from: '"Cambio de contraseña" <mi.turno.wepapp.mails.23@gmail.com>',
            to: user.email,
            subject: "Cambio de contraseña",
            html: htmlToSend,
        };
        nodemailer_1.transporter.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            }
        });
    });
};
exports.sendMailChangePassword = sendMailChangePassword;
