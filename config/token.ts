import jwt from "jsonwebtoken";
import config from "./envs";
import { IBranch } from "../models/Branch";
import { IBooking } from "../models/Booking";

export interface info {
  id: string;
  fullName: string;
  email: string;
  dni: number;
  phone: number;
  usertype: string;
  branch?: any;
  booking?: Array<IBooking>;
}
export interface pass {
  authorized: boolean;
}

export const generateToken = (payload: info | pass) => {
  const token = jwt.sign({ user: payload }, config.jwtSecret);
  return token;
};

export const generateValidationToken = (payload: info | pass) => {
  const token = jwt.sign(payload, config.jwtSecret);
  return token;
};

export const validateToken = (token: any) => {
  return jwt.verify(token, config.jwtSecret);
};
