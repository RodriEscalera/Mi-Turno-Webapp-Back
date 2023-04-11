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
exports.seedOperator = void 0;
const Users_1 = __importDefault(require("../models/Users"));
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
const seedOperator = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Users_1.default.deleteMany();
        function createOperator() {
            return __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < operadores.length; i++) {
                    const operators = new Users_1.default(operadores[i]);
                    operators.save();
                }
            });
        }
        createOperator();
        console.log("Operator seed successful!");
    }
    catch (e) {
        console.error(e);
    }
});
exports.seedOperator = seedOperator;
