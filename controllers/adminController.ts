import { Request, Response } from "express";
import User from "../models/Users";
import Branch from "../models/Branch";
import Admin from "../models/Admin";
import { sendRegisterEmail } from "../services/emails";

export const createOperator = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, branch, dni } = req.body;
    const usertype = "operator";
    const exists = await User.findOne({ email });
    if (exists) return res.sendStatus(400);
    const newOperator = new User({
      fullName,
      email,
      dni,
      password,
      branch,
      usertype,
    });
    sendRegisterEmail(newOperator);
    await newOperator.save();
    res.send(newOperator);
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
};

export const asignbranch = async (req: Request, res: Response) => {
  try {
    const { opId, branchId } = req.body;
    const operator = await User.findById(opId);
    const branch = await Branch.findById(branchId);

    await operator?.updateOne({ branch: [...operator.branch, branch?.id] });
    await operator?.save();
    res.send(operator);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
//
export const registerAdmin = async (req: Request, res: Response) => {
  try {
    const { fullName, dni, email, password, usertype } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) return res.sendStatus(400);
    const admin = new Admin({ fullName, dni, email, password, usertype });
    await admin.save();
    res.send(admin);
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
};
