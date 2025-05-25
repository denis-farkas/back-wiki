// Import du module pour exécuter les requêtes SQL
import query from "./init.database.js";

// Fonction pour créer un nouveau message
const createTemperament = async (libelle, description) => {
  const sql = `
        INSERT INTO temperament (libelle, description)
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
const readTemperaments = async () => {
  const sql = `
        SELECT id_temperament, description, libelle
        FROM temperament
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
const readOneTemperament = async (id_temperament) => {
  const sql = `
        SELECT libelle, description
        FROM temperament
        WHERE id_temperament = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_temperament]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour mettre à jour un message en fonction de son ID
const updateTemperament = async (id_temperament, libelle, description) => {
  const sql = `
        UPDATE temperament
        SET libelle = ?, description = ?
        WHERE id_temperament = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_temperament, libelle, description]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour supprimer un message en fonction de son ID
const deleteOneTemperament = async (id_temperament) => {
  const sql = `
        DELETE FROM temperament
        WHERE id_temperament = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_temperament]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Exportation des fonctions dans message.controller
export const TemperamentDB = {
  createTemperament,
  readTemperaments,
  readOneTemperament,
  updateTemperament,
  deleteOneTemperament,
};
