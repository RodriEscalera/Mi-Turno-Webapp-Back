import User from "../models/Users";
import { Request, Response } from "express";
import { generateToken, generateValidationToken } from "../config/token";
import { info } from "../config/token";
import { validateToken } from "../config/token";
import { IBranch } from "../models/Branch";
import Admin from "../models/Admin";
import { sendMailChangePassword, sendRegisterEmail } from "../services/emails";
import Branch from "../models/Branch";
export const register = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { fullName, email, password, dni } = req.body;
    const usertype = "user";
    const exists = await User.findOne({ email });
    if (exists) return res.sendStatus(400);
    const newUser = new User({
      fullName,
      email,
      password,
      dni,
      usertype,
    });
    sendRegisterEmail(newUser);
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    const user = await User.findOne({ email });
    const admin = await Admin.findOne({ email });

    const result = [user, admin];
    const resultado: any = result.filter((e) => e !== null);
    console.log(resultado[0]);
    if (!resultado[0]) return res.sendStatus(400);
    const isMatch = await resultado[0].comparePassword(password);
    if (!isMatch) return res.status(400).send("Not mached");

    if (
      resultado[0].userType === "user" ||
      resultado[0].userType === "operator"
    ) {
      const payload: info = {
        id: resultado[0]._id,
        fullName: resultado[0].fullName,
        email: resultado[0].email,
        dni: resultado[0].dni,
        phone: resultado[0].phone,
        usertype: resultado[0].usertype,
        booking: resultado[0].booking,
        branch: resultado[0].branch,
      };
      const token = generateToken(payload);
      res.send([payload, token]);
    } else {
      const payload: info = {
        id: resultado[0]._id,
        fullName: resultado[0].fullName,
        email: resultado[0].email,
        dni: resultado[0].dni,
        phone: resultado[0].phone,
        usertype: resultado[0].usertype,
      };
      const token = generateToken(payload);
      res.send([payload, token]);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
};

export const me = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) return res.sendStatus(400);
    const { user }: any = validateToken(token);
    if (user.usertype === "user" || user.usertype === "operator") {
      const updatedUser = await User.findById(user.id);

      const payload = {
        id: updatedUser?._id,
        fullName: updatedUser?.fullName,
        email: updatedUser?.email,
        dni: updatedUser?.dni,
        phone: updatedUser?.phone,
        usertype: updatedUser?.usertype,
      };
      res.send(payload);
    } else {
      const updatedAdmin = await Admin.findById(user.id);
      const payload = {
        id: updatedAdmin?._id,
        fullName: updatedAdmin?.fullName,
        email: updatedAdmin?.email,
        dni: updatedAdmin?.dni,
        usertype: updatedAdmin?.usertype,
      };
      res.send(payload);
    }
  } catch (err) {
    console.log(err);
    res.send(401);
  }
};

export const findAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (err) {
    console.log(err);
    res.send(401);
  }
};

export const findAllOperators = async (req: Request, res: Response) => {
  try {
    const allOperators = await User.find({ usertype: "operator" }).populate({
      path: "branch",
      select: "name",
    });

    res.send(allOperators);
  } catch (err) {
    console.log(err);
    res.send(401);
  }
};

export const findOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findUser = await User.findById(id);
    res.send(findUser);
  } catch (err) {
    console.log(err);
    res.send(401);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    // console.log(" REQ.BODY", req.body);
    const { _id, fullName, email, dni, phone } = req.body;
    if (
      _id === "" ||
      fullName === "" ||
      email === "" ||
      dni === "" ||
      phone === ""
    ) {
      return res.sendStatus(400);
    }
    //console.log("ESTO ES REQ.BODY NENEEE",req.body);

    const user = await User.findById(_id);
    await user?.updateOne({ fullName, email, dni, phone });
    await user?.save();
    //console.log(user);

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user" });
  }
};

export const changePasswordFirstStep = async (req: Request, res: Response) => {
  try {
    const { id, email } = req.body;
    if (id) {
      const user = await User.findById(id);
      const token = generateValidationToken({ authorized: true });
      sendMailChangePassword(user, token);

      res.sendStatus(200);
    } else {
      const user = await User.findOne({ email });
      const token = generateValidationToken({ authorized: true });
      sendMailChangePassword(user, token);
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const changePasswordSecondStep = async (req: Request, res: Response) => {
  try {
    const { id, token, newPassword } = req.body;

    const user = await User.findById(id);
    const returnedToken = validateToken(token);

    if (!user || !returnedToken)
      return res.status(400).send("id o token invalido!");

    await user.newPassword(newPassword);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
