import express from "express";
import { HabitatController } from "../controllers/habitat.controller.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import jwtMdlwr from "../middlewares/jwt.mdlwr.js";

// Fonction pour initialiser les routes liées aux habitats dans l'application Express
const initHabitatRoutes = (app) => {
  // Création d'un routeur Express dédié aux routes des habitats
  const router = express.Router();

  // Définition des routes avec les méthodes associées du contrôleur
  router.post("/create", jwtMdlwr, checkAdmin, HabitatController.createHabitat);
  router.get("/read", HabitatController.readHabitats);
  router.get("/readOne/:id_habitat", HabitatController.readOneHabitat);
  router.put(
    "/update/:id_habitat",
    jwtMdlwr,
    checkAdmin,
    HabitatController.updateHabitat
  );
  router.delete(
    "/delete/:id_habitat",
    jwtMdlwr,
    checkAdmin,
    HabitatController.deleteOneHabitat
  );

  // Utilisation du routeur dans l'application avec le préfixe "/habitat"
  app.use("/habitat", router);
};

export default initHabitatRoutes;
