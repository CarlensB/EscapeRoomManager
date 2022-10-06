
# *****************Initialisation BD*****************

class initialiser_bd:

    @staticmethod
    def creation_utilisateur(nom_compagnie : str) -> str:
        return f'''
    '{nom_compagnie}_user'@'localhost' IDENTIFIED by '{nom_compagnie}1';
    '''

    @staticmethod
    def donner_droit_sur_db(nom_compagnie : str) -> str:
        return f'''GRANT ALL ON magix_db.* TO {nom_compagnie}_user'@'localhost';'''
    
COLLATE = "utf8_general_ci"
CAR ='utf8'

CREER_DATABASE =f'''
CREATE DATABASE IF NOT EXISTS ERM_DB
CHARACTER SET {CAR}
COLLATE {COLLATE};
'''

UTILISER_DB = '''
USE ERM_DB;
'''

# *****************Compagnie*****************
CREER_COMPAGNIE=f'''
CREATE TABLE compagnies(
    id              INT     NOT NULL AUTO_INCREMENT,
    nom             TEXT    NOT NULL,
    info_paiement   TEXT    NOT NULL,
    courriel        TEXT    NOT NULL,
    mot_de_passe    TEXT    NOT NULL,
    
    PRIMARY KEY pk_compagnie(id),
    
    UNIQUE(courriel)
)ENGINE = innoDB CHARACTER SET {CAR} COLLATE {COLLATE};
'''

# *****************TypeClient*****************
CREER_TYPECLIENT=f'''
CREATE TABLE typeclient(
    id              INT     NOT NULL AUTO_INCREMENT,
    categorie       TEXT    NOT NULL,
    prix            TEXT    NOT NULL,
    compagnie       INT     NOT NULL,
    
    PRIMARY KEY pk_tc(id),
    FOREIGN KEY fk_tc_comp(compagnie) REFERENCES compagnies(id)
)ENGINE = innoDB CHARACTER SET {CAR} COLLATE {COLLATE};
'''

# *****************Rabais*****************
CREER_RABAIS=f'''
CREATE TABLE rabais(
    id              INT         NOT NULL AUTO_INCREMENT,
    nom             TEXT        NOT NULL,
    pourcentage     NUMERIC     NOT NULL,
    compagnie       INT         NOT NULL,
    isActive        ENUM(0,1)   NOT NULL DEFAULT 0,
    date_fin        TIMESTAMP   NOT NULL,

    PRIMARY KEY pk_rab(id),
    FOREIGN KEY fk_rab_comp(compagnie) REFERENCES compagnies(id)
)ENGINE = innoDB CHARACTER SET {CAR} COLLATE {COLLATE};
'''

# *****************Salle*****************
CREER_SALLE=f'''
CREATE TABLE salle(
    id              INT         NOT NULL AUTO_INCREMENT,
    Nom             TEXT        NOT NULL,
    description     TEXT        NOT NULL,
    centre          INT        NOT NULL,
    nb_max_joueur   INT         NOT NULL,
    prix_unitaire   NUMERIC     NOT NULL,
    duree           TIMESTAMP   NOT NULL,
    
    PRIMARY KEY pk_salle(id),
    FOREIGN KEY fk_s_centre(centre) REFERENCES centre(id)
    
    UNIQUE(courriel)
)ENGINE = innoDB CHARACTER SET {CAR} COLLATE {COLLATE};
'''

# *****************Horaire*****************
CREER_HOAIRE=f'''
CREATE TABLE horaire(
    id              INT         NOT NULL AUTO-INCREMENT,
    salle           INT         NOT NULL,
    heure_debut     TIMESTAMP   NOT NULL,
    heure_fin       TIMESTAMP   NOT NULL,
    intervalle      TIMESTAMP   NOT NULL,
    
    PRIMARY KEY pk_horaire(id),
    FOREIGN KEY fk_h_salle(salle) REFERENCES salle(id)
)ENGINE = innoDB CHARACTER SET {CAR} COLLATE {COLLATE};
'''

# *****************Employe*****************
CREER_EMPLOYE=f'''
CREATE TABLE employe(
    id              INT         NOT NULL AUTO-INCREMENT,
    compagnie       INT         NOT NULL,
    centre          INT         NOT NULL,
    nom             TEXT        NOT NULL,
    prenom          TEXT        NOT NULL,
    salaire         NUMERIC     NOT NULL,
    num_telephone   TEXT        NOT NULL,
    niveau_acces    INT         NOT NULL,
    courriel        TEXT        NOT NULL,
    num_ass         INT         NOT NULL,
    mot_de_passe    TEXT        NOT NULL,
    
    PRIMARY KEY pk_employe(id),
    FOREIGN KEY fk_e_compagnie(compagnie) REFERENCES compagnie(id),
    FOREIGN KEY fk_h_centre(centre) REFERENCES centre(id),
    UNIQUE(courriel)
    
)ENGINE = innoDB CHARACTER SET {CAR} COLLATE {COLLATE};
'''

# *****************Centre*****************
CREER_CENTRE=f'''
CREATE TABLE centre(
    id              INT         NOT NULL AUTO-INCREMENT,
    nom             TEXT        NOT NULL,
    compagnie       INT         NOT NULL,
    adresse         TEXT        NOT NULL,
    ville           TEXT        NOT NULL,
    pays            TEXT        NOT NULL,
    code_postal     TEXT        NOT NULL,
    
    PRIMARY KEY pk_centre(id),
    FOREIGN KEY fk_c_comp(compagnie) REFERENCES compagnie(id)
    
)ENGINE = innoDB CHARACTER SET {CAR} COLLATE {COLLATE};
'''

# *****************Reservation*****************
CREER_RESERVATION=f'''
CREATE TABLE reservation(
    id                  INT         NOT NULL AUTO-INCREMENT,
    nom_client          TEXT        NOT NULL,
    num_telephone       INT         NOT NULL,
    statut_reservation  INT         NOT NULL,
    nb_personnes        INT         NOT NULL,
    courriel            TEXT        NOT NULL,
    heure               INT         NOT NULL,
    coupon_rabais       INT         NOT NULL,
    prix_total          INT         NOT NULL,
    date                TIMESTAMP   NOT NULL,
    
    PRIMARY KEY pk_resa(id),
    FOREIGN KEY fk_r_salle(salle) REFERENCES salle(id)
    FOREIGN KEY fk_r_salle(heure) REFERENCES horaire(id)
    FOREIGN KEY fk_r_salle(coupon_rabais) REFERENCES rabais(id)
    
)ENGINE = innoDB CHARACTER SET {CAR} COLLATE {COLLATE};
'''

