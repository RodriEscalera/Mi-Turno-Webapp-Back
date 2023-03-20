import Booking, { IBooking } from "../models/Booking";
import { Request, Response } from "express";
import Branch, { IBranch } from "../models/Branch";

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const allBookings = await Booking.find({});
    res.send(allBookings);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const getBookingOfUser = async (req: Request, res: Response) => {
  try {
    const idUser = req.params.user;
    const turnos: IBooking[] = await Booking.find({ user: idUser })
    .populate("branch")

    res.status(200).send(turnos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Hubo un error al obtener los turnos del usuario." });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  const { branch, user, time, date, fullName, phone, email } = req.body;
  const newBooking = new Booking({
    branch,
    user,
    fullName,
    email,
    phone,
    date,
    time,
  });
  await newBooking.save();
  res.send(newBooking);
};
