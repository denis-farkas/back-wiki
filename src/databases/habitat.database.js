// Import du module pour exécuter les requêtes SQL
import query from "./init.database.js";

// Fonction pour créer un nouveau message
const createHabitat = async (libelle, description) => {
  const sql = `
        INSERT INTO habitat (libelle, description)
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
const readHabitats = async () => {
  const sql = `
        SELECT id_habitat, description, libelle
        FROM habitat
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
const readOneHabitat = async (id_habitat) => {
  const sql = `
        SELECT description, libelle
        FROM habitat
        WHERE id_habitat = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_habitat]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour mettre à jour un message en fonction de son ID
const updateHabitat = async (id_habitat, libelle, description) => {
  const sql = `
        UPDATE habitat
        SET libelle = ?, description = ?
        WHERE id_habitat = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_habitat, libelle, description]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour supprimer un message en fonction de son ID
const deleteOneHabitat = async (id_habitat) => {
  const sql = `
        DELETE FROM habitat
        WHERE id_habitat = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_habitat]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Exportation des fonctions dans message.controller
export const HabitatDB = {
  createHabitat,
  readHabitats,
  readOneHabitat,
  updateHabitat,
  deleteOneHabitat,
};
