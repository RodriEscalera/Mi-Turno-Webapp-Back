import mongoose from "mongoose";
import { IBooking } from "./Booking";
import { IBranch } from "./Branch";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

export interface IUser extends Document {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  dni: number;
  phone: number;
  usertype: string;
  branch: IBranch["_id"];
  booking: [IBooking["_id"]];
  comparePassword: (password: string) => Promise<Boolean>;
  newPassword: (password: string) => Promise<Boolean>;
}

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  dni: {
    type: Number,
    required: true,
    unique: true,
  },
  usertype: {
    type: String,
    enum: ["admin", "operator", "user"],
    required: true,
  },

  branch: 
    {
      type: Schema.Types.ObjectId,
      ref: "Branch",
    },
  

  booking: [
    {
      type: Schema.Types.ObjectId,
      ref: "booking",
    },
  ],
});

userSchema.pre<IUser>("save", async function () {
  const user = this;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(user.password, salt);

  user.password = hash;
});

userSchema.methods.newPassword = async function (password: string) {
  const user = this;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  await user.updateOne({ password: hash });
};
userSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("Users", userSchema);
export default User;
