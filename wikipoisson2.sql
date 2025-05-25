-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 21 mai 2025 à 15:54
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `wikipoisson`
--
CREATE DATABASE IF NOT EXISTS `wikipoisson` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `wikipoisson`;


--
-- Structure de la table `contribution`
--

CREATE TABLE `contribution` (
  `id_contribution` int(11) NOT NULL,
  `date_creation` datetime DEFAULT NULL,
  `validation` tinyint(1) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `id_espece` bigint(20) NOT NULL,
  `nom_commun` varchar(50) DEFAULT NULL,
  `nom_scientifique` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `taille_max` decimal(15,2) DEFAULT NULL,
  `alimentation` varchar(50) DEFAULT NULL,
  `temperature` decimal(15,2) DEFAULT NULL,
  `dificulte` varchar(50) DEFAULT NULL,
  `cree_le` datetime DEFAULT NULL,
  `id_temperament` int(11) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `id_habitat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `espece`
--

CREATE TABLE `espece` (
  `id_espece` bigint(20) NOT NULL,
  `nom_commun` varchar(50) DEFAULT NULL,
  `nom_scientifique` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `taille_max` decimal(15,2) DEFAULT NULL,
  `alimentation` varchar(50) DEFAULT NULL,
  `temperature` decimal(15,2) DEFAULT NULL,
  `dificulte` varchar(50) DEFAULT NULL,
  `cree_le` datetime DEFAULT NULL,
  `modifie_le` datetime DEFAULT NULL,
  `id_temperament` int(11) NOT NULL,
  `id_famille` int(11) NOT NULL,
  `id_habitat` int(11) NOT NULL,
  `id_contribution_valide` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
