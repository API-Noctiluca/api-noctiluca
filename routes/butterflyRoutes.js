import express from "express";
import {getAllButterflies, createButterfly,deleteButterfly} from "../controllers/ButterflyController.js";

import {butterflyBodyRules, idParamRules, validateResult} from "../middlewares/butterfliesValidator.js";

const router = express.Router();

// GET - listado de todas las mariposas
router.get("/", getAllButterflies);

// POST - crear mariposa (con validaciones)
router.post("/", butterflyBodyRules, validateResult, createButterfly);

// DELETE - borrar mariposa (validar id)
router.delete("/:id", idParamRules, validateResult, deleteButterfly);

export default router;