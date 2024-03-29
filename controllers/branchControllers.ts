import Branch, { IBranch } from "../models/Branch";
import { Request, Response } from "express";
import Booking, { IBooking } from "../models/Booking";

export const getAllBranches = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const allBranches = await Branch.find({});
    res.send(allBranches);
  } catch (error) {
    console.log(error);
  }
};

export const getAllBranch = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { page }: any = req.params;

    const branches = await Branch.find()
      .limit(10)
      .skip((page - 1) * 10);
    res.send(branches);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const getBranch = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await Branch.findById(id);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Sucursal no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la sucursal" });
  }
};

export const createBranch = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, location, phone, email, closingTime, startingTime } = req.body;
  console.log(req.body);
  try {
    const branch = new Branch({
      name,
      location,
      phone,
      email,
      closingTime,
      startingTime,
    });
    await branch.save();
    res.status(201).json(branch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating branch" });
  }
};

export const updateBranch = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { name, startingTime, closingTime, phone, email } = req.body;

  try {
    const branch = await Branch.findById(id);
    if (!branch) {
      res.status(404).json({ message: "Branch not found" });
      return;
    }

    branch.name = name;
    branch.phone = phone;
    branch.email = email;
    branch.startingTime = startingTime;
    branch.closingTime = closingTime;

    await branch.save();
    console.log(branch);

    res.json(branch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating branch" });
  }
};

export const deleteBranch = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const branch = await Branch.findByIdAndDelete(id);
    if (!branch) {
      res.status(404).json({ message: "Branch not found" });
      return;
    }

    res.json(branch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting branch" });
  }
};

export const getBookingsByBranch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findById(id).populate("booking");

    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    const bookings = branch.booking;
    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOperatorsByBranch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findById(id).populate("operator");

    if (!branch) {
      return res.status(404).json({ message: "Branch not found" });
    }
    const operators = branch.operator;
    res.status(200).json({ operators });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
