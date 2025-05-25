// Import du module pour exécuter les requêtes SQL
import query from "./init.database.js";

// Fonction pour créer un nouveau message
const createEspece = async(
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
    image_3,
) => {

    const sql = `
        INSERT INTO espece (
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
        image_3,)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [
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
        ]);
    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};

// Fonction pour récupérer les 5 premiers messages de la base de données
const readEspeces = async() => {
    const sql = `
        SELECT *
        FROM espece
        ORDER BY nom_scientifique DESC
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
const readOneEspece = async(id_espece) => {
    const sql = `
        SELECT *
        FROM espece
        WHERE id_espece = ?
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

// Fonction pour mettre à jour un message en fonction de son ID
const updateEspece = async(
    id_espece,
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
) => {

    const sql = `
        UPDATE espece
        SET nom_commun = ?, nom_scientifique = ?, description = ?, taille_max = ?, alimentation = ?, temperature = ?, dificulte = ?, 
        cree_le = ?, modifie_le = ?, id_temperament = ?, id_famille =?, id_habitat = ?, id_contribution_valide = ?, image_1 = ?, image_2 = ?, image_3 = ?
        WHERE id_espece = ?
    `;

    let error = null;
    let result = null;

    try {
        result = await query(sql, [
            id_espece,
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
            image_3 //peut coser problèmes 
        ]);

    } catch (e) {
        error = e.message;
    } finally {
        return { error, result };
    }
};

// Fonction pour supprimer un message en fonction de son ID
const deleteOneEspece = async(id_espece) => {
    const sql = `
        DELETE FROM espece
        WHERE id_espece = ?
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


// Exportation des fonctions dans message.controller
export const EspeceDB = {
    createEspece,
    readEspeces,
    readOneEspece,
    updateEspece,
    deleteOneEspece,
};