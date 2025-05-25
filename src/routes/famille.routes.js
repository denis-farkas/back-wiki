import express from "express";
import { FamilleController } from "../controllers/famille.controller.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import jwtMdlwr from "../middlewares/jwt.mdlwr.js";

// Fonction pour initialiser les routes liées aux familles dans l'application Express
const initFamilleRoutes = (app) => {
  // Création d'un routeur Express dédié aux routes des familles
  const router = express.Router();

  // Définition des routes avec les méthodes associées du contrôleur
  router.post("/create", jwtMdlwr, checkAdmin, FamilleController.createFamille);
  router.get("/read", FamilleController.readFamilles);
  router.get("/readOne/:id_famille", FamilleController.readOneFamille);
  router.put(
    "/update/:id_famille",
    jwtMdlwr,
    checkAdmin,
    FamilleController.updateFamille
  );
  router.delete(
    "/delete/:id_famille",
    jwtMdlwr,
    checkAdmin,
    FamilleController.deleteOneFamille
  );

  // Utilisation du routeur dans l'application avec le préfixe "/famille"
  app.use("/famille", router);
};

export default initFamilleRoutes;
