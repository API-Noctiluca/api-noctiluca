import { body, param, query, validationResult } from "express-validator";

// ---------------------
// Reglas para crear/actualizar mariposas
// ---------------------
export const butterflyBodyRules = [
  body("name").trim().notEmpty().withMessage("El nombre es obligatorio").isLength({ max: 120 }),
  body("family").trim().notEmpty().withMessage("La familia es obligatoria").isLength({ max: 120 }),
  body("Hábitat").trim().notEmpty().withMessage("El hábitat es obligatorio").isLength({ max: 500 }),
  body("Feeding").trim().notEmpty().withMessage("La alimentación es obligatoria").isLength({ max: 500 }),
  body("Morphology").trim().notEmpty().withMessage("La morfología es obligatoria").isLength({ max: 800 }),
  body("Life").trim().notEmpty().withMessage("La vida es obligatoria").isLength({ max: 800 }),
  body("Conservation").trim().notEmpty().withMessage("La conservación es obligatoria").isLength({ max: 500 }),
  body("about conservation").notEmpty().withMessage("Selecciona estado de conservación")
    .isIn(["LC","NT","VU","EN","CR"]).withMessage("Estado de conservación inválido"),
  body("Location").trim().notEmpty().withMessage("La ubicación es obligatoria").isLength({ max: 1000 }),
  body("image").optional({ nullable: true, checkFalsy: true }).isURL().withMessage("La imagen debe ser una URL válida"),
  body("other names").optional().isString().trim().isLength({ max: 200 }),
  body("id").optional().isString().isLength({ min: 6, max: 64 }).withMessage("ID inválido")
];

// ---------------------
// Validaciones para parámetros
// ---------------------
export const idParamRules = [
  param("id").isString().withMessage("ID inválido")
];

// ---------------------
// Validaciones para queries
// ---------------------
export const listQueryRules = [
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
  query("family").optional().isString().trim(),
  query("q").optional().isString().trim()
];

// ---------------------
// Middleware para revisar los resultados de las validaciones
// ---------------------
export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ---------------------
// Middleware opcional de logs de requests
// ---------------------
export const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// ---------------------
// Middleware opcional para 404
// ---------------------
export const notFound = (req, res, next) => {
  res.status(404).json({ error: "Recurso no encontrado" });
};

// ---------------------
// Middleware opcional para errores 500
// ---------------------
export const errorHandler = (err, req, res, next) => {
  console.error(err); // log técnico
  res.status(err.status || 500).json({ error: err.message || "Error interno del servidor" });
};