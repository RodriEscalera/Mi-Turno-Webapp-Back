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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Schema = mongoose_1.default.Schema;
const adminSchema = new Schema({
    fullName: {
        type: String,
        require: true,
    },
    dni: {
        type: Number,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    usertype: {
        type: String,
        enum: ["user", "operator", "admin"],
        default: "admin",
        require: true,
    },
});
adminSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const salt = yield bcrypt_1.default.genSalt();
        const hash = yield bcrypt_1.default.hash(user.password, salt);
        user.password = hash;
    });
});
adminSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
const Admin = mongoose_1.default.model("Admin", adminSchema);
exports.default = Admin;
