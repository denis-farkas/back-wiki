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

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `id_commentaire` int(11) NOT NULL,
  `note` tinyint(4) DEFAULT NULL,
  `commentaire` text DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `validation` tinyint(1) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `id_espece` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

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

-- --------------------------------------------------------

--
-- Structure de la table `famille`
--

CREATE TABLE `famille` (
  `id_famille` int(11) NOT NULL,
  `libelle` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `habitat`
--

CREATE TABLE `habitat` (
  `id_habitat` int(11) NOT NULL,
  `libelle` varchar(50) DEFAULT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `historique`
--

CREATE TABLE `historique` (
  `id_historique` int(11) NOT NULL,
  `recherches` varchar(100) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `temperament`
--

CREATE TABLE `temperament` (
  `id_temperament` int(11) NOT NULL,
  `libelle` varchar(50) DEFAULT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `pseudo` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `mdp` varchar(255) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `pseudo`, `email`, `mdp`, `role`) VALUES
(1, 'Aurele', 'test@gmail.com', '$2b$10$bxf9p2HZAhAyI9uO1XjMOOMaBKp7WXmtMLNhpK3ks/w/clEPUZlfa', 'user');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id_commentaire`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `id_espece` (`id_espece`);

--
-- Index pour la table `contribution`
--
ALTER TABLE `contribution`
  ADD PRIMARY KEY (`id_contribution`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `id_espece` (`id_espece`);

--
-- Index pour la table `espece`
--
ALTER TABLE `espece`
  ADD PRIMARY KEY (`id_espece`),
  ADD KEY `id_temperament` (`id_temperament`),
  ADD KEY `id_categorie` (`id_famille`),
  ADD KEY `id_habitat` (`id_habitat`);

--
-- Index pour la table `famille`
--
ALTER TABLE `famille`
  ADD PRIMARY KEY (`id_famille`);

--
-- Index pour la table `habitat`
--
ALTER TABLE `habitat`
  ADD PRIMARY KEY (`id_habitat`);

--
-- Index pour la table `historique`
--
ALTER TABLE `historique`
  ADD PRIMARY KEY (`id_historique`),
  ADD KEY `user_id` (`user_id`);

--
-- Index pour la table `temperament`
--
ALTER TABLE `temperament`
  ADD PRIMARY KEY (`id_temperament`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD CONSTRAINT `commentaires_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `commentaires_ibfk_2` FOREIGN KEY (`id_espece`) REFERENCES `espece` (`id_espece`);

--
-- Contraintes pour la table `contribution`
--
ALTER TABLE `contribution`
  ADD CONSTRAINT `contribution_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `contribution_ibfk_2` FOREIGN KEY (`id_espece`) REFERENCES `espece` (`id_espece`);

--
-- Contraintes pour la table `espece`
--
ALTER TABLE `espece`
  ADD CONSTRAINT `espece_ibfk_1` FOREIGN KEY (`id_temperament`) REFERENCES `temperament` (`id_temperament`),
  ADD CONSTRAINT `espece_ibfk_2` FOREIGN KEY (`id_famille`) REFERENCES `famille` (`id_famille`),
  ADD CONSTRAINT `espece_ibfk_3` FOREIGN KEY (`id_habitat`) REFERENCES `habitat` (`id_habitat`);

--
-- Contraintes pour la table `historique`
--
ALTER TABLE `historique`
  ADD CONSTRAINT `historique_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
