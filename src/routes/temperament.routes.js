import express from "express";
import { TemperamentController } from "../controllers/temperament.controller.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import jwtMdlwr from "../middlewares/jwt.mdlwr.js";

// Fonction pour initialiser les routes liées aux temperaments dans l'application Express
const initTemperamentRoutes = (app) => {
  // Création d'un routeur Express dédié aux routes des temperaments
  const router = express.Router();

  // Définition des routes avec les méthodes associées du contrôleur
  router.post(
    "/create",
    jwtMdlwr,
    checkAdmin,
    TemperamentController.createTemperament
  );
  router.get("/read", TemperamentController.readTemperaments);
  router.get(
    "/readOne/:id_temperament",
    TemperamentController.readOneTemperament
  );
  router.put(
    "/update/:id_temperament",
    jwtMdlwr,
    checkAdmin,
    TemperamentController.updateTemperament
  );
  router.delete(
    "/delete/:id_temperament",
    jwtMdlwr,
    checkAdmin,
    TemperamentController.deleteOneTemperament
  );

  // Utilisation du routeur dans l'application avec le préfixe "/temperament"
  app.use("/temperament", router);
};

export default initTemperamentRoutes;
