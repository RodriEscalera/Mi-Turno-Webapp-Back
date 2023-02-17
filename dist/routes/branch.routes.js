"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const branchControllers_1 = require("../controllers/branchControllers");
router.get("/branches", branchControllers_1.getBranch, (req, res) => res.json('getting branches'));
router.get('/branches/:id', branchControllers_1.getBranch, (req, res) => res.json('getting single branch'));
router.post("/branches", branchControllers_1.createBranch, (req, res) => res.json('posting a new branch'));
router.put('/branches/:id', branchControllers_1.updateBranch, (req, res) => res.json('updating a branch'));
router.delete("/branches/:id", branchControllers_1.deleteBranch, (req, res) => res.json('getting a picked branch'));
exports.default = router;