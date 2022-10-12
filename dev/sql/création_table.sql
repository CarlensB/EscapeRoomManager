CREATE DATABASE IF NOT EXISTS ERM_DB
CHARACTER SET utf8
COLLATE utf8_general_ci;

USE ERM_DB;

-- Création de l'utilisateur
CREATE USER 'erm_user'@'localhost' IDENTIFIED by 'EscapeRoomManager';
GRANT ALl on erm_db.* TO 'erm_user'@'localhost';

-- Supression des tables
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS employes;
DROP TABLE IF EXISTS typeclient;
DROP TABLE IF EXISTS rabais;
DROP TABLE IF EXISTS horaires;
DROP TABLE IF EXISTS salles;
DROP TABLE IF EXISTS centres;
DROP TABLE IF EXISTS compagnies;


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
    id              INT     NOT NULL AUTO_INCREMENT,
    categorie       TEXT(50)NOT NULL,
    prix            TEXT    NOT NULL,
    compagnie       INT     NOT NULL,
    
    PRIMARY KEY pk_tc(id),
    FOREIGN KEY fk_tc_compfk_tc_comp(compagnie) REFERENCES compagnies(id),
    UNIQUE (categorie)
)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE rabais(
    id              INT         NOT NULL AUTO_INCREMENT,
    nom             TEXT        NOT NULL,
    pourcentage     NUMERIC     NOT NULL,
    compagnie       INT         NOT NULL,
    isActive        INT			NOT NULL DEFAULT 0,
    date_fin        TIMESTAMP   NOT NULL,

    PRIMARY KEY pk_rab(id),
    FOREIGN KEY fk_rab_comp(compagnie) REFERENCES compagnies(id),
    CONSTRAINT const_bool CHECK(isActive=0 OR isActive = 1)
)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE centres(
    id              INT         NOT NULL AUTO_INCREMENT,
    nom             TEXT        NOT NULL,
    compagnie       INT         NOT NULL,
    adresse         TEXT        NOT NULL,
    ville           TEXT        NOT NULL,
    pays            TEXT        NOT NULL,
    cocompagniesde_postal     TEXT        NOT NULL,
    
    PRIMARY KEY pk_centre(id),
    FOREIGN KEY fk_c_comp(compagnie) REFERENCES compagnies(id)
)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE salles(
    id              INT         NOT NULL AUTO_INCREMENT,
    Nom             TEXT        NOT NULL,
    description     TEXT        NOT NULL,
    centre          INT        	NOT NULL,
    nb_max_joueur   INT         NOT NULL,
    prix_unitaire   NUMERIC     NOT NULL,
    duree           TIMESTAMP   NOT NULL,
    
    PRIMARY KEY pk_salle(id),
    FOREIGN KEY fk_s_centre(centre) REFERENCES centres(id)
)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE horaires(
    id              INT         NOT NULL AUTO_INCREMENT,
    salle           INT         NOT NULL,
    heure_debut     TIMESTAMP   NOT NULL,
    heure_fin       TIMESTAMP   NOT NULL,
    intervalle      TIMESTAMP   NOT NULL,
    
    PRIMARY KEY pk_horaire(id),
    FOREIGN KEY fk_h_salle(salle) REFERENCES salles(id)
)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE employes(
    id              INT         NOT NULL AUTO_INCREMENT,
    compagnie       INT         NOT NULL,
    centre          INT         NOT NULL,
    nom             TEXT        NOT NULL,
    prenom          TEXT        NOT NULL,
    salaire         NUMERIC     NOT NULL,
    num_telephone   TEXT        NOT NULL,
    niveau_acces    INT         NOT NULL,
    courriel        VARCHAR(50) NOT NULL,
    num_ass         INT         NOT NULL,
    mot_de_passe    TEXT        NOT NULL,
    
    PRIMARY KEY pk_employe(id),
    FOREIGN KEY fk_e_compagnie(compagnie) REFERENCES compagnies(id),
    FOREIGN KEY fk_h_centre(centre) REFERENCES centres(id),
    UNIQUE(courriel)
)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE reservations(
    id                  INT         NOT NULL AUTO_INCREMENT,
    nom_client          TEXT        NOT NULL,
    num_telephone       INT         NOT NULL,
    statut_reservation  INT         NOT NULL,
    salle				INT			NOT NULL,
    nb_personnes        INT         NOT NULL,
    courriel            TEXT        NOT NULL,
    heure               INT         NOT NULL,
    coupon_rabais       INT         NOT NULL,
    prix_total          INT         NOT NULL,
    date                TIMESTAMP   NOT NULL,
    
    PRIMARY KEY pk_resa(id),
    FOREIGN KEY fk_r_salle(salle) REFERENCES salles(id),
    FOREIGN KEY fk_r_heure(heure) REFERENCES horaires(id),
    FOREIGN KEY fk_r_rabais(coupon_rabais) REFERENCES rabais(id)
)ENGINE = innoDB CHARACTER SET utf8 COLLATE utf8_general_ci;

SELECT * FROM typeclient