"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
router.post("/register", user_controller_1.register);
// router.get("/example", (req: Request, res: Response) => {
//   console.log(process.env.SECRET);
//   res.sendStatus(200);
// });
exports.default = router;
