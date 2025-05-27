// Import du module pour exécuter les requêtes SQL
import query from "./init.database.js";

// Fonction pour créer un nouveau message
const createEspece = async (
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
  image_3
) => {
  const sql = `
          INSERT INTO espece (
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
          image_3)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

  let error = null;
  let result = null;

  try {
    // Log all parameters for debugging
    console.log("Full create parameters:", {
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
    });

    // Convert empty strings to null for database compatibility
    const safeParams = [
      nom_commun || null,
      nom_scientifique || null,
      description || null,
      taille_max || null,
      alimentation || null,
      temperature || null,
      dificulte || null,
      cree_le || null,
      modifie_le || null,
      id_temperament || null,
      id_famille || null,
      id_habitat || null,
      id_contribution_valide || null,
      image_1 || null,
      image_2 || null,
      image_3 || null,
    ];

    console.log("Safe params for database:", safeParams);

    result = await query(sql, safeParams);
    console.log("Database insert result:", result);
  } catch (e) {
    error = e.message;
    console.error("Error creating espece:", e);
  } finally {
    return { error, result };
  }
};

// Fonction pour récupérer toutes les espèces de la base de données
const readEspeces = async () => {
  const sql = `
        SELECT *
        FROM espece
        ORDER BY nom_scientifique DESC
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql);
  } catch (e) {
    error = e.message;
    console.error("Error reading especes:", e);
  } finally {
    return { error, result };
  }
};

// Fonction pour récupérer une seule espèce en fonction de son ID
const readOneEspece = async (id_espece) => {
  const sql = `
        SELECT *
        FROM espece
        WHERE id_espece = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_espece]);
  } catch (e) {
    error = e.message;
    console.error("Error reading single espece:", e);
  } finally {
    return { error, result };
  }
};

// Fonction pour mettre à jour une espèce en fonction de son ID
const updateEspece = async (
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
) => {
  const sql = `
        UPDATE espece
        SET nom_commun = ?, nom_scientifique = ?, description = ?, taille_max = ?, alimentation = ?, temperature = ?, dificulte = ?, 
        cree_le = ?, modifie_le = ?, id_temperament = ?, id_famille = ?, id_habitat = ?, id_contribution_valide = ?, image_1 = ?, image_2 = ?, image_3 = ?
        WHERE id_espece = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [
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
      id_contribution_valide || null, // Handle null/undefined case
      image_1,
      image_2,
      image_3,
      id_espece, // id_espece needs to be last to match the WHERE clause
    ]);
  } catch (e) {
    error = e.message;
    console.error("Error updating espece:", e);
  } finally {
    return { error, result };
  }
};

// Fonction pour supprimer une espèce en fonction de son ID
const deleteOneEspece = async (id_espece) => {
  const sql = `
        DELETE FROM espece
        WHERE id_espece = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_espece]);
  } catch (e) {
    error = e.message;
    console.error("Error deleting espece:", e);
  } finally {
    return { error, result };
  }
};

// Fonction pour rechercher des espèces
const searchEspeces = async (searchTerm) => {
  const sql = `
    SELECT e.*, f.libelle as famille, h.libelle as habitat, t.libelle as temperament
    FROM espece e
    LEFT JOIN famille f ON e.id_famille = f.id_famille
    LEFT JOIN habitat h ON e.id_habitat = h.id_habitat
    LEFT JOIN temperament t ON e.id_temperament = t.id_temperament
    WHERE 
      e.nom_commun LIKE ? OR 
      e.nom_scientifique LIKE ? OR
      e.description LIKE ? OR
      f.libelle LIKE ? OR
      h.libelle LIKE ? OR
      t.libelle LIKE ?
  `;

  let error = null;
  let result = null;

  try {
    // Format du terme pour la recherche partielle
    const formattedSearchTerm = `%${searchTerm}%`;
    // Remplir un tableau avec le même terme pour les 6 emplacements
    result = await query(sql, Array(6).fill(formattedSearchTerm));
  } catch (e) {
    error = e.message;
    console.error("Error searching especes:", e);
  } finally {
    return { error, result };
  }
};

export const EspeceDB = {
  createEspece,
  readEspeces,
  readOneEspece,
  updateEspece,
  deleteOneEspece,
  searchEspeces, // Ajout de la fonction de recherche
};
