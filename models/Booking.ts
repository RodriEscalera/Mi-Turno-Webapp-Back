import { model, Schema, Document } from "mongoose";
import { IBranch } from "./Branch";
import { IUser } from "./Users";

export interface IBooking extends Document {
  branchId: IBranch["_id"];
  date: String;
  time: String;
  userId: IUser["_id"];
  fullName: String;
  phone: Number;
  email: String;
  available: Boolean;
}
const bookingSchema = new Schema({
  branch: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  fullName: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
});

export default model<IBooking>("Booking", bookingSchema);
