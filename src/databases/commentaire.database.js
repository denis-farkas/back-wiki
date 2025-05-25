// Import du module pour exécuter les requêtes SQL
import query from "./init.database.js";

// Fonction pour créer un nouveau commentaire
const createCommentaire = async (
  note,
  commentaire,
  date,
  validation,
  user_id,
  id_espece
) => {
  const sql = `
        INSERT INTO commentaire (note, commentaire, date, validation, user_id, id_espece)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [
      note,
      commentaire,
      date,
      validation,
      user_id,
      id_espece,
    ]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour récupérer tous les commentaires de la base de données
const readCommentaires = async () => {
  const sql = `
        SELECT id_commentaire, note, commentaire, date, validation, user_id, id_espece
        FROM commentaire
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
// Fonction pour récupérer les commentaires en fonction de l'ID d'une espèce
const readCommentairesByEspece = async (id_espece) => {
  const sql = `
        SELECT id_commentaire, note, commentaire, date, validation, user_id, id_espece
        FROM commentaire
        WHERE id_espece = ?
        ORDER BY date DESC
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_espece]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

const readUserCommentaires = async (req, res) => {
  const user_id = req.params.user_id;
  const commentaireResponse = await CommentaireDB.readCommentaires(user_id);
  const commentaires = commentaireResponse.result;

  return res.status(200).json({ message: "OK", commentaires });
};

// Fonction pour récupérer un seul commentaire en fonction de son ID
const readOneCommentaire = async (id_commentaire) => {
  const sql = `
        SELECT note, commentaire, date, validation, user_id, id_espece
        FROM commentaire
        WHERE id_commentaire = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_commentaire]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour mettre à jour un commentaire en fonction de son ID
const updateCommentaire = async (
  id_commentaire,
  note,
  commentaire,
  date,
  validation,
  user_id,
  id_espece
) => {
  const sql = `
        UPDATE commentaire
        SET note = ?, commentaire = ?, date = ?, validation = ?, user_id = ?, id_espece = ?
        WHERE id_commentaire = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [
      note,
      commentaire,
      date,
      validation,
      user_id,
      id_espece,
      id_commentaire,
    ]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Fonction pour supprimer un commentaire en fonction de son ID
const deleteOneCommentaire = async (id_commentaire) => {
  const sql = `
        DELETE FROM commentaire
        WHERE id_commentaire = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [id_commentaire]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};
const updateValidation = async (id_commentaire, validation) => {
  const sql = `
        UPDATE commmentaire
        SET validation = ?
        WHERE id_commentaire = ?
    `;

  let error = null;
  let result = null;

  try {
    result = await query(sql, [validation, id_commentaire]);
  } catch (e) {
    error = e.message;
  } finally {
    return { error, result };
  }
};

// Exportation des fonctions dans commentaire.controller
export const CommentaireDB = {
  createCommentaire,
  readCommentaires,
  readUserCommentaires,
  readOneCommentaire,
  updateCommentaire,
  deleteOneCommentaire,
  updateValidation,
  readCommentairesByEspece,
};
