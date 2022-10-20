CREATE DATABASE IF NOT EXISTS ERM_DB
CHARACTER SET utf8
COLLATE utf8_general_ci;

USE ERM_DB;

-- Création de l'utilisateur
CREATE USER 'erm_user'@'localhost' IDENTIFIED by 'EscapeRoomManager';
GRANT ALl on erm_db.* TO 'erm_user'@'localhost';

	-- Supression des tables
	DROP TABLE IF EXISTS emp_cent;
	DROP TABLE IF EXISTS hor_salle;
	DROP TABLE IF EXISTS reservations;
	DROP TABLE IF EXISTS employes;
	DROP TABLE IF EXISTS typeclient;
	DROP TABLE IF EXISTS rabais;
	DROP TABLE IF EXISTS salles;
	DROP TABLE IF EXISTS horaires;
	DROP TABLE IF EXISTS centres;
	DROP TABLE IF EXISTS compagnies;

	-- suppression des vues
	DROP VIEW IF EXISTS view_salles_compagnie;
	DROP VIEW IF EXISTS view_employes_lieu;
	DROP VIEW IF EXISTS view_salle_horaire;

	-- Création des tables
	CREATE TABLE compagnies(
		id              INT     		NOT NULL AUTO_INCREMENT,
		nom             TEXT    		NOT NULL,
		info_paiement   TEXT    		NOT NULL,
		courriel        VARCHAR(50)   	NOT NULL,
		mot_de_passe    TEXT   			NOT NULL,
		
		PRIMARY KEY pk_compagnie(id),
		UNIQUE (courriel)
	)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

	CREATE TABLE typeclient(
		id              INT     	NOT NULL AUTO_INCREMENT,
		categorie       VARCHAR(50)	NOT NULL,
		prix            FLOAT    	NOT NULL,
		compagnie       INT     	NOT NULL,
		
		PRIMARY KEY pk_tc(id),
		FOREIGN KEY fk_tc_compfk_tc_comp(compagnie) REFERENCES compagnies(id) ON DELETE CASCADE,
		UNIQUE (categorie)
	)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

	CREATE TABLE rabais(
		id              INT         NOT NULL AUTO_INCREMENT,
		nom             TEXT        NOT NULL,
		pourcentage     FLOAT 	    NOT NULL,
		compagnie       INT         NOT NULL,
		isActive        INT			NOT NULL DEFAULT 0,
		date_fin        TIMESTAMP   NOT NULL,

		PRIMARY KEY pk_rab(id),
		FOREIGN KEY fk_rab_comp(compagnie) REFERENCES compagnies(id) ON DELETE CASCADE,
		CONSTRAINT const_bool CHECK(isActive=0 OR isActive = 1)
	)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

	CREATE TABLE horaires(
		id              INT         NOT NULL AUTO_INCREMENT,
		heure_debut     VARCHAR(10) NOT NULL,
		heure_fin       VARCHAR(10)	NOT NULL,

		PRIMARY KEY pk_horaire(id)
	)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

	CREATE TABLE centres(
		id              INT         NOT NULL AUTO_INCREMENT,
		nom             TEXT        NOT NULL,
		compagnie       INT         NOT NULL,
		adresse         TEXT        NOT NULL,
		ville           TEXT        NOT NULL,
		pays            TEXT        NOT NULL,
		code_postal     TEXT        NOT NULL,
		
		PRIMARY KEY pk_centre(id),
		FOREIGN KEY fk_c_comp(compagnie) REFERENCES compagnies(id) ON DELETE CASCADE
	)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

	CREATE TABLE salles(
		id              INT         NOT NULL AUTO_INCREMENT,
		Nom             TEXT        NOT NULL,
		description     TEXT        NOT NULL,
		centre          INT        	NOT NULL,
		nb_max_joueur   INT         NOT NULL,
		prix_unitaire   FLOAT     	NOT NULL,
		
		PRIMARY KEY pk_salle(id),
		FOREIGN KEY fk_s_centre(centre) REFERENCES centres(id) ON DELETE CASCADE
	)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

	CREATE TABLE hor_salle(
		id_horaire	INT	 NOT NULL,
		id_salle	INT	 NOT NULL,
		
		PRIMARY KEY(id_horaire, id_salle),
		FOREIGN KEY fk_lien_horaire(id_horaire) REFERENCES horaires(id) ON DELETE CASCADE,
		FOREIGN KEY fk_lien_salle(id_salle) REFERENCES salles(id) ON DELETE CASCADE
	)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

	CREATE TABLE employes(
		id              INT         NOT NULL AUTO_INCREMENT,
		compagnie       INT         NOT NULL,
		nom             TEXT        NOT NULL,
		prenom          TEXT        NOT NULL,
		salaire         FLOAT   	NOT NULL,
		num_telephone   TEXT        NOT NULL,
		niveau_acces    INT         NOT NULL,
		courriel        VARCHAR(50) NOT NULL,
		num_ass         INT         NOT NULL,
		mot_de_passe    TEXT        NOT NULL,
		
		PRIMARY KEY pk_employe(id),
		FOREIGN KEY fk_e_compagnie(compagnie) REFERENCES compagnies(id)  ON DELETE CASCADE,
		UNIQUE(courriel)
	)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

	CREATE TABLE emp_cent(
		id_emp		INT		NOT NULL,
		id_centre	INT		NOT NULL,
		
		PRIMARY KEY(id_emp, id_centre),
		FOREIGN KEY fk_emp(id_emp) REFERENCES employes(id) ON DELETE CASCADE,
		FOREIGN KEY fk_cent(id_centre) REFERENCES centres(id) ON DELETE CASCADE
	)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

	CREATE TABLE reservations(
		id                  INT         NOT NULL AUTO_INCREMENT,
		nom_client          TEXT        NOT NULL,
		num_telephone       INT         NOT NULL,
		statut_reservation  INT         NOT NULL,
		salle				INT			NOT NULL,
		nb_personnes        INT         NOT NULL,
		courriel            TEXT        NOT NULL,
		heure               TEXT        NOT NULL,
		prix_total          FLOAT	    NOT NULL,
		date                TIMESTAMP   NOT NULL,
		
		PRIMARY KEY pk_resa(id),
		FOREIGN KEY fk_r_salle(salle) REFERENCES salles(id) ON DELETE CASCADE,
		CONSTRAINT const_statut CHECK(statut_reservation = 0 OR statut_reservation = 1)
	)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;


	-- Création de views
	CREATE VIEW view_salles_compagnie AS
	SELECT salles.nom AS 'salle',  salles.id AS 'id_salle',
	compagnies.nom AS 'compagnie', compagnies.id AS 'id_compagnie',
	centres.nom AS 'centre', centres.id AS 'id_centre'
	FROM salles
	INNER JOIN centres ON centres.id = salles.centre
	INNER JOIN compagnies ON centres.compagnie = compagnies.id;

	CREATE VIEW view_employes_lieu AS
	SELECT concat(employes.prenom, " ",employes.nom) AS 'employe', centres.nom AS 'Lieu de Travail',
	centres.id AS 'id_centre', employes.compagnie AS 'id_compagnie'
	FROM employes
	INNER JOIN emp_cent ON employes.id = emp_cent.id_emp
	INNER JOIN centres ON emp_cent.id_centre = centres.id;

	CREATE VIEW view_salle_horaire AS
	SELECT salles.nom AS 'salle', horaires.heure_debut AS 'depart', horaires.heure_fin AS 'fin'
	FROM salles
	INNER JOIN hor_salle ON salles.id = hor_salle.id_salle
	INNER JOIN horaires ON horaires.id = hor_salle.id_horaire;


