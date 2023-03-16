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
exports.seedUsers = void 0;
const Users_1 = __importDefault(require("../models/Users"));
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
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Users_1.default.deleteMany();
        function createCommonUser() {
            return __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < users.length; i++) {
                    const operators = new Users_1.default(users[i]);
                    operators.save();
                }
            });
        }
        createCommonUser();
        console.log("Users seed successful!");
    }
    catch (e) {
        console.error(e);
    }
});
exports.seedUsers = seedUsers;
