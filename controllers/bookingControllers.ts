import Booking from "../models/Booking";
import { Request, Response } from "express";

export const getAllBookings = async (req: Request, res: Response) => {
  try {
    const allBookings = await Booking.find({});
    res.send(allBookings);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const createBooking = async (req: Request, res: Response) => {
  const { time, date, fullName, phone, email } = req.body;
  const newBooking = new Booking({
    fullName,
    email,
    phone,
    date,
    time,
  });
  await newBooking.save();
  res.send(newBooking);
};
