import mongoose from "mongoose";
import { model, Schema, Document } from "mongoose";

export interface IBranch extends Document {
  name: string,
  location: string;
  phone: string;
  email: string,
  booking: Array<[]>;
}

const branchSchema = new Schema({
  name: {
    type: String,
    required: true,
  }, 
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }, 
  email: {
    type: String,
    required: true,
  }, 
  booking: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});


  export default model<IBranch>("Branch", branchSchema);
