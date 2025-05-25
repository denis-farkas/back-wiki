import { TemperamentDB } from "../databases/temperament.database.js";

// Fonction pour créer un temperament
const createTemperament = async(req, res) => {
    // Extraction des données de la requête
    const { libelle, description } = req.body;

    // Appel à la fonction de la base de données pour créer un temperament
    const response = await TemperamentDB.createTemperament(libelle, description);
    const result = response.result;

    // Retour d'une réponse avec le statut 201 (Créé) et les données du temperament créé
    return res.status(201).json({ message: "OK", temperaments: result });
};

// Fonction pour récupérer tous les temperaments
const readTemperaments = async(req, res) => {
    // Appel à la fonction de la base de données pour récupérer tous les temperaments
    const temperamentResponse = await TemperamentDB.readTemperaments();
    const temperaments = temperamentResponse.result;

    // Retour d'une réponse avec le statut 200 (OK) et les données des temperaments
    return res.status(200).json({ message: "OK", temperaments });
};

// Fonction pour récupérer un temperament spécifique par son identifiant
const readOneTemperament = async(req, res) => {
    // Extraction de l'identifiant du temperament à partir des paramètres de la requête
    const id_temperament = req.params.id_temperament;

    // Appel à la fonction de la base de données pour récupérer un temperament spécifique par son identifiant
    const response = await TemperamentDB.readOneTemperament(id_temperament);
    const result = response.result;

    // Création d'un objet représentant le temperament avec des propriétés spécifiques
    const temperament = {
        id_temperament,
        libelle: result[0].libelle,
        description: result[0].description,
    };

    // Retour d'une réponse avec le statut 200 (OK) et les données du temperament spécifié
    return res.status(200).json({ message: "Requête OK", temperament });
};

// Fonction pour modifier un temperament ???
const updateTemperament = async(req, res) => {
    // Extraction des données de la requête
    const { libelle, description, id_temperament } = req.body;

    // Appel à la fonction de la base de données pour mettre à jour un temperament
    const response = await TemperamentDB.updateTemperament(libelle, description, id_temperament);

    // Vérification des erreurs lors de la mise à jour
    if (response.error) {
        // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
        return res.status(500).json({ message: response.error });
    }

    // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un temperament indiquant la mise à jour réussie
    return res.status(200).json({ message: `L'temperament numéro ${id_temperament} a été modifié` });
};

// Fonction pour supprimer un temperament par son identifiant
const deleteOneTemperament = async(req, res) => {
    // Extraction de l'identifiant du temperament à partir des paramètres de la requête
    const id_temperament = req.params.id_temperament;

    // Appel à la fonction de la base de données pour supprimer un temperament
    const response = await TemperamentDB.deleteOneTemperament(id_temperament);

    // Récupération d'une éventuelle erreur
    const error = response.error; // soit une chaîne de caractères, soit null

    // Vérification de la présence d'une erreur
    if (error) {
        // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
        return res.status(500).json({ message: error });
    } else {
        // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un temperament indiquant la suppression réussie
        return res.status(200).json({ message: "Temperament supprimé" });
    }
};

// Exportation de l'objet contenant toutes les fonctions du contrôleur des temperaments
export const TemperamentController = {
    createTemperament,
    readTemperaments,
    readOneTemperament,
    updateTemperament,
    deleteOneTemperament,
};