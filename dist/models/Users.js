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
    branch: [
        {
            type: Schema.Types.ObjectId,
            ref: "branch",
        },
    ],
    booking: [
        {
            type: Schema.Types.ObjectId,
            ref: "booking",
        },
    ],
});
userSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const salt = yield bcrypt_1.default.genSalt();
        const hash = yield bcrypt_1.default.hash(user.password, salt);
        user.password = hash;
    });
});
userSchema.methods.newPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const salt = yield bcrypt_1.default.genSalt();
        const hash = yield bcrypt_1.default.hash(password, salt);
        yield user.updateOne({ password: hash });
    });
};
userSchema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
const User = mongoose_1.default.model("Users", userSchema);
exports.default = User;
