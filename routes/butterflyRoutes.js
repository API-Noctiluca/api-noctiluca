import express from "express";
import {
  createButterfly,
  deleteButterfly,
} from "../controllers/ButterflyController.js";
import { getAllButterflies } from "../controllers/ButterflyControllers1.js";

const router = express.Router();

router.post("/", createButterfly);
router.delete("/:id", deleteButterfly);
router.get("/", getAllButterflies);

export default router;