-- Insertion test
INSERT INTO compagnies (nom, info_paiement, courriel, mot_de_passe)
VALUES ('Escaparium', '4444 5555 0880 6006', 'manager@escaparium.com', 'escaparium1'),
	   ('Immersium', '1111 0000 2222 1313', 'manager@immersium.com', 'immersium1');
INSERT INTO centres (nom, compagnie, adresse, ville, pays, code_postal)
VALUES ('Montréal', 1, '2000 rue Ontario', 'Montréal', 'Canada', 'H10 2B2'),
		('Longueuil', 1, '2000 rue Maisonneuve', 'Longueuil', 'Canada', 'J1K 2Y9'),
        ('Centre-Ville', 2, '1000 rue Saint-Denis', 'Montréal', 'Canada', 'H2k 0B0');
INSERT INTO employes (compagnie, nom, prenom, salaire, num_telephone, niveau_acces, courriel, num_ass, mot_de_passe)
VALUES (1, 'Guindon', 'Maxence', 13.75, '514 200-8815', 1, 'mguindon@escaparium.com', 000111222, 'guindon1'),
(2, 'Guindon', 'Maxence', 13.75, '514 200-8815', 1, 'mguindon@immersium.com', 000111222, 'guindon1');
INSERT INTO emp_cent(id_emp, id_centre)
VALUES(1, 1),
	  (1, 2),
      (2, 3);
      
INSERT INTO horaires (heure_debut, heure_fin)
VALUES ('10h', '11h'),
	   ('11h30', '12h30'),	
	   ('13h', '14h');
      
INSERT INTO salles (nom, description, centre, nb_max_joueur, prix_unitaire)
VALUE('Pirate', 'description de Pirate', 1, 6, 25.00),
	 ('Horreur', 'description de Horreur', 2, 8, 25.00),
     ('Temple', 'description de Temple', 3, 6, 30.00);
     
INSERT INTO hor_salle(id_horaire, id_salle)
VALUE(1,4),
	 (2,4),
     (3,4),
     (2,5),
     (3,5),
     (1,6),
     (2,6);

INSERT INTO reservations(nom_client, num_telephone, statut_reservation, salle,
        nb_personnes, courriel, heure, prix_total, date)
VALUES('Carlens Belony', 5555, 0, 3, 3, 'belony@email.com', 14, 250.00, '2022-12-12 14:00');

-- SELECT test

SELECT * FROM view_salles_compagnie;
SELECT * FROM view_employes_lieu WHERE id_centre=2;
SELECT * FROM view_salle_horaire WHERE salle='Pirate';

SELECT * FROM centres;
SELECT * FROM horaires;
SELECT * FROM salles;

SELECT * FROM employes;
SELECT * FROM emp_cent;
SELECT * FROM hor_salle;
SELECT * FROM compagnies;

SELECT * FROM rabais;
SELECT * FROM typeclient;
SELECT * FROM reservations;

SELECT * FROM horaires WHERE heure_debut = '8h' AND heure_fin = '20h';
