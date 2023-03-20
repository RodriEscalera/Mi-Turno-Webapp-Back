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
    const turnos: IBooking[] = await Booking.find({ user: idUser }).populate(
      "branch"
    );

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
  const today = new Date();
  const createdAt = today.toLocaleString("es-AR");
  const newBooking = new Booking({
    branch,
    user,
    fullName,
    email,
    phone,
    date,
    time,
    createdAt,
  });
  await newBooking.save();
  res.send(newBooking);
};

export const getLastBooking = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ user: userId }).sort({
      createdAt: "desc",
    });
    console.log(bookings);
    res.send(bookings[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
