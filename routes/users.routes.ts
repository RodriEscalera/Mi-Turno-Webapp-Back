import express, { Request, Response } from "express";
import {
  register,
  login,
  me,
  findAllUsers,
  findOneUser,
  updateUser,
} from "../controllers/user.controller";

import { validateAdminAndOp } from "../middlewares/validations";
import { transporter } from "../config/nodemailer";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/me", me);
router.post("/findAll", validateAdminAndOp, findAllUsers);
router.post("/findOne/:id", validateAdminAndOp, findOneUser);
router.post("/sendmail", async (req: Request, res: Response) => {
  await transporter.sendMail({
    from: "<mi.turno.wepapp.mails.23@gmail.com>",
    to: "roescal347@gmail.com",
    subject: "Testing B)",
    html: `
    <h1>Buenas, buenas!!! Hoy amanecimossss</h1>
    `,
  });
  res.sendStatus(200);
});
router.put("/updateUser", updateUser);

export default router;
