"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.countWordOccurrences = exports.readHTMLFile = void 0;
const fs_1 = __importDefault(require("fs"));
function readHTMLFile(path, callback) {
    fs_1.default.readFile(path, { encoding: "utf-8" }, function (err, html) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
}
exports.readHTMLFile = readHTMLFile;
function countWordOccurrences(arr) {
    const count = {};
    arr.forEach((word) => {
        if (count[word]) {
            count[word]++;
        }
        else {
            count[word] = 1;
        }
    });
    const result = [];
    for (const word in count) {
        result.push({ [word]: count[word] });
    }
    return result;
}
exports.countWordOccurrences = countWordOccurrences;
