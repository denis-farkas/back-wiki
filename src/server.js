import express from "express";
import initRoutes from "./routes/init.routes.js";
import initMiddlewares from "./middlewares/init.middleware.js";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
// Port sur lequel le serveur écoutera les connexions
const PORT = process.env.PORT;
console.log("PORT:", process.env.PORT);

// Création de l'application Express
const app = express();
app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = ["http://localhost:5173"];
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        optionsSuccessStatus: 200,
        credentials: true,
    })
);
app.use(express.json());
// Initialisation des middlewares (gestionnaires intermédiaires)
initMiddlewares(app);

// Initialisation des routes de l'application
initRoutes(app);

// Écoute du serveur sur le port spécifié
app.listen(PORT, () => {
    console.log("Le serveur écoute sur le PORT:", PORT);
});