import express from "express";
<<<<<<<<< Temporary merge branch 1
import {getAllButterflies, createButterfly,deleteButterfly} from "../controllers/ButterflyController.js";

import {butterflyBodyRules, idParamRules, validateResult} from "../middlewares/butterfliesValidator.js";
=========
import {
  createButterfly,
  deleteButterfly,
} from "../controllers/ButterflyController.js";
import { getAllButterflies } from "../controllers/ButterflyControllers1.js";
>>>>>>>>> Temporary merge branch 2

const router = express.Router();

// GET - listado de todas las mariposas
router.get("/", getAllButterflies);

// GETONE - obtener una mariposa por ID
router.get("/:id", idParamRules, validateResult, getOneButterfly);

// POST - crear mariposa (con validaciones)
router.post("/", butterflyBodyRules, validateResult, createButterfly);

// DELETE - borrar mariposa (validar id)
router.delete("/:id", idParamRules, validateResult, deleteButterfly);

export default router;