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
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const validations_1 = require("../middlewares/validations");
const nodemailer_1 = require("../config/nodemailer");
const router = express_1.default.Router();
router.post("/register", user_controller_1.register);
router.post("/login", user_controller_1.login);
router.post("/me", user_controller_1.me);
router.post("/findAll", validations_1.validateAdminAndOp, user_controller_1.findAllUsers);
router.post("/findOne/:id", validations_1.validateAdminAndOp, user_controller_1.findOneUser);
router.post("/sendmail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield nodemailer_1.transporter.sendMail({
        from: "<mi.turno.wepapp.mails.23@gmail.com>",
        to: "roescal347@gmail.com",
        subject: "Testing B)",
        html: `
    <h1>Buenas, buenas!!! Hoy amanecimossss</h1>
    `,
    });
    res.sendStatus(200);
}));
router.put("/updateUser", user_controller_1.updateUser);
exports.default = router;
