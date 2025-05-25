import { ContributionDB } from "../databases/contribution.database.js";
import { EspeceDB } from "../databases/espece.database.js";
import multer from "multer";
import path from "path";

// Configuration de multer pour le stockage des images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/especes/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "image_1", maxCount: 1 },
  { name: "image_2", maxCount: 1 },
  { name: "image_3", maxCount: 1 },
]);

// Fonction pour créer une contribution
const createContribution = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de l'upload des images" });
    }

    const {
      date_creation,
      validation,
      user_id,
      id_espece,
      nom_commun,
      nom_scientifique,
      description,
      taille_max,
      alimentation,
      temperature,
      dificulte,
      cree_le,
      id_temperament,
      id_famille,
      id_habitat,
    } = req.body;

    const image_1 = req.files["image_1"] ? req.files["image_1"][0].path : null;
    const image_2 = req.files["image_2"] ? req.files["image_2"][0].path : null;
    const image_3 = req.files["image_3"] ? req.files["image_3"][0].path : null;

    const response = await ContributionDB.createContribution(
      date_creation,
      validation,
      user_id,
      id_espece,
      nom_commun,
      nom_scientifique,
      description,
      taille_max,
      alimentation,
      temperature,
      dificulte,
      cree_le,
      id_temperament,
      id_famille,
      id_habitat,
      image_1,
      image_2,
      image_3
    );
    const result = response.result;

    return res.status(201).json({ message: "OK", contributions: result });
  });
};

// Fonction pour récupérer toutes les contributions
const readContributions = async (req, res) => {
  const contributionResponse = await ContributionDB.readContributions();
  const contributions = contributionResponse.result;

  return res.status(200).json({ message: "OK", contributions });
};

const readUserContributions = async (req, res) => {
  const user_id = req.params.user_id;
  const contributionResponse = await ContributionDB.readContributions(user_id);
  const contributions = contributionResponse.result;

  return res.status(200).json({ message: "OK", contributions });
};

// Fonction pour récupérer une contribution spécifique
const readOneContribution = async (req, res) => {
  const id_contribution = req.params.id_contribution;

  const response = await ContributionDB.readOneContribution(id_contribution);
  const result = response.result;

  const contribution = {
    id_contribution,
    date_creation: result[0].date_creation,
    validation: result[0].validation,
    user_id: result[0].user_id,
    id_espece: result[0].id_espece,
    nom_commun: result[0].nom_commun,
    nom_scientifique: result[0].nom_scientifique,
    description: result[0].description,
    taille_max: result[0].taille_max,
    alimentation: result[0].alimentation,
    temperature: result[0].temperature,
    dificulte: result[0].dificulte,
    cree_le: result[0].cree_le,
    id_temperament: result[0].id_temperament,
    id_famille: result[0].id_famille,
    id_habitat: result[0].id_habitat,
    image_1: result[0].image_1,
    image_2: result[0].image_2,
    image_3: result[0].image_3,
  };

  return res.status(200).json({ message: "Requête OK", contribution });
};

// Fonction pour modifier une contribution
const updateContribution = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de l'upload des images" });
    }

    // Get authenticated user ID from JWT token (not request body)
    const authenticatedUserId = req.body.userId; // This comes from jwtMdlwr

    // Get contribution ID from request
    const { id_contribution } = req.body;

    // First check if contribution exists and belongs to this user
    const existingContribution = await ContributionDB.readOneContribution(
      id_contribution
    );

    // If contribution doesn't exist
    if (
      !existingContribution ||
      !existingContribution.result ||
      existingContribution.result.length === 0
    ) {
      return res.status(404).json({ message: "Contribution non trouvée" });
    }

    // Check if authenticated user is the owner of this contribution
    if (existingContribution.result[0].user_id != authenticatedUserId) {
      return res.status(403).json({
        message:
          "Accès refusé: vous ne pouvez modifier que vos propres contributions",
      });
    }

    const {
      date_creation,
      id_espece,
      nom_commun,
      nom_scientifique,
      description,
      taille_max,
      alimentation,
      temperature,
      dificulte,
      cree_le,
      id_temperament,
      id_famille,
      id_habitat,
    } = req.body;

    const image_1 = req.files["image_1"] ? req.files["image_1"][0].path : null;
    const image_2 = req.files["image_2"] ? req.files["image_2"][0].path : null;
    const image_3 = req.files["image_3"] ? req.files["image_3"][0].path : null;

    const response = await ContributionDB.updateContribution(
      date_creation,
      id_espece,
      nom_commun,
      nom_scientifique,
      description,
      taille_max,
      alimentation,
      temperature,
      dificulte,
      cree_le,
      id_temperament,
      id_famille,
      id_habitat,
      image_1,
      image_2,
      image_3,
      id_contribution
    );

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    return res.status(200).json({
      message: `La contribution numéro ${id_contribution} a été modifiée`,
    });
  });
};

// Fonction pour modifier la validation d'une contribution (webmaster uniquement)
const updateValidation = async (req, res) => {
  try {
    const { id_contribution, validation } = req.body;

    // First update the validation status
    const response = await ContributionDB.updateValidation(
      validation,
      id_contribution
    );

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    // If contribution is now validated (assuming validation=1 means approved)
    if (validation === 1 || validation === "1" || validation === true) {
      // Get the full contribution data
      const contributionData = await ContributionDB.readOneContribution(
        id_contribution
      );

      if (
        !contributionData ||
        !contributionData.result ||
        contributionData.result.length === 0
      ) {
        return res.status(404).json({ message: "Contribution non trouvée" });
      }

      const contribution = contributionData.result[0];

      // Update or create species with contribution data
      const speciesResponse = await EspeceDB.updateEspece(contribution);

      if (speciesResponse.error) {
        validation = 0; // Revert validation if species creation fails
        await ContributionDB.updateValidation(id_contribution, validation);
        return res.status(500).json({
          message:
            "La validation n'a pas été mise à jour car l'espèce n'a pas pu être modifiée",
          error: speciesResponse.error,
        });
      }
    }

    return res.status(200).json({
      message: `La validation de la contribution ${id_contribution} a été mise à jour`,
    });
  } catch (error) {
    console.error("Error in updateValidation:", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur lors de la validation" });
  }
};
// Fonction pour supprimer une contribution
const deleteOneContribution = async (req, res) => {
  const id_contribution = req.params.id_contribution;

  const response = await ContributionDB.deleteOneContribution(id_contribution);
  const error = response.error;

  if (error) {
    return res.status(500).json({ message: error });
  } else {
    return res.status(200).json({ message: "Contribution supprimée" });
  }
};

// Exportation des fonctions du contrôleur
export const ContributionController = {
  createContribution,
  readContributions,
  readUserContributions,
  readOneContribution,
  updateContribution,
  updateValidation,
  deleteOneContribution,
};
