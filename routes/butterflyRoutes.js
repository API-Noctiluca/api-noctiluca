// routes/butterflyRoutes.js
import express from "express";
import {
  getAllButterflies,
  createButterfly,
  deleteButterfly,
} from "../controllers/butterflyController.js";

const router = express.Router();

router.post("/", createButterfly);
router.delete("/:id", deleteButterfly);

export default router;
