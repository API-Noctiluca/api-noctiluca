import express from "express";
import {
  createButterfly,
  deleteButterfly,
} from "../controllers/ButterflyController.js";

const router = express.Router();

router.post("/", createButterfly);
router.delete("/:id", deleteButterfly);

export default router;

