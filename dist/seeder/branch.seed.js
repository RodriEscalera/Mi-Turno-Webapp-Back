"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedBranch = void 0;
const Branch_1 = __importDefault(require("../models/Branch"));
//sucursales
const branches = [
    {
        name: "Sucursal 1",
        location: "Santa Fe",
        email: "Branch1@Branch.com",
        phone: "1123465789",
        closingTime: "21:00",
        startingTime: "07:00",
    },
    {
        name: "Sucursal 2",
        location: "Salta",
        email: "Branch2@Branch.com",
        phone: "123123123123",
        closingTime: "21:00",
        startingTime: "07:00",
    },
    {
        name: "Sucursal 3",
        location: "Margo",
        email: "Branch3@Branch.com",
        phone: "121111111111",
        closingTime: "21:00",
        startingTime: "07:00",
    },
    {
        name: "Sucursal 4",
        location: "Jujuy",
        email: "Branch4@Branch.com",
        phone: "112313",
        closingTime: "21:00",
        startingTime: "07:00",
    },
    {
        name: "Sucursal 5",
        location: "La Rioja",
        email: "Branch5@Branch.com",
        phone: "987654987",
        closingTime: "21:00",
        startingTime: "07:00",
    },
    {
        name: "Sucursal 6",
        location: "Entre Ríos",
        email: "Branch6@Branch.com",
        phone: "1987321654",
        closingTime: "21:00",
        startingTime: "07:00",
    },
    {
        name: "Sucursal 7",
        location: "Margo",
        email: "Branch7@Branch.com",
        phone: "7777998856",
        closingTime: "21:00",
        startingTime: "07:00",
    },
    {
        name: "Sucursal 8",
        location: "Jujuy",
        email: "Branch8@Branch.com",
        phone: "1888846888",
        closingTime: "21:00",
        startingTime: "07:00",
    },
];
const seedBranch = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Branch_1.default.deleteMany();
        function createBranch() {
            return __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < branches.length; i++) {
                    let branch = new Branch_1.default(branches[i]);
                    branch.save();
                }
            });
        }
        createBranch();
        console.log("Branch seed successful!");
    }
    catch (e) {
        console.error(e);
    }
});
exports.seedBranch = seedBranch;
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
