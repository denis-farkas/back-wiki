// Import du module pour exécuter les requêtes SQL
import query from "./init.database.js";

// Fonction pour créer une nouvelle contribution
const createContribution = async (
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
  id_habitat
) => {
  const sql = `
        INSERT INTO contribution (date_creation, validation, user_id, id_espece, nom_commun, nom_scientifique, description, taille_max, alimentation, temperature, dificulte, cree_le, id_temperament, id_famille, id_habitat)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [
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
    ]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour récupérer toutes les contributions
const readContributions = async () => {
  const sql = `
        SELECT id_contribution, date_creation, validation, user_id, id_espece, nom_commun, nom_scientifique, description, taille_max, alimentation, temperature, dificulte, cree_le, id_temperament, id_famille, id_habitat
        FROM contribution
        ORDER BY date_creation DESC
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};
const readUserContributions = async (user_id) => {
  const sql = `
        SELECT id_contribution, date_creation, validation, user_id, id_espece, nom_commun, nom_scientifique, description, taille_max, alimentation, temperature, dificulte, cree_le, id_temperament, id_famille, id_habitat
        FROM contribution
        WHERE user_id = ?
        ORDER BY date_creation DESC
    `;
  let error = null;
  let result = null;
  try {
    result = await query(sql, [user_id]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour récupérer une seule contribution
const readOneContribution = async (id_contribution) => {
  const sql = `
        SELECT date_creation, validation, user_id, id_espece, nom_commun, nom_scientifique, description, taille_max, alimentation, temperature, dificulte, cree_le, id_temperament, id_famille, id_habitat
        FROM contribution
        WHERE id_contribution = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_contribution]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour mettre à jour une contribution
const updateContribution = async (
  id_contribution,
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
  image_3
) => {
  const sql = `
        UPDATE contribution
        SET date_creation = ?, id_espece = ?, nom_commun = ?, nom_scientifique = ?, description = ?, taille_max = ?, alimentation = ?, temperature = ?, dificulte = ?, cree_le = ?, id_temperament = ?, id_famille = ?, id_habitat = ?, image_1 = ?, image_2 = ?, image_3 = ? 
        WHERE id_contribution = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [
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
      id_contribution,
    ]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour supprimer une contribution
const deleteOneContribution = async (id_contribution) => {
  const sql = `
        DELETE FROM contribution
        WHERE id_contribution = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_contribution]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour mettre à jour la validation d'une contribution
const updateValidation = async (id_contribution, validation) => {
  const sql = `
        UPDATE contribution
        SET validation = ?
        WHERE id_contribution = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [validation, id_contribution]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Exportation des fonctions
export const ContributionDB = {
  createContribution,
  readContributions,
  readUserContributions,
  readOneContribution,
  updateContribution,
  deleteOneContribution,
  updateValidation,
};
