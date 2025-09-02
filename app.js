import express from "express";
import helmet from "helmet";           // Seguridad HTTP básica
import cors from "cors";               // Permite que el frontend haga peticiones
import morgan from "morgan";           // Logs de requests

import db_connection from "./database/db_connection.js";
import ButterflyModel from "./models/ButterflyModel.js";

// Importar rutas y middlewares desde validators
import butterflyRoutes from "./routes/butterflyRoutes.js";
import { logger, notFound, errorHandler } from "./validators/butterfliesValidator.js";

// Inicializar Express
const app = express();

// ---------------------
// Middlewares globales
// ---------------------
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.use(logger);

// Middleware obligatorio para Content-Type JSON, con esto (GET /api/butterflies desde navegador ya funciona)
app.use((req, res, next) => {
    if (["POST", "PUT", "PATCH"].includes(req.method) && !req.is('application/json')) {
        return res.status(415).json({ error: 'Content-Type debe ser application/json' });
    }
    next();
});

// ---------------------
// Conexión a la base de datos
// ---------------------
try {
    await db_connection.authenticate();               // Conecta a la DB
    await ButterflyModel.sync();       // Sincroniza el modelo Butterfly
    console.log("Database connected and Butterfly table synced.");
} catch (err) {
    console.error("Database connection error:", err);
}

// ---------------------
// Rutas
// ---------------------
app.use("/api/butterflies", butterflyRoutes);

// ---------------------
// Manejo de errores
// ---------------------
app.use(notFound);
app.use(errorHandler);

// ---------------------
// Arranque del servidor
// ---------------------
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
