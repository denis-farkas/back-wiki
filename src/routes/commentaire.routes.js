import express from "express";
import { CommentaireController } from "../controllers/commentaire.controller.js";
import jwtMdlwr from "../middlewares/jwt.mdlwr.js";
import checkAdmin from "../middlewares/check-admin.mdlwr.js";

// Fonction pour initialiser les routes liées aux commentaires dans l'application Express
const initCommentaireRoutes = (app) => {
  // Création d'un routeur Express dédié aux routes des commentaires
  const router = express.Router();

  // Définition des routes avec les méthodes associées du contrôleur
  router.post("/create", CommentaireController.createCommentaire);
  router.get("/read", CommentaireController.readCommentaires);
  router.get(
    "/read/:id_espece",
    CommentaireController.readCommentairesByEspece
  );
  router.get(
    "/readByUser/:user_id",
    jwtMdlwr,
    CommentaireController.readUserCommentaires
  );
  router.get("/:id_commentaire", CommentaireController.readOneCommentaire);
  router.put(
    "/update/:id_commentaire",
    CommentaireController.updateCommentaire
  );
  router.put(
    "/updateValidation/:id_commentaire",
    jwtMdlwr,
    checkAdmin,
    CommentaireController.updateValidation
  );
  router.delete(
    "/delete/:id_commentaire",
    CommentaireController.deleteOneCommentaire
  );

  // Utilisation du routeur dans l'application avec le préfixe "/commentaire"
  app.use("/commentaire", router);
};

export default initCommentaireRoutes;
