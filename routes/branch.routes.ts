import { Router } from "express";
const router = Router();

import {
  getAllBranch,
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch,
  getAllBranches,
  getBookingsByBranch,
  getOperatorsByBranch,
} from "../controllers/branchControllers";
import { validateAdmin } from "../middlewares/validations";

router.get("/allbranches", getAllBranches);

router.get("/branches/:page", getAllBranch);

router.post("/onebranch/:id", getBranch, (req, res) =>
  res.json("getting single branch")
);

router.post("/createbranch", createBranch, validateAdmin, (req, res) =>
  res.json("posting a new branch")
);

router.put("/updateBranch/:id", updateBranch, validateAdmin, (req, res) =>
  res.json("updating a branch")
);

router.delete("/deleteBranch/:id", deleteBranch, validateAdmin, (req, res) =>
  res.json("getting a picked branch")
);

router.get("/getBookingsByBranch/:id", getBookingsByBranch);
router.get("/getOperatorsByBranch/:id", getOperatorsByBranch);
export default router;
