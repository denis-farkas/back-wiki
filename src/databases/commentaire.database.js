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

// Fonction pour récupérer tous les commentaires avec le pseudo utilisateur
const readCommentaires = async () => {
  const sql = `
        SELECT 
          c.id_commentaire, 
          c.note, 
          c.commentaire, 
          c.date, 
          c.validation, 
          c.user_id, 
          c.id_espece,
          u.pseudo as user_pseudo
        FROM commentaire c
        LEFT JOIN users u ON c.user_id = u.user_id
        ORDER BY c.date DESC
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

// Fonction pour récupérer les commentaires par espèce avec le pseudo utilisateur
const readCommentairesByEspece = async (id_espece) => {
  const sql = `
        SELECT 
          c.id_commentaire, 
          c.note, 
          c.commentaire, 
          c.date, 
          c.validation, 
          c.user_id, 
          c.id_espece,
          u.pseudo as user_pseudo
        FROM commentaire c
        LEFT JOIN users u ON c.user_id = u.user_id
        WHERE c.id_espece = ?
        ORDER BY c.date DESC
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

// Fonction pour récupérer les commentaires d'un utilisateur avec le pseudo
const readUserCommentaires = async (user_id) => {
  const sql = `
    SELECT 
      c.id_commentaire, 
      c.note, 
      c.commentaire, 
      c.date, 
      c.validation, 
      c.user_id, 
      c.id_espece,
      u.pseudo as user_pseudo
    FROM commentaire c
    LEFT JOIN users u ON c.user_id = u.user_id
    WHERE c.user_id = ?
    ORDER BY c.date DESC
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

// Fonction pour récupérer un seul commentaire avec le pseudo utilisateur
const readOneCommentaire = async (id_commentaire) => {
  const sql = `
        SELECT 
          c.note, 
          c.commentaire, 
          c.date, 
          c.validation, 
          c.user_id, 
          c.id_espece,
          u.pseudo as user_pseudo
        FROM commentaire c
        LEFT JOIN users u ON c.user_id = u.user_id
        WHERE c.id_commentaire = ?
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

// Correction de la faute de frappe dans updateValidation
const updateValidation = async (id_commentaire, validation) => {
  const sql = `
        UPDATE commentaire
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
