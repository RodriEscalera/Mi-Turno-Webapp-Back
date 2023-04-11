import express from "express";
import {
  createOperator,
  asignbranch,
  updateOperator,
} from "../controllers/adminController";
import { validateAdmin } from "../middlewares/validations";
import { registerAdmin } from "../controllers/adminController";
const router = express.Router();

router.post("/createoperator", validateAdmin, createOperator);
router.post("/asignbranch", validateAdmin, asignbranch);
router.post("/registerAdmin", registerAdmin);
router.put("/updateOperator/:id", validateAdmin, updateOperator);

export default router;
//
