CREATE DATABASE IF NOT EXISTS ERM_DB
CHARACTER SET utf8
COLLATE utf8_general_ci;

USE ERM_DB;

-- Création de l'utilisateur
-- CREATE USER 'erm_user'@'localhost' IDENTIFIED by 'EscapeRoomManager';
-- GRANT ALl on erm_db.* TO 'erm_user'@'localhost';

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
	DROP VIEW IF EXISTS view_reservation_compagnie;
    
    -- suppression des triggers
    DROP TRIGGER IF EXISTS centre_root;
    DROP TRIGGER IF EXISTS employe_root;

	-- Création des tables
	CREATE TABLE compagnies(
		id              INT     		NOT NULL AUTO_INCREMENT,
		nom             VARCHAR(100)	NOT NULL,
		info_paiement   TEXT    		NOT NULL,
		courriel        VARCHAR(50)   	NOT NULL,
		mot_de_passe    TEXT   			NOT NULL,
		
		PRIMARY KEY pk_compagnie(id),
		UNIQUE (courriel),
        UNIQUE (nom)
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
		date_fin        TEXT   NOT NULL,

		PRIMARY KEY pk_rab(id),
		FOREIGN KEY fk_rab_comp(compagnie) REFERENCES compagnies(id) ON DELETE CASCADE,
		CONSTRAINT const_bool CHECK(isActive=0 OR isActive = 1)
	)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

	CREATE TABLE horaires(
		id              INT         NOT NULL AUTO_INCREMENT,
		heure_debut     VARCHAR(10) NOT NULL,
		heure_fin       VARCHAR(10)	NOT NULL,

		PRIMARY KEY pk_horaire(id),
		UNIQUE(heure_debut, heure_fin)
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
		privee			INT			NOT NULL,
		
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
		salaire         FLOAT   	NULL,
		num_telephone   TEXT        NULL,
		niveau_acces    INT         NOT NULL DEFAULT 1,
		courriel        VARCHAR(50) NOT NULL,
		num_ass         INT         NULL,
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
		num_telephone       TEXT         NOT NULL,
		statut_reservation  INT         NOT NULL,
		salle				INT			NOT NULL,
		nb_personnes        INT         NOT NULL,
		courriel            TEXT        NOT NULL,
		prix_total          FLOAT	    NOT NULL,
		date                DATETIME	NOT NULL,
		
		PRIMARY KEY pk_resa(id),
		FOREIGN KEY fk_r_salle(salle) REFERENCES salles(id) ON DELETE CASCADE,
		CONSTRAINT const_statut CHECK(statut_reservation = 0 OR statut_reservation = 1),
		UNIQUE(date, salle)
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

	CREATE VIEW view_reservation_compagnie AS
	SELECT reservations.id AS 'id_reservation',
	reservations.courriel AS 'courriel',
	centres.nom AS 'Centre',
	salles.nom AS 'Salle',
	reservations.date AS 'Date',
	reservations.nom_client AS 'Client',
	reservations.nb_personnes AS 'Participants',
	reservations.num_telephone AS 'Telephone',
	reservations.statut_reservation AS 'Statut',
	reservations.prix_total AS 'Prix',
	salles.id AS 'id_salle',
	centres.id AS 'id_centre',
	centres.compagnie AS 'id_compagnie'
	FROM reservations
	INNER JOIN salles ON salles.id = reservations.salle
	INNER JOIN centres ON centres.id = salles.centre;
    
-- Trigger
DELIMITER //
CREATE TRIGGER centre_root
AFTER INSERT
ON compagnies
FOR EACH ROW
INSERT INTO centres(nom, compagnie, adresse, ville, pays, code_postal)
VALUES (new.nom, new.id, '*** rue', 'ville', 'Canada', 'H1H 1H1')//
DELIMITER ;

DELIMITER //
CREATE TRIGGER employe_root
AFTER INSERT
ON compagnies
FOR EACH ROW
INSERT INTO employes(compagnie, nom, prenom, courriel, mot_de_passe)
VALUES (new.id, 'root', 'propriétaire', new.courriel, new.mot_de_passe)//
DELIMITER ;

DELIMITER //
CREATE TRIGGER lier_e_c
AFTER INSERT
ON employes
FOR EACH ROW
INSERT INTO emp_cent(id_emp, id_centre)
VALUES (new.id, (SELECT id from centres WHERE compagnie = new.compagnie LIMIT 1))//
DELIMITER ;