import Booking, { IBooking } from "../models/Booking";
import { Request, Response } from "express";
import Branch from "../models/Branch";
import { countWordOccurrences } from "../utils/functions";

export const getOneBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const findBooking = await Booking.findById(id).populate("branch");

    if (findBooking) {
      res.status(200).send(findBooking);
    } else {
      res.status(404).json({ message: "Turno no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el turno" });
  }
};

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
//
export const createBooking = async (req: Request, res: Response) => {
  const { branch, user, time, date, fullName, phone, email } = req.body;
  console.log(req.body);
  
  const today = new Date();
  const createdAt = today.toLocaleString("es-AR");
  const findBranch = await Branch.findById(branch);

  if (!findBranch) return res.sendStatus(400);
  const exists = await Booking.findOne({ branch, date, time });
  if (exists) {
    console.log("este turno ya existe, mira:", exists);
    return res.sendStatus(400);
  }
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
  await findBranch?.updateOne({
    booking: [...findBranch.booking, newBooking?._id],
  });
  res.send(newBooking);
};

export const getLastBooking = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const bookings: any = await Booking.find({ user: userId })
      .sort({
        createdAt: "desc",
      })
      .populate("branch");
    res.send(bookings[0]);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
//new
export const updateBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { branch, user, time, date, fullName, phone, email } = req.body;

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

export const getSoldOutBookingPerMonth = async (
  req: Request,
  res: Response
) => {
  try {
    const { date, branch } = req.body;
    const month = date.split("-")[1];

    const bookings = await Booking.find({
      date: { $regex: `-${month}-` },
      branch: branch,
    });
    const findBranch = await Branch.findById(branch);
    console.log(findBranch);
    const reserves = bookings.map((element) => element.date);
    const toShow = countWordOccurrences(reserves);
    const soldOut: string[] = [];
    toShow.forEach((element) => {
      for (const key in element) {
        if (element[key] >= 8) {
          soldOut.push(key);
        }
      }
    });
    console.log(soldOut);
    res.send(soldOut);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const getScheduleOfBooking = async (req: Request, res: Response) => {
  try {
    const { date, branch } = req.body;

    const bookings = await Booking.find({ date, branch });
    const returning = bookings.map((element) => element.time);
    res.send(returning);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
