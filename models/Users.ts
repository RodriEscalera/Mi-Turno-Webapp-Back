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
  hashPassword: () => Promise<void>;
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

  branch: {
    type: Schema.Types.ObjectId,
    ref: "Branch",
  },

  booking: [
    {
      type: Schema.Types.ObjectId,
      ref: "booking",
    },
  ],

  isModifiedPassword: {
    type: Boolean,
  },
});

userSchema.methods.hashPassword = async function () {
  const user = this;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(user.password, salt);
  await user.updateOne({ password: hash });
  await user.save();
};

userSchema.methods.newPassword = async function (password: string) {
  const user = this;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  await user.updateOne({ password: hash });
};

userSchema.pre<any>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  if (user.isModified("password")) {
    // verifica si la contraseña ha sido modificada
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    user.isModifiedPassword = false; // establece la propiedad a falso después de encriptar la contraseña
  }
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("Users", userSchema);
export default User;
