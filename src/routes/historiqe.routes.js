import express from "express";
import { HistoriqueController } from "../controllers/historique.controller.js";
import jwtMdlwr from "../middlewares/jwt.mdlwr.js"; // Utiliser votre middleware existant

// Fonction pour initialiser les routes liées aux historiques dans l'application Express
const initHistoriqueRoutes = (app) => {
  // Création d'un routeur Express dédié aux routes des historiques
  const router = express.Router();

  // Définition des routes avec les méthodes associées du contrôleur
  router.post("/create", jwtMdlwr, HistoriqueController.createHistorique);
  router.get("/read", jwtMdlwr, HistoriqueController.readHistoriques);
  router.get(
    "/readOne/:id_historique",
    jwtMdlwr,
    HistoriqueController.readOneHistorique
  );
  router.put(
    "/update/:id_historique",
    jwtMdlwr,
    HistoriqueController.updateHistorique
  );
  router.delete(
    "/delete/:id_historique",
    jwtMdlwr,
    HistoriqueController.deleteOneHistorique
  );
  router.get(
    "/readByUser/:user_id",
    jwtMdlwr,
    HistoriqueController.readHistoriqueByUser
  );

  // Utilisation du routeur dans l'application avec le préfixe "/historique"
  app.use("/historique", router);
};

export default initHistoriqueRoutes;
