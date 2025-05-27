import { HistoriqueDB } from "../databases/historique.database.js";

// Fonction pour créer un historique
const createHistorique = async (req, res) => {
  try {
    // Extraction des données de la requête
    const { recherche, date, user_id } = req.body;

    // Validation des données
    if (!recherche || !user_id) {
      return res.status(400).json({
        message: "Recherche et user_id sont requis",
      });
    }

    // Appel à la fonction de la base de données pour créer un historique
    const response = await HistoriqueDB.createHistorique(
      recherche,
      date,
      user_id
    );

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    // Retour d'une réponse avec le statut 201 (Créé)
    return res.status(201).json({
      message: "Historique créé avec succès",
      historique: response.result,
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'historique:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer l'historique d'un utilisateur spécifique
const readHistoriqueByUser = async (req, res) => {
  try {
    // Extraction de l'ID utilisateur à partir des paramètres de la requête
    const user_id = req.params.user_id;

    if (!user_id) {
      return res.status(400).json({ message: "ID utilisateur requis" });
    }

    // Appel à la fonction de la base de données
    const response = await HistoriqueDB.readHistoriqueByUser(user_id);

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    const historiques = response.result || [];

    // Retour d'une réponse avec le statut 200 (OK) et les données
    return res.status(200).json({ message: "OK", historiques });
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer tous les historiques
const readHistoriques = async (req, res) => {
  // Appel à la fonction de la base de données pour récupérer tous les historiques
  const historiqueResponse = await HistoriqueDB.readHistoriques();
  const historiques = historiqueResponse.result;

  // Retour d'une réponse avec le statut 200 (OK) et les données des historiques
  return res.status(200).json({ message: "OK", historiques });
};

// Fonction pour récupérer un historique spécifique par son identifiant
const readOneHistorique = async (req, res) => {
  // Extraction de l'identifiant de l'historique à partir des paramètres de la requête
  const id_historique = req.params.id_historique;

  // Appel à la fonction de la base de données pour récupérer un historique spécifique par son identifiant
  const response = await HistoriqueDB.readOneHistorique(id_historique);
  const result = response.result;

  // Création d'un objet représentant l'historique avec des propriétés spécifiques
  const historique = {
    id_historique,
    recherche: result[0].recherche,
    date: result[0].date,
    user_id: result[0].user_id,
  };

  // Retour d'une réponse avec le statut 200 (OK) et les données de l'historique spécifié
  return res.status(200).json({ message: "Requête OK", historique });
};

// Fonction pour modifier un historique
const updateHistorique = async (req, res) => {
  // Extraction des données de la requête
  const { recherche, date, user_id, id_historique } = req.body;

  // Appel à la fonction de la base de données pour mettre à jour un historique
  const response = await HistoriqueDB.updateHistorique(
    recherche,
    date,
    user_id,
    id_historique
  );

  // Vérification des erreurs lors de la mise à jour
  if (response.error) {
    // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
    return res.status(500).json({ message: response.error });
  }

  // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un message indiquant la mise à jour réussie
  return res
    .status(200)
    .json({ message: `L'historique numéro ${id_historique} a été modifié` });
};

// Fonction pour supprimer un historique par son identifiant
const deleteOneHistorique = async (req, res) => {
  // Extraction de l'identifiant de l'historique à partir des paramètres de la requête
  const id_historique = req.params.id_historique;

  // Appel à la fonction de la base de données pour supprimer un historique
  const response = await HistoriqueDB.deleteOneHistorique(id_historique);

  // Récupération d'une éventuelle erreur
  const error = response.error; // soit une chaîne de caractères, soit null

  // Vérification de la présence d'une erreur
  if (error) {
    // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
    return res.status(500).json({ message: error });
  } else {
    // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un message indiquant la suppression réussie
    return res.status(200).json({ message: "Historique supprimé" });
  }
};

export const HistoriqueController = {
  createHistorique,
  readHistoriques,
  readOneHistorique,
  updateHistorique,
  deleteOneHistorique,
  readHistoriqueByUser,
};
