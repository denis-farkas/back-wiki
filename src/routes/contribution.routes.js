import express from "express";
import { ContributionController } from "../controllers/contribution.controller.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";
import jwtMdlwr from "../middlewares/jwt.mdlwr.js";

// Fonction pour initialiser les routes liées aux contributions dans l'application Express
const initContributionRoutes = (app) => {
  // Création d'un routeur Express dédié aux routes des contributions
  const router = express.Router();

  // Définition des routes avec les méthodes associées du contrôleur
  router.post("/create", ContributionController.createContribution);
  router.get("/read", ContributionController.readContributions);
  router.get(
    "/read/user/:userId",
    ContributionController.readUserContributions
  );
  router.get(
    "/readOne/:id_contribution",
    ContributionController.readOneContribution
  );
  router.put(
    "/update/:id_contribution",
    ContributionController.updateContribution
  );

  router.put(
    "/validation",
    jwtMdlwr,
    checkAdmin,
    ContributionController.updateValidation
  );
  router.delete(
    "/delete/:id_contribution",
    ContributionController.deleteOneContribution
  );

  // Utilisation du routeur dans l'application avec le préfixe "/contribution"
  app.use("/contribution", router);
};

export default initContributionRoutes;
