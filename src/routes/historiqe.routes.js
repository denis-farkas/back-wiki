import express from "express";
import { HistoriqueController } from "../controllers/historique.controller.js";

// Fonction pour initialiser les routes liées aux historiques dans l'application Express
const initHistoriqueRoutes = (app) => {
  // Création d'un routeur Express dédié aux routes des historiques
  const router = express.Router();

  // Définition des routes avec les méthodes associées du contrôleur
  router.post(
    "/create",

    HistoriqueController.createHistorique
  );
  router.get("/read", HistoriqueController.readHistoriques);
  router.get("/readOne/:id_historique", HistoriqueController.readOneHistorique);
  router.put("/update/:id_historique", HistoriqueController.updateHistorique);
  router.delete(
    "/delete/:id_historique",
    HistoriqueController.deleteOneHistorique
  );

  // Utilisation du routeur dans l'application avec le préfixe "/historique"
  app.use("/historique", router);
};

export default initHistoriqueRoutes;
