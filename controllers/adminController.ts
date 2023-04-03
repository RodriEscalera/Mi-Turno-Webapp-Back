import { Request, Response } from "express";
import User from "../models/Users";
import Branch, { IBranch } from "../models/Branch";
import Admin from "../models/Admin";
import { sendRegisterEmail } from "../services/emails";

export const createOperator = async (req: Request, res: Response) => {
  try {

    const { fullName, email, password, branch, dni } = req.body;
    const usertype = "operator";
    const exists = await User.findOne({ email });
    const assignedBranch = await Branch.findById(branch);
    if (exists) {
      console.log("si existo", exists);
      
      return res.sendStatus(400);}
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
    await assignedBranch?.updateOne({ operator: [...assignedBranch.operator, newOperator?._id] });
    await assignedBranch?.save();
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
    await branch?.updateOne({ operator: [...branch.operator, operator?.id] });
    await operator?.save();
    await branch?.save();
    res.send(operator);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};


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

export const updateOperator = async (req: Request, res: Response) => {
  try {
    // console.log(" REQ.BODY", req.body);
    const { _id, fullName, email, dni, password, branch } = req.body;

    console.log("ESTO ES REQ.BODY NENEEE", req.body);

    const user = await User.findById(_id);
    await user?.updateOne({ fullName, email, dni, password, branch });
    await user?.save();
    console.log("esto es el USER", user);

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating operator" });
  }
};
