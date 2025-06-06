import mysql from "mysql2";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
// Création d'un gestionnaire (ou pool) de connexions à la base de données MySQL
const pool = mysql.createPool({
  connectionLimit: 10000,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Fonction pour exécuter une requête SQL
const query = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    // Utilisation du pool pour exécuter la requête SQL
    pool.query(sql, values, (error, result, fields) => {
      if (error) {
        // Rejet de la promesse en cas d'erreur
        reject(error);
      }
      // Résolution de la promesse avec le résultat de la requête
      resolve(result);
    });
  });
};

// Exportation de la fonction query  pour créer les différentes requêtes pour le user, les messages, les ateliers et les catégories de style de danse
export default query;
