import { HabitatDB } from "../databases/habitat.database.js";

// Fonction pour créer un habitat
const createHabitat = async(req, res) => {
    // Extraction des données de la requête
    const { libelle, description } = req.body;

    // Appel à la fonction de la base de données pour créer un habitat
    const response = await HabitatDB.createHabitat(libelle, description);
    const result = response.result;

    // Retour d'une réponse avec le statut 201 (Créé) et les données du habitat créé
    return res.status(201).json({ message: "OK", habitats: result });
};

// Fonction pour récupérer tous les habitats
const readHabitats = async(req, res) => {
    // Appel à la fonction de la base de données pour récupérer tous les habitats
    const habitatResponse = await HabitatDB.readHabitats();
    const habitats = habitatResponse.result;

    // Retour d'une réponse avec le statut 200 (OK) et les données des habitats
    return res.status(200).json({ message: "OK", habitats });
};

// Fonction pour récupérer un habitat spécifique par son identifiant
const readOneHabitat = async(req, res) => {
    // Extraction de l'identifiant du habitat à partir des paramètres de la requête
    const id_habitat = req.params.id_habitat;

    // Appel à la fonction de la base de données pour récupérer un habitat spécifique par son identifiant
    const response = await HabitatDB.readOneHabitat(id_habitat);
    const result = response.result;

    // Création d'un objet représentant le habitat avec des propriétés spécifiques
    const habitat = {
        id_habitat,
        libelle: result[0].libelle,
        description: result[0].description,
    };

    // Retour d'une réponse avec le statut 200 (OK) et les données du habitat spécifié
    return res.status(200).json({ message: "Requête OK", habitat });
};

// Fonction pour modifier un habitat ???
const updateHabitat = async(req, res) => {
    // Extraction des données de la requête
    const { libelle, description, id_habitat } = req.body;

    // Appel à la fonction de la base de données pour mettre à jour un habitat
    const response = await HabitatDB.updateHabitat(libelle, description, id_habitat);

    // Vérification des erreurs lors de la mise à jour
    if (response.error) {
        // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
        return res.status(500).json({ message: response.error });
    }

    // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un habitat indiquant la mise à jour réussie
    return res.status(200).json({ message: `L'habitat numéro ${id_habitat} a été modifié` });
};

// Fonction pour supprimer un habitat par son identifiant
const deleteOneHabitat = async(req, res) => {
    // Extraction de l'identifiant du habitat à partir des paramètres de la requête
    const id_habitat = req.params.id_habitat;

    // Appel à la fonction de la base de données pour supprimer un habitat
    const response = await HabitatDB.deleteOneHabitat(id_habitat);

    // Récupération d'une éventuelle erreur
    const error = response.error; // soit une chaîne de caractères, soit null

    // Vérification de la présence d'une erreur
    if (error) {
        // En cas d'erreur, retour d'une réponse avec le statut 500 (Erreur interne du serveur)
        return res.status(500).json({ message: error });
    } else {
        // En cas de succès, retour d'une réponse avec le statut 200 (OK) et un habitat indiquant la suppression réussie
        return res.status(200).json({ message: "Habitat supprimé" });
    }
};

// Exportation de l'objet contenant toutes les fonctions du contrôleur des habitats
export const HabitatController = {
    createHabitat,
    readHabitats,
    readOneHabitat,
    updateHabitat,
    deleteOneHabitat,
};