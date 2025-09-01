// validators/butterfliesValidator.js
import { body, param, query, validationResult } from "express-validator";

// ---------------------
// Body rules for create/update butterfly
// ---------------------
export const butterflyBodyRules = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 120 }),
  body("family").trim().notEmpty().withMessage("Family is required").isLength({ max: 120 }),
  body("Hábitat").trim().notEmpty().withMessage("Habitat is required").isLength({ max: 500 }),
  body("Feeding").trim().notEmpty().withMessage("Feeding info is required").isLength({ max: 500 }),
  body("Morphology").trim().notEmpty().withMessage("Morphology is required").isLength({ max: 800 }),
  body("Life").trim().notEmpty().withMessage("Life info is required").isLength({ max: 800 }),
  body("Conservation").trim().notEmpty().withMessage("Conservation info is required").isLength({ max: 500 }),
  body("about conservation").notEmpty().withMessage("Select conservation status")
    .isIn(["LC","NT","VU","EN","CR"]).withMessage("Invalid conservation status"),
  body("Location").trim().notEmpty().withMessage("Location is required").isLength({ max: 1000 }),
  body("image").optional({ nullable: true, checkFalsy: true }).isURL().withMessage("Image must be a valid URL"),
  body("other names").optional().isString().trim().isLength({ max: 200 }),
  body("id").optional().isString().isLength({ min: 6, max: 64 }).withMessage("Invalid ID")
];

// ---------------------
// Params rules
// ---------------------
export const idParamRules = [
  param("id").isString().withMessage("Invalid ID")
];

// ---------------------
// Query rules
// ---------------------
export const listQueryRules = [
  query("page").optional().isInt({ min: 1 }).toInt(),
  query("limit").optional().isInt({ min: 1, max: 100 }).toInt(),
  query("family").optional().isString().trim(),
  query("q").optional().isString().trim()
];

// ---------------------
// Middleware to check validation results
// ---------------------
export const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// ---------------------
// Optional logger middleware
// ---------------------
export const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};

// ---------------------
// Optional simple 404 middleware
// ---------------------
export const notFound = (req, res, next) => {
  res.status(404).json({ error: "Resource not found" });
};

// ---------------------
// Optional simple error handler middleware
// ---------------------
export const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error" });
};
