import { CommentaireDB } from "../databases/commentaire.database.js";

// Fonction pour créer un commentaire
const createCommentaire = async (req, res) => {
  try {
    // Extraction des données de la requête
    const { note, commentaire, date, validation, user_id, id_espece } =
      req.body;

    // Validation des données requises
    if (!commentaire || !user_id || !id_espece) {
      return res.status(400).json({
        message: "Commentaire, user_id et id_espece sont requis",
      });
    }

    // Appel à la fonction de la base de données pour créer un commentaire
    const response = await CommentaireDB.createCommentaire(
      note,
      commentaire,
      date,
      validation,
      user_id,
      id_espece
    );

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    // Retour d'une réponse avec le statut 201 (Créé)
    return res.status(201).json({
      message: "Commentaire créé avec succès",
      commentaire: response.result,
    });
  } catch (error) {
    console.error("Erreur lors de la création du commentaire:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer tous les commentaires avec pseudo
const readCommentaires = async (req, res) => {
  try {
    // Appel à la fonction de la base de données pour récupérer tous les commentaires
    const response = await CommentaireDB.readCommentaires();

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    const commentaires = response.result || [];

    // Retour d'une réponse avec le statut 200 (OK) et les données des commentaires
    return res.status(200).json({ message: "OK", commentaires });
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer les commentaires par espèce avec pseudo
const readCommentairesByEspece = async (req, res) => {
  try {
    // Extraction de l'identifiant de l'espèce à partir des paramètres de la requête
    const id_espece = req.params.id_espece;

    if (!id_espece) {
      return res.status(400).json({ message: "ID espèce requis" });
    }

    // Appel à la fonction de la base de données pour récupérer les commentaires par espèce
    const response = await CommentaireDB.readCommentairesByEspece(id_espece);

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    const commentaires = response.result || [];

    // Retour d'une réponse avec le statut 200 (OK) et les données des commentaires
    return res.status(200).json({ message: "OK", commentaires });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des commentaires par espèce:",
      error
    );
    return res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer les commentaires d'un utilisateur avec pseudo
const readUserCommentaires = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    if (!user_id) {
      return res.status(400).json({ message: "ID utilisateur requis" });
    }

    // Appel à la fonction de la base de données
    const response = await CommentaireDB.readUserCommentaires(user_id);

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    const commentaires = response.result || [];
    return res.status(200).json({ message: "OK", commentaires });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des commentaires utilisateur:",
      error
    );
    return res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer un commentaire spécifique par son identifiant avec pseudo
const readOneCommentaire = async (req, res) => {
  try {
    // Extraction de l'identifiant du commentaire à partir des paramètres de la requête
    const id_commentaire = req.params.id_commentaire;

    if (!id_commentaire) {
      return res.status(400).json({ message: "ID commentaire requis" });
    }

    // Appel à la fonction de la base de données pour récupérer un commentaire spécifique
    const response = await CommentaireDB.readOneCommentaire(id_commentaire);

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    if (!response.result || response.result.length === 0) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    const result = response.result[0];

    // Création d'un objet représentant le commentaire avec toutes les propriétés
    const commentaire = {
      id_commentaire,
      note: result.note,
      commentaire: result.commentaire,
      date: result.date,
      validation: result.validation,
      user_id: result.user_id,
      id_espece: result.id_espece,
      user_pseudo: result.user_pseudo,
    };

    // Retour d'une réponse avec le statut 200 (OK) et les données du commentaire
    return res.status(200).json({ message: "OK", commentaire });
  } catch (error) {
    console.error("Erreur lors de la récupération du commentaire:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Fonction pour modifier un commentaire
const updateCommentaire = async (req, res) => {
  try {
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

    if (!id_commentaire) {
      return res.status(400).json({ message: "ID commentaire requis" });
    }

    // Appel à la fonction de la base de données pour mettre à jour un commentaire
    const response = await CommentaireDB.updateCommentaire(
      id_commentaire,
      note,
      commentaire,
      date,
      validation,
      user_id,
      id_espece
    );

    // Vérification des erreurs lors de la mise à jour
    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    // En cas de succès, retour d'une réponse avec le statut 200 (OK)
    return res.status(200).json({
      message: `Le commentaire numéro ${id_commentaire} a été modifié`,
    });
  } catch (error) {
    console.error("Erreur lors de la modification du commentaire:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Fonction pour supprimer un commentaire par son identifiant
const deleteOneCommentaire = async (req, res) => {
  try {
    // Extraction de l'identifiant du commentaire à partir des paramètres de la requête
    const id_commentaire = req.params.id_commentaire;

    if (!id_commentaire) {
      return res.status(400).json({ message: "ID commentaire requis" });
    }

    // Appel à la fonction de la base de données pour supprimer un commentaire
    const response = await CommentaireDB.deleteOneCommentaire(id_commentaire);

    // Vérification de la présence d'une erreur
    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    // En cas de succès, retour d'une réponse avec le statut 200 (OK)
    return res
      .status(200)
      .json({ message: "Commentaire supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Fonction pour mettre à jour la validation d'un commentaire
const updateValidation = async (req, res) => {
  try {
    // Vérification du rôle (si vous avez un middleware d'authentification)
    // if (req.user.role !== "webmaster") {
    //   return res.status(403).json({
    //     message: "Accès non autorisé. Réservé au webmaster."
    //   });
    // }

    const { id_commentaire, validation } = req.body;

    if (!id_commentaire || validation === undefined) {
      return res.status(400).json({
        message: "ID commentaire et validation sont requis",
      });
    }

    const response = await CommentaireDB.updateValidation(
      id_commentaire,
      validation
    );

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    return res.status(200).json({
      message: `La validation du commentaire ${id_commentaire} a été mise à jour`,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la validation:", error);
    return res.status(500).json({ message: error.message });
  }
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
