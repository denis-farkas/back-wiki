import { EspeceDB } from "../databases/espece.database.js";

// Fonction pour créer un espece
const createEspece = async (req, res) => {
  try {
    // Extraction des données de la requête (URLs Cloudinary incluses)
    const {
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
      image_1, // Now a Cloudinary URL
      image_2, // Now a Cloudinary URL
      image_3, // Now a Cloudinary URL
    } = req.body;

    // Validation des champs obligatoires
    if (!nom_commun || !nom_scientifique) {
      return res
        .status(400)
        .json({ message: "Les champs obligatoires sont manquants" });
    }

    // Appel à la fonction de la base de données pour créer un espece
    const response = await EspeceDB.createEspece(
      nom_commun,
      nom_scientifique,
      description,
      taille_max,
      alimentation,
      temperature,
      dificulte,
      cree_le,
      cree_le, // Use cree_le for modifie_le initially
      id_temperament,
      id_famille,
      id_habitat,
      null, // id_contribution_valide
      image_1,
      image_2,
      image_3
    );

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    return res.status(201).json({
      message: "Espèce créée avec succès",
      id_espece: response.result.insertId,
    });
  } catch (error) {
    console.error("Controller error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer tous les especes
const readEspeces = async (req, res) => {
  try {
    const especeResponse = await EspeceDB.readEspeces();

    if (especeResponse.error) {
      return res.status(500).json({ message: especeResponse.error });
    }

    const especes = especeResponse.result;
    return res.status(200).json({ message: "OK", especes });
  } catch (error) {
    console.error("Error fetching especes:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Fonction pour récupérer un espece spécifique par son identifiant
const readOneEspece = async (req, res) => {
  try {
    const id_espece = req.params.id_espece;
    const response = await EspeceDB.readOneEspece(id_espece);

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    if (!response.result || response.result.length === 0) {
      return res.status(404).json({ message: "Espèce non trouvée" });
    }

    const result = response.result;
    const espece = {
      id_espece,
      nom_commun: result[0].nom_commun,
      nom_scientifique: result[0].nom_scientifique,
      description: result[0].description,
      taille_max: result[0].taille_max,
      alimentation: result[0].alimentation,
      temperature: result[0].temperature,
      dificulte: result[0].dificulte,
      cree_le: result[0].cree_le,
      modifie_le: result[0].modifie_le,
      id_temperament: result[0].id_temperament,
      id_famille: result[0].id_famille,
      id_habitat: result[0].id_habitat,
      id_contribution_valide: result[0].id_contribution_valide,
      image_1: result[0].image_1, // Cloudinary URL
      image_2: result[0].image_2, // Cloudinary URL
      image_3: result[0].image_3, // Cloudinary URL
    };

    return res.status(200).json({ message: "Requête OK", espece });
  } catch (error) {
    console.error("Error fetching espece:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Fonction pour modifier une espece
const updateEspece = async (req, res) => {
  try {
    const {
      nom_commun,
      nom_scientifique,
      description,
      taille_max,
      alimentation,
      temperature,
      dificulte,
      cree_le,
      modifie_le,
      id_temperament,
      id_famille,
      id_habitat,
      id_contribution_valide,
      image_1, // Now a Cloudinary URL
      image_2, // Now a Cloudinary URL
      image_3, // Now a Cloudinary URL
    } = req.body;

    const id_espece = req.params.id_espece;

    // Validation
    if (!id_espece) {
      return res.status(400).json({ message: "ID de l'espèce manquant" });
    }

    // Log the received data
    console.log("Update request for espece:", id_espece, {
      nom_commun,
      nom_scientifique,
    });

    const response = await EspeceDB.updateEspece(
      nom_commun,
      nom_scientifique,
      description,
      taille_max,
      alimentation,
      temperature,
      dificulte,
      cree_le,
      modifie_le,
      id_temperament,
      id_famille,
      id_habitat,
      id_contribution_valide,
      image_1,
      image_2,
      image_3,
      id_espece
    );

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    return res.status(200).json({
      message: `L'espece numéro ${id_espece} a été modifié`,
    });
  } catch (error) {
    console.error("Controller error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Fonction pour supprimer un espece par son identifiant
const deleteOneEspece = async (req, res) => {
  try {
    const id_espece = req.params.id_espece;

    if (!id_espece) {
      return res.status(400).json({ message: "ID de l'espèce manquant" });
    }

    const response = await EspeceDB.deleteOneEspece(id_espece);

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    return res.status(200).json({ message: "Espèce supprimée avec succès" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// Fonction pour rechercher des espèces
const searchEspeces = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Terme de recherche requis" });
    }

    // Appel à la fonction de la base de données pour rechercher des espèces
    const response = await EspeceDB.searchEspeces(q);

    if (response.error) {
      return res.status(500).json({ message: response.error });
    }

    const especes = response.result;
    return res.status(200).json({ message: "OK", especes });
  } catch (error) {
    console.error("Error searching especes:", error);
    return res.status(500).json({ message: error.message });
  }
};
// Exportation de l'objet contenant toutes les fonctions du contrôleur des especes
export const EspeceController = {
  createEspece,
  readEspeces,
  readOneEspece,
  updateEspece,
  deleteOneEspece,
  searchEspeces,
};
