import { FamilleDB } from "../databases/famille.database.js";

// Fonction pour créer un famille
const createFamille = async (req, res) => {
  // Extraction des données de la requête
  const { libelle, description } = req.body;

  // Appel à la fonction de la base de données pour créer un famille
  const response = await FamilleDB.createFamille(libelle, description);
  const result = response.result;

  // Retour d'une réponse avec le statut 201 (Créé) et les données du famille créé
  return res.status(201).json({ message: "OK", familles: result });
};

// Fonction pour récupérer tous les familles
const readFamilles = async (req, res) => {
  // Appel à la fonction de la base de données pour récupérer tous les familles
  const familleResponse = await FamilleDB.readFamilles();
  const familles = familleResponse.result;

  // Retour d'une réponse avec le statut 200 (OK) et les données des familles
  return res.status(200).json({ message: "OK", familles });
};

// Fonction pour récupérer un famille spécifique par son identifiant
const readOneFamille = async (req, res) => {
  // Extraction de l'identifiant du famille à partir des paramètres de la requête
  const id_famille = req.params.id_famille;

  // Appel à la fonction de la base de données pour récupérer un famille spécifique par son identifiant
  const response = await FamilleDB.readOneFamille(id_famille);
  const result = response.result;

  // Création d'un objet représentant le famille avec des propriétés spécifiques
  const famille = {
    id_famille,
    libelle: result[0].libelle,
    description: result[0].description,
  };

  // Retour d'une réponse avec le statut 200 (OK) et les données du famille spécifié
  return res.status(200).json({ message: "Requête OK", famille });
};

// Fonction pour modifier un famille ???
const updateFamille = async (req, res) => {
  // Extraction des données de la requête
  const { libelle, description, id_famille } = req.body;

  // Appel à la fonction de la base de données pour mettre à jour un famille
  const response = await FamilleDB.updateFamille(
    libelle,
    description,
    id_famille
  );

  // Vérification des erreurs lors de la mise à jour
  if (response.error) {
    // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
    return res.status(500).json({ message: response.error });
  }

  // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un famille indiquant la mise à jour réussie
  return res
    .status(200)
    .json({ message: `La famille numéro ${id_famille} a été modifiée` });
};

// Fonction pour supprimer un famille par son identifiant
const deleteOneFamille = async (req, res) => {
  // Extraction de l'identifiant du famille à partir des paramètres de la requête
  const id_famille = req.params.id_famille;

  // Appel à la fonction de la base de données pour supprimer un famille
  const response = await FamilleDB.deleteOneFamille(id_famille);

  // Récupération d'une éventuelle erreur
  const error = response.error; // soit une chaîne de caractères, soit null

  // Vérification de la présence d'une erreur
  if (error) {
    // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
    return res.status(500).json({ message: error });
  } else {
    // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un famille indiquant la suppression réussie
    return res.status(200).json({ message: "Famille supprimé" });
  }
};

// Exportation de l'objet contenant toutes les fonctions du contrôleur des familles
export const FamilleController = {
  createFamille,
  readFamilles,
  readOneFamille,
  updateFamille,
  deleteOneFamille,
};
