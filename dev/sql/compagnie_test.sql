-- Nom du fichier : compagnie_test.sql
-- Ce fichier permet la création d'une compagnie test.
-- Auteur : Maxence Guindon
-- Équipe : Carlens Belony et Maxence Guindon

USE ERM_DB;

INSERT INTO compagnies (nom, info_paiement, courriel, mot_de_passe)
VALUES ("Bonjour1", "0000-1111-2222-3333", "Bonjour@courriel.com", "$2b$12$WOzP3pwFPbUVhHBMKVdFUupYsgyCLYXnU12LOHlsPJHYz4MIBZz4a");

INSERT into centres(nom, compagnie, adresse, ville, pays, code_postal)
VALUES ("Laval", 1, "255 rue Ontario", "Laval", "Canada", "J7Z 3K3");

-- INSERT into employes()
-- VALUES()

INSERT into salles(nom, description, centre, nb_max_joueur, prix_unitaire, privee)
VALUES ("Pirate", "Description de Pirate", 2, 8, 30.0, 1),
       ("Espion", "Description de Espion", 2, 8, 30.0, 1),
       ("Prison", "Description de Prison", 2, 8, 30.0, 1);

INSERT into horaires(heure_debut, heure_fin)
VALUES (1, "8h30", "9h30"),
       (1, "10h", "11h"),
	(1, "11h30", "12h30"),	
	(1, "13h", "14h"),
       (1, "14h30", "15h30"),
       (1, "16h", "17h"),
       (1, "17h30", "18h30"),
       (1, "19h", "20h"),
       (1, "20h30", "21h30"),
       (1, "22h", "23h"),
       (2, "9h", "10h"),
       (2, "10h30", "11h30"),
	(2, "12h", "13h"),	
	(2, "13h30", "14h30"),
       (2, "15h", "16h"),
       (2, "16h30", "17h30"),
       (2, "18h", "19h"),
       (2, "19h30", "20h30"),
       (2, "21h", "22h"),
       (2, "22h30", "23h30"),
       (3, "9h30", "10h30"),
       (3, "11h", "12h"),
	(3, "12h30", "13h30"),	
	(3, "14h", "15h"),
       (3, "15h30", "16h30"),
       (3, "17h", "18h"),
       (3, "18h30", "19h30"),
       (3, "20h", "21h"),
       (3, "21h30", "22h30"),
       (3, "23h", "00h");

INSERT into reservations(nom_client, num_telephone, statut_reservation, salle, nb_personnes, courriel, prix_total, date)
VALUES ("Jonathan Frédéric", "514-438-2570", 1, 1, 4, "johndoe@gmail.com", 100.0, "2022-12-3 10:00:00"),
       ("Pierre Long Nguyen", "514-438-2570", 1, 1, 8, "pln@gmail.com", 200.0, "2022-12-3 11:30:00"),
       ("Koralia Frenette", "514-222-3333", 1, 2, 5, "k.frenette@gmail.com", 125.0, "2022-12-3 18:00:00");


INSERT into typeclient(categorie, prix, compagnie)
VALUES("Enfant", 20.0, 1);

INSERT into rabais(nom, pourcentage, compagnie, isActive, date_fin)
VALUES ("Promo Noël", 0.25, 1, isActive, "30 Décembre 2022");


-- INSERT into hor_salle()
-- VALUES (1, 1),
--        (2, 1),
--        (3, 1),
--        (4, 1),
--        (5, 1),
--        (6, 1),
--        (7, 1),
--        (8, 1),
--        (9, 1),
--        (10, 1),
--        (11, 2),
--        (12, 2),
--        (13, 2),
--        (14, 2),
--        (15, 2),
--        (16, 2),
--        (17, 2),
--        (18, 2),
--        (19, 2),
--        (20, 2),
--        (21, 3),
--        (22, 3),
--        (23, 3),
--        (24, 3),
--        (25, 3),
--        (26, 3),
--        (27, 3),
--        (28, 3),
--        (29, 3),
--        (30, 3);
