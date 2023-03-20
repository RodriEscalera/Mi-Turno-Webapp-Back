import User from "../models/Users";
const users = [
  {
    fullName: "Armando Bronca Segura",
    dni: 11123456,
    email: "user1@user.com",
    password: "isUser1@N1",
    usertype: "user",
  },
  {
    fullName: "Sonia Vieja Alegre",
    dni: 22123456,
    email: "user2@user.com",
    password: "isUser2@N2",
    usertype: "user",
  },
  {
    fullName: "Pere Gil",
    dni: 33123456,
    email: "user3@user.com",
    password: "isUser3@N3",
    usertype: "user",
  },
  {
    fullName: "Aitor Tilla",
    dni: 44123456,
    email: "user4@user.com",
    password: "isUser4@N4",
    usertype: "user",
  },
  {
    fullName: "Rosa Cortada del Rosal",
    dni: 55123456,
    email: "user5@user.com",
    password: "isUser5@N5",
    usertype: "user",
  },
];

export const seedUsers = async () => {
  try {
    await User.deleteMany();

    async function createCommonUser() {
      for (let i = 0; i < users.length; i++) {
        const operators = new User(users[i]);
        operators.save();
      }
    }

    createCommonUser();
    console.log("Users seed successful!");
  } catch (e) {
    console.error(e);
  }
};
