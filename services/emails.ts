import { readHTMLFile } from "../utils/functions";
import { transporter } from "../config/nodemailer";
let handlebars = require("handlebars");

export const sendRegisterEmail = (user: any) => {
  readHTMLFile(
    __dirname + "/../utils/emailTemplates/register.html",
    function (err, html) {
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
      transporter.sendMail(mailOptions, function (error: any, response: any) {
        if (error) {
          console.log(error);
        }
      });
    }
  );
};

export const sendMailChangePassword = (user: any, token: any) => {
  readHTMLFile(
    __dirname + "/../utils/emailTemplates/changePassword.html",
    function (err, html) {
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
      transporter.sendMail(mailOptions, function (error: any, response: any) {
        if (error) {
          console.log(error);
        }
      });
    }
  );
};
