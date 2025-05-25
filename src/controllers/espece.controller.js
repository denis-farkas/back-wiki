import { EspeceDB } from "../databases/espece.database.js";
import multer from 'multer';
import path from 'path';

// Configuration de multer pour le stockage des images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/especes/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).fields([
    { name: 'image_1', maxCount: 1 },
    { name: 'image_2', maxCount: 1 },
    { name: 'image_3', maxCount: 1 }
]);

// Fonction pour créer un espece
const createEspece = async(req, res) => {
    upload(req, res, async(err) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de l'upload des images" });
        }

        // Extraction des données de la requête
        const {
            nom_commun,
            nom_scientifique,
            description,
            taille_max,
            alimentation,
            temperature,
            dificulte,
            cree_le,
            modifie_le,
            id_temperament,
            id_famille,
            id_habitat,
            id_contribution_valide,
        } = req.body;

        // Récupération des chemins des images
        const image_1 = req.files['image_1'] ? req.files['image_1'][0].path : null;
        const image_2 = req.files['image_2'] ? req.files['image_2'][0].path : null;
        const image_3 = req.files['image_3'] ? req.files['image_3'][0].path : null;

        // Appel à la fonction de la base de données pour créer un espece
        const response = await EspeceDB.createEspece(
            nom_commun,
            nom_scientifique,
            description,
            taille_max,
            alimentation,
            temperature,
            dificulte,
            cree_le,
            modifie_le,
            id_temperament,
            id_famille,
            id_habitat,
            id_contribution_valide,
            image_1,
            image_2,
            image_3
        );
        const result = response.result;

        return res.status(201).json({ message: "OK", especes: result });
    });
};

// Fonction pour récupérer tous les especes
const readEspeces = async(req, res) => {
    const especeResponse = await EspeceDB.readEspeces();
    const especes = especeResponse.result;
    return res.status(200).json({ message: "OK", especes });
};

// Fonction pour récupérer un espece spécifique par son identifiant
const readOneEspece = async(req, res) => {
    const id_espece = req.params.id_espece;
    const response = await EspeceDB.readOneEspece(id_espece);
    const result = response.result;

    const espece = {
        id_espece,
        nom_commun: result[0].nom_commun,
        nom_scientifique: result[0].nom_scientifique,
        description: result[0].description,
        taille_max: result[0].taille_max,
        alimentation: result[0].alimentation,
        temperature: result[0].temperature,
        dificulte: result[0].dificulte,
        cree_le: result[0].cree_le,
        modifie_le: result[0].modifie_le,
        id_temperament: result[0].id_temperament,
        id_famille: result[0].id_famille,
        id_habitat: result[0].id_habitat,
        id_contribution_valide: result[0].id_contribution_valide,
        image_1: result[0].image_1,
        image_2: result[0].image_2,
        image_3: result[0].image_3
    };

    return res.status(200).json({ message: "Requête OK", espece });
};

// Fonction pour modifier un espece
const updateEspece = async(req, res) => {
    upload(req, res, async(err) => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de l'upload des images" });
        }

        const {
            nom_commun,
            nom_scientifique,
            description,
            taille_max,
            alimentation,
            temperature,
            dificulte,
            cree_le,
            modifie_le,
            id_temperament,
            id_famille,
            id_habitat,
            id_contribution_valide,
            id_espece
        } = req.body;

        // Récupération des chemins des nouvelles images
        const image_1 = req.files['image_1'] ? req.files['image_1'][0].path : null;
        const image_2 = req.files['image_2'] ? req.files['image_2'][0].path : null;
        const image_3 = req.files['image_3'] ? req.files['image_3'][0].path : null;

        const response = await EspeceDB.updateEspece(
            nom_commun,
            nom_scientifique,
            description,
            taille_max,
            alimentation,
            temperature,
            dificulte,
            cree_le,
            modifie_le,
            id_temperament,
            id_famille,
            id_habitat,
            id_contribution_valide,
            id_espece,
            image_1,
            image_2,
            image_3
        );

        if (response.error) {
            return res.status(500).json({ message: response.error });
        }

        return res.status(200).json({ message: `L'espece numéro ${id_espece} a été modifié` });
    });
};

// Fonction pour supprimer un espece par son identifiant
const deleteOneEspece = async(req, res) => {
    const id_espece = req.params.id_espece;
    const response = await EspeceDB.deleteOneEspece(id_espece);
    const error = response.error;

    if (error) {
        return res.status(500).json({ message: error });
    } else {
        return res.status(200).json({ message: "Espece supprimé" });
    }
};

// Exportation de l'objet contenant toutes les fonctions du contrôleur des especes
export const EspeceController = {
    createEspece,
    readEspeces,
    readOneEspece,
    updateEspece,
    deleteOneEspece,
};