const mongoose = require("mongoose");

import Branch from "../models/Branch";

export const seedBranch = async () => {
  try {
    await Branch.deleteMany();

    const branch = new Branch({
      name: "Sucursal 1",
      location: "Santa Fe",
      email: "Branch1@Branch.com",
      phone: "1123465789",
      startingTime: "07:00",
      closingTime: "21:00",
      //booking: IBooking,
      //operator: [IUser["_id"]],
    });

    await branch.save();

    console.log("Branch seed successful!");
  } catch (e) {
    console.error(e);
  }
};

/* mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb://localhost/mi-turno-webapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
  })
  .then(() => {
    seedBranch().then(() => console.log('Branches seeded successfully')).catch(console.error);
  })
  .catch(() => {
    console.log("Couldn't connect with the Branch seeder :(");
  }); */
