import { Router } from "express";

const router = Router();

// Ruta de prueba
router.get("/", (req, res) => {
  res.json({ mensaje: "Ruta de mariposas funcionando ✅​👏🏼​" });
});

export default router;