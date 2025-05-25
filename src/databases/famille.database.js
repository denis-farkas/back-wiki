// Import du module pour exécuter les requêtes SQL
import query from "./init.database.js";

// Fonction pour créer un nouveau message
const createFamille = async (libelle, description) => {
  const sql = `
        INSERT INTO famille (libelle, description)
        VALUES (?, ?)
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [libelle, description]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour récupérer les 5 premiers messages de la base de données
const readFamilles = async () => {
  const sql = `
        SELECT id_famille, description, libelle
        FROM famille
        ORDER BY libelle DESC
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

// Fonction pour récupérer un seul message en fonction de son ID
const readOneFamille = async (id_famille) => {
  const sql = `
        SELECT description, libelle
        FROM famille
        WHERE id_famille = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_famille]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour mettre à jour un message en fonction de son ID
const updateFamille = async (id_famille, libelle, description) => {
  const sql = `
        UPDATE famille
        SET libelle = ?, description = ?
        WHERE id_famille = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_famille, libelle, description]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour supprimer un message en fonction de son ID
const deleteOneFamille = async (id_famille) => {
  const sql = `
        DELETE FROM famille
        WHERE id_famille = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_famille]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Exportation des fonctions dans message.controller
export const FamilleDB = {
  createFamille,
  readFamilles,
  readOneFamille,
  updateFamille,
  deleteOneFamille,
};
