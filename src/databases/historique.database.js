// Import du module pour exécuter les requêtes SQL
import query from "./init.database.js";

// Fonction pour créer un nouveau message
const createHistorique = async (recherche, date, user_id) => {
  const sql = `
        INSERT INTO historique (recherche, date, user_id)
        VALUES (?, ?, ?)
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [recherche, date, user_id]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour récupérer les 5 premiers messages de la base de données
const readHistoriques = async () => {
  const sql = `
        SELECT id_historique, recherche, date, user_id
        FROM historique
        ORDER BY date DESC
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
const readOneHistorique = async (id_historique) => {
  const sql = `
        SELECT recherche, date, user_id
        FROM historique
        WHERE id_historique = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_historique]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour mettre à jour un message en fonction de son ID
const updateHistorique = async (id_historique, recherche, date, user_id) => {
  const sql = `
        UPDATE historique
        SET recherche = ?, date = ?, user_id = ?
        WHERE id_historique = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [recherche, date, user_id, id_historique]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour supprimer un message en fonction de son ID
const deleteOneHistorique = async (id_historique) => {
  const sql = `
        DELETE FROM historique
        WHERE id_historique = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_historique]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};
// Fonction pour récupérer l'historique d'un utilisateur spécifique
const readHistoriqueByUser = async (id_user) => {
  const sql = `
        SELECT * FROM historique 
        WHERE user_id = ? 
        ORDER BY date DESC
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_user]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

export const HistoriqueDB = {
  createHistorique,
  readHistoriques,
  readOneHistorique,
  updateHistorique,
  deleteOneHistorique,
  readHistoriqueByUser,
};
