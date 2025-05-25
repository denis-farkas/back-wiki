import { CommentaireDB } from "../databases/commentaire.database.js";

// Fonction pour créer un commentaire
const createCommentaire = async (req, res) => {
  // Extraction des données de la requête
  const { note, commentaire, date, validation, user_id, id_espece } = req.body;

  // Appel à la fonction de la base de données pour créer un commentaire
  const response = await CommentaireDB.createCommentaire(
    note,
    commentaire,
    date,
    validation,
    user_id,
    id_espece
  );
  const result = response.result;

  // Retour d'une réponse avec le statut 201 (Créé) et les données du commentaire créé
  return res.status(201).json({ message: "OK", commentaires: result });
};

// Fonction pour récupérer tous les commentaires
const readCommentaires = async (req, res) => {
  // Appel à la fonction de la base de données pour récupérer tous les commentaires
  const commentaireResponse = await CommentaireDB.readCommentaires();
  const commentaires = commentaireResponse.result;

  // Retour d'une réponse avec le statut 200 (OK) et les données des commentaires
  return res.status(200).json({ message: "OK", commentaires });
};

const readCommentairesByEspece = async (req, res) => {
  // Extraction de l'identifiant de l'espèce à partir des paramètres de la requête
  const id_espece = req.params.id_espece;

  // Appel à la fonction de la base de données pour récupérer les commentaires par espèce
  const response = await CommentaireDB.readCommentairesByEspece(id_espece);
  const result = response.result;

  // Retour d'une réponse avec le statut 200 (OK) et les données des commentaires pour l'espèce spécifiée
  return res.status(200).json({ message: "Requête OK", commentaires: result });
};

const readUserCommentaires = async (req, res) => {
  const user_id = req.params.user_id;
  const commentaireResponse = await CommentaireDB.readCommentaires(user_id);
  const commentaires = commentaireResponse.result;
  return res.status(200).json({ message: "OK", commentaires });
};

// Fonction pour récupérer un commentaire spécifique par son identifiant
const readOneCommentaire = async (req, res) => {
  // Extraction de l'identifiant du commentaire à partir des paramètres de la requête
  const id_commentaire = req.params.id_commentaire;

  // Appel à la fonction de la base de données pour récupérer un commentaire spécifique par son identifiant
  const response = await CommentaireDB.readOneCommentaire(id_commentaire);
  const result = response.result;

  // Création d'un objet représentant le commentaire avec des propriétés spécifiques
  const commentaire = {
    id_commentaire,
    note: result[0].note,
    commentaire: result[0].commentaire,
    date: result[0].date,
    validation: result[0].validation,
    user_id: result[0].user_id,
    id_espece: result[0].id_espece,
  };

  // Retour d'une réponse avec le statut 200 (OK) et les données du commentaire spécifié
  return res.status(200).json({ message: "Requête OK", commentaire });
};

// Fonction pour modifier un commentaire
const updateCommentaire = async (req, res) => {
  // Extraction des données de la requête
  const {
    note,
    commentaire,
    date,
    validation,
    user_id,
    id_espece,
    id_commentaire,
  } = req.body;

  // Appel à la fonction de la base de données pour mettre à jour un commentaire
  const response = await CommentaireDB.updateCommentaire(
    note,
    commentaire,
    date,
    validation,
    user_id,
    id_espece,
    id_commentaire
  );

  // Vérification des erreurs lors de la mise à jour
  if (response.error) {
    // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
    return res.status(500).json({ message: response.error });
  }

  // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un message indiquant la mise à jour réussie
  return res
    .status(200)
    .json({ message: `Le commentaire numéro ${id_commentaire} a été modifié` });
};

// Fonction pour supprimer un commentaire par son identifiant
const deleteOneCommentaire = async (req, res) => {
  // Extraction de l'identifiant du commentaire à partir des paramètres de la requête
  const id_commentaire = req.params.id_commentaire;

  // Appel à la fonction de la base de données pour supprimer un commentaire
  const response = await CommentaireDB.deleteOneCommentaire(id_commentaire);

  // Récupération d'une éventuelle erreur
  const error = response.error; // soit une chaîne de caractères, soit null

  // Vérification de la présence d'une erreur
  if (error) {
    // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
    return res.status(500).json({ message: error });
  } else {
    // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un message indiquant la suppression réussie
    return res.status(200).json({ message: "Commentaire supprimé" });
  }
};
const updateValidation = async (req, res) => {
  if (req.user.role !== "webmaster") {
    return res
      .status(403)
      .json({ message: "Accès non autorisé. Réservé au webmaster." });
  }

  const { id_commentaire, validation } = req.body;

  const response = await ContributionDB.updateValidation(
    id_commentaire,
    validation
  );

  if (response.error) {
    return res.status(500).json({ message: response.error });
  }

  return res.status(200).json({
    message: `La validation du commentaire ${id_commentaire} a été mise à jour`,
  });
};

// Exportation de l'objet contenant toutes les fonctions du contrôleur des commentaires
export const CommentaireController = {
  createCommentaire,
  readCommentaires,
  readUserCommentaires,
  readOneCommentaire,
  updateCommentaire,
  deleteOneCommentaire,
  updateValidation,
  readCommentairesByEspece,
};
