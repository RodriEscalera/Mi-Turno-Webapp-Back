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

export const updateBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { branch, user, time, date, fullName, phone, email } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }
    
    booking.branch = branch;
    booking.user = user;
    booking.time = time;
    booking.date = date;
    booking.fullName = fullName;
    booking.phone = phone;
    booking.email = email;

    await booking.save();
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating booking" });
  }
};

export const deleteBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      res.status(404).json({ message: "Booking not found" });
      return;
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting booking" });
  }
};