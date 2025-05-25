import isEmail from "validator/lib/isEmail.js";
import { UserDB } from "../databases/user.database.js";
import { jwtSign } from "../middlewares/jwt.mdlwr.js";
import { hashPass, compareHash } from "../utils/crypto.utils.js";

// Fonction pour créer un utilisateur
const signUp = async(req, res) => {
    // Extraction des données de la requête
    const { pseudo, email, mdp } = req.body;

    // Vérification de l'existence de l'email dans la base de données
    const result = await UserDB.emailExist(email);

    // Validation de l'email
    if (!email || !isEmail(email)) {
        return res.status(403).json({ message: `Email invalide !` });
    }

    // Validation du mot de passe
    if (!mdp || mdp.length <= 4) {
        return res
            .status(403)
            .json({ message: `Le mot de passe doit contenir au moins 5 caractères` });
    }

    // Hachage du mot de passe
    const hashResult = await hashPass(mdp);
    const hashError = hashResult.error;
    if (hashError) {
        return res.status(500).json({ message: hashError });
    }
    const hashedPassword = hashResult.hashed;
    const role = "user";
    // Vérification de l'existence de l'email dans la base de données
    if (result.result >= 1) {
        return res
            .status(403)
            .json({
                message: `Email déjà existant`
            });
    } else {
        // Création de l'utilisateur dans la base de données
        const response = await UserDB.signUp(pseudo, email, hashedPassword, role);
        const responseError = response.error;
        console.log(response);
        if (responseError) {
            return res.status(500).json({ message: responseError });
        }

        const userId = response.result.insertId;
        return res.status(200).json({ message: "Utilisateur créé", user: userId });
    }
};

// Fonction pour lire les informations de tous les utilisateurs
const read = async(req, res) => {
    const response = await UserDB.read();
    const result = response.result;

    return res.status(200).json({ message: "Request OK", users: result });
};

// Fonction pour afficher les informations personnelles d'un utilisateur
const readOneUser = async(req, res) => {
    const response = await UserDB.readOneUser(req.query.id);
    console.log(response);
    const result = response.result;

    const user = {
        pseudo: result[0].pseudo,
        email: result[0].email,
        role: result[0].role,
    };

    return res.status(200).json({ message: "Requête OK", user });
};

// Fonction pour l'authentification d'un utilisateur
const signIn = async(req, res) => {
    const { email, mdp } = req.body;

    // Validation de l'email
    if (!email || !isEmail(email)) {
        return res.status(403).json({ message: `Email invalide` });
    }

    // Récupération des informations de l'utilisateur depuis la base de données
    const response = await UserDB.signIn(email);
    const responseErr = response.error;
    if (responseErr) {
        return res.status(500).json({ message: responseErr });
    }

    const result = response.result;
    const user = result[0];

    // Vérification de l'existence de l'utilisateur
    if (!user) {
        return res.status(401).json({ message: `Échec de l'authentification` });
    }

    const userId = user.user_id;
    const role = user.role;
    const dbPassword = user.mdp;

    // Comparaison des mots de passe hachés
    const passAreSame = await compareHash(mdp, dbPassword);
    if (!passAreSame) {
        return res.status(401).json({ message: `Échec de l'authentification` });
    }

    // Génération du jeton JWT
    const token = jwtSign(userId);
    return res
        .status(200)
        .json({ message: `Connexion réussie`, user: { userId, email, token, role } });
};

const updateUser = async(req, res) => {
    // Extraction des données de la requête
    const { user } = req.body;

    const pseudo = user.pseudo;
    const email = user.email;
    const password = user.mdp;
    const userId = user.userId;

    // Validation de l'email
    if (!email || !isEmail(email)) {
        return res.status(403).json({ message: `Email invalide !` });
    }

    // Validation du mot de passe
    if (!password || password.length <= 4) {
        return res
            .status(403)
            .json({ message: `Le mot de passe doit contenir au moins 5 caractères` });
    }

    // Hachage du mot de passe
    const hashResult = await hashPass(password);
    const hashError = hashResult.error;
    if (hashError) {
        return res.status(500).json({ message: hashError });
    }
    const hashedPassword = hashResult.hashed;

    // Création de l'utilisateur dans la base de données
    const response = await UserDB.updateUser(
        pseudo,
        email,
        hashedPassword,
        userId
    );
    const responseError = response.error;
    console.log(response);
    if (responseError) {
        return res.status(500).json({ message: responseError });
    }

    return res.status(200).json({ message: "Utilisateur modifié" });
};



// Exportation de l'objet contenant toutes les fonctions du contrôleur des utilisateurs
export const UserController = {
    signUp,
    read,
    readOneUser,
    signIn,
    updateUser
};