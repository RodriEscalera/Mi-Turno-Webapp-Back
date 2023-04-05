import User from "../models/Users";
//seed operadores
const operadores = [
  {
    fullName: "operador1",
    dni: 11111111,
    email: "ope1@ope.com",
    password: "Operator@N1",
    usertype: "operator",
    branch: "642d93d850eac147a3224a7f"
  },
  {
    fullName: "operador2",
    dni: 222222222,
    email: "ope2@ope.com",
    password: "Operator@N2",
    usertype: "operator",
    branch: "642d7b07555ce7216445d9af"
  },
  {
    fullName: "operador3",
    dni: 33333333,
    email: "ope3@ope.com",
    password: "Operator@N3",
    usertype: "operator",
    branch: "642d7b07555ce7216445d9b0"
  },
  {
    fullName: "operador4",
    dni: 444444444,
    email: "ope4@ope.com",
    password: "Operator@N4",
    usertype: "operator",
    branch: "642d7b07555ce7216445d9b3"
  },
];

export const seedOperator = async () => {
  try {
    await User.deleteMany();

    async function createOperator() {
      for (let i = 0; i < operadores.length; i++) {
        const operators = new User(operadores[i]);
        operators.save();
      }
    }

    createOperator();
    console.log("Operator seed successful!");
  } catch (e) {
    console.error(e);
  }
};
