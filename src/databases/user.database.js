import query from "./init.database.js";

// Fonction pour vérifier l'existence d'un email dans la base de données
const emailExist = async(email) => {
    const sql = ` SELECT COUNT(*) as count from users where email= ?`;
    let result = await query(sql, [email]);

    result = result[0].count;

    return { result };
};

// Fonction pour créer un nouvel utilisateur dans la base de données
const signUp = async(pseudo, email, hashedPassword, role) => {
    const sql = `
   INSERT INTO users (pseudo, email, mdp, role) 
   VALUES (?, ?, ?, ?)`;

    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour créer un nouvel utilisateur
        result = await query(sql, [pseudo, email, hashedPassword, role]);
    } catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    } finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
};

// Fonction asynchrone pour lire les informations de certains champs des utilisateurs depuis la base de données
const read = async() => {
    // Requête SQL pour sélectionner les champs spécifiés de la table "users"
    const sql = `
        SELECT user_id, pseudo, email
        FROM users
        ORDER BY pseudo DESC
    `;

    // Initialisation des variables d'erreur et de résultat
    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour récupérer les informations de tous les utilisateurs
        result = await query(sql);
    } catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    } finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
};


// Requête pour sélectionner les informations personnelles du compte de l'utilisateur à afficher lorsqu'il est connecté
const readOneUser = async(id) => {
    const sql = `
        SELECT pseudo, email, role
        FROM users
        WHERE user_id = ?
    `;

    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour récupérer les informations d'un utilisateur
        result = await query(sql, [id]);
    } catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    } finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
};

// Requête pour récupérer les informations d'authentification d'un utilisateur lors de la connexion
const signIn = async(email) => {
    const sql = `
  SELECT user_id, email, mdp, role
  FROM users
  WHERE email = ?`;

    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour récupérer les informations d'authentification
        result = await query(sql, [email]);
    } catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    } finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
};
const updateUser = async(
    pseudo,
    email,
    hashedPassword,
    userId
) => {
    const sql = `
     UPDATE users SET pseudo=?, email=?, mdp=? 
     WHERE user_id=?`;

    let error = null;
    let result = null;

    try {
        // Exécution de la requête SQL pour créer un nouvel utilisateur
        result = await query(sql, [
            pseudo,
            email,
            hashedPassword,
            userId
        ]);
    } catch (e) {
        // Capture de l'erreur en cas d'échec de l'exécution de la requête
        error = e.message;
    } finally {
        // Retour d'un objet contenant l'erreur (le cas échéant) et le résultat de la requête
        return { error, result };
    }
};

// Exportation des fonctions dans user.controller
export const UserDB = {
    emailExist,
    signUp,
    read,
    readOneUser,
    signIn,
    updateUser
};