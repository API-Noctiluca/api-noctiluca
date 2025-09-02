import express from "express";
import {
  getAllButterflies,
  createButterfly,
  deleteButterfly,
} from "../controllers/ButterflyController.js";

const router = express.Router();

router.post("/", createButterfly);
router.delete("/:id", deleteButterfly);
router.get("/", getAllButterflies);

export default router;