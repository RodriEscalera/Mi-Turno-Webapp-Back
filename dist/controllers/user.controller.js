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
exports.changePasswordSecondStep = exports.changePasswordFirstStep = exports.updateUser = exports.findOneUser = exports.findAllOperators = exports.findAllUsers = exports.me = exports.login = exports.register = void 0;
const Users_1 = __importDefault(require("../models/Users"));
const token_1 = require("../config/token");
const token_2 = require("../config/token");
const Admin_1 = __importDefault(require("../models/Admin"));
const emails_1 = require("../services/emails");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { fullName, email, password, dni } = req.body;
        const usertype = "user";
        const exists = yield Users_1.default.findOne({ email });
        if (exists)
            return res.sendStatus(400);
        const newUser = new Users_1.default({
            fullName,
            email,
            password,
            dni,
            usertype,
        });
        yield newUser.hashPassword();
        (0, emails_1.sendRegisterEmail)(newUser);
        yield newUser.save();
        res.send(newUser);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield Users_1.default.findOne({ email });
        const admin = yield Admin_1.default.findOne({ email });
        const result = [user, admin];
        const resultado = result.filter((e) => e !== null);
        console.log(resultado, "esto es");
        if (!resultado[0])
            return res.sendStatus(400);
        const isMatch = yield resultado[0].comparePassword(password);
        if (!isMatch)
            return res.status(400).send("Not mached");
        if (resultado[0].userType === "user" ||
            resultado[0].userType === "operator") {
            const payload = {
                id: resultado[0]._id,
                fullName: resultado[0].fullName,
                email: resultado[0].email,
                dni: resultado[0].dni,
                phone: resultado[0].phone,
                usertype: resultado[0].usertype,
                booking: resultado[0].booking,
                branch: resultado[0].branch,
            };
            const token = (0, token_1.generateToken)(payload);
            res.send([payload, token]);
        }
        else {
            const payload = {
                id: resultado[0]._id,
                fullName: resultado[0].fullName,
                email: resultado[0].email,
                dni: resultado[0].dni,
                phone: resultado[0].phone,
                usertype: resultado[0].usertype,
            };
            const token = (0, token_1.generateToken)(payload);
            res.send([payload, token]);
        }
    }
    catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
});
exports.login = login;
const me = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (!token)
            return res.sendStatus(400);
        const { user } = (0, token_2.validateToken)(token);
        if (user.usertype === "user" || user.usertype === "operator") {
            const updatedUser = yield Users_1.default.findById(user.id);
            const payload = {
                id: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser._id,
                fullName: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.fullName,
                email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email,
                dni: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.dni,
                phone: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.phone,
                branch: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.branch,
                usertype: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.usertype,
            };
            res.send(payload);
        }
        else {
            const updatedAdmin = yield Admin_1.default.findById(user.id);
            const payload = {
                id: updatedAdmin === null || updatedAdmin === void 0 ? void 0 : updatedAdmin._id,
                fullName: updatedAdmin === null || updatedAdmin === void 0 ? void 0 : updatedAdmin.fullName,
                email: updatedAdmin === null || updatedAdmin === void 0 ? void 0 : updatedAdmin.email,
                dni: updatedAdmin === null || updatedAdmin === void 0 ? void 0 : updatedAdmin.dni,
                usertype: updatedAdmin === null || updatedAdmin === void 0 ? void 0 : updatedAdmin.usertype,
            };
            res.send(payload);
        }
    }
    catch (err) {
        console.log(err);
        res.send(401);
    }
});
exports.me = me;
const findAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield Users_1.default.find({});
        res.send(allUsers);
    }
    catch (err) {
        console.log(err);
        res.send(401);
    }
});
exports.findAllUsers = findAllUsers;
const findAllOperators = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allOperators = yield Users_1.default.find({ usertype: "operator" }).populate({
            path: "branch",
            select: "name",
        });
        res.send(allOperators);
    }
    catch (err) {
        console.log(err);
        res.send(401);
    }
});
exports.findAllOperators = findAllOperators;
const findOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findUser = yield Users_1.default.findById(id);
        res.send(findUser);
    }
    catch (err) {
        console.log(err);
        res.send(401);
    }
});
exports.findOneUser = findOneUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, fullName, email, dni, phone } = req.body;
        if (_id === "" ||
            fullName === "" ||
            email === "" ||
            dni === "" ||
            phone === "") {
            return res.sendStatus(400);
        }
        const user = yield Users_1.default.findById(_id);
        yield (user === null || user === void 0 ? void 0 : user.updateOne({ fullName, email, dni, phone }));
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user" });
    }
});
exports.updateUser = updateUser;
const changePasswordFirstStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, email } = req.body;
        if (id) {
            const user = yield Users_1.default.findById(id);
            const token = (0, token_1.generateValidationToken)({ authorized: true });
            (0, emails_1.sendMailChangePassword)(user, token);
            res.sendStatus(200);
        }
        else {
            const user = yield Users_1.default.findOne({ email });
            const token = (0, token_1.generateValidationToken)({ authorized: true });
            (0, emails_1.sendMailChangePassword)(user, token);
            res.sendStatus(200);
        }
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});
exports.changePasswordFirstStep = changePasswordFirstStep;
const changePasswordSecondStep = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, token, newPassword } = req.body;
        const user = yield Users_1.default.findById(id);
        const returnedToken = (0, token_2.validateToken)(token);
        if (!user || !returnedToken)
            return res.status(400).send("id o token invalido!");
        // await user.newPassword(newPassword);
        res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});
exports.changePasswordSecondStep = changePasswordSecondStep;
