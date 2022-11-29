from dataclasses import dataclass
from enum import Enum
from sqlite3 import Date
from typing import Union
from .actionDAO import ActionDAO
import bcrypt
import hashlib
# installation : python pip.exe install bcrypt
# folder : C:\Python310\Scripts
import re
import codecs
from .Algorithme import AlgoContext
from .Liste_chainee import DoubleLinkedList


# source pour l'encodage et décodage du mot de passe :
# https://zetcode.com/python/bcrypt/ et un peu d'aide de Pierre-Paul Monty pour la libraire codecs

class Employe:
    def __init__(self, idx: int, id_compagnie, nom: str, prenom: str,
                    salaire: float, tel: str, niv_acces: int,
                    courriel: str, num_ass: int, dao: ActionDAO) -> None:
        self.__token = None
        self.__idx = idx
        self.__nom = nom
        self.__prenom = prenom
        self.__salaire = salaire
        self.__telephone = tel
        self.__niveau_acces = niv_acces
        self.__courriel = courriel
        self.__num_ass = num_ass
        self.__dao = dao
        self.__compagnie = self.__get_compagnie(id_compagnie)
        
    def __eq__(self, emp: 'Employe') -> bool:
        return self.__idx == emp.idx

    def __repr__(self) -> str:
        return " ".join(self.__prenom, self.__nom)

    @property
    def idx(self):
        return self.__idx

    @property
    def nom(self):
        return self.__nom

    @property
    def prenom(self):
        return self.__prenom

    @property
    def salaire(self):
        return self.__salaire

    @property
    def telephone(self):
        return self.__telephone

    @property
    def niv_access(self):
        return self.__niveau_acces

    @property
    def courriel(self):
        return self.__courriel

    @property
    def num_assurance_scoial(self):
        return self.__num_ass

    @property
    def compagnie(self):
        return self.__compagnie

    @property
    def token(self):
        return self.__token

    @token.setter
    def token(self, value):
        self.__token = value

    def __get_compagnie(self, id_compagnie: int):
        result = self.__dao.requete_dao(self.__dao.Requete.SELECT, self.__dao.Table.COMPAGNIE, [(id_compagnie,)])[0]
        compagnie = Compagnie(result[0], result[1], result[2], result[3], self.__dao)
        return compagnie


class Compagnie:
    
    def __init__(self, idx: int, nom: str, info_paiement: str, courriel: str, dao):
        self.__idx = idx
        self.__nom = nom
        self.__info_paiement = info_paiement
        self.__courriel = courriel
        self.__centres = self.__get_centres(dao)
        self.__rabais = self.__get_rabais(dao)
        self.__type_clients = self.__get_type_clients(dao)
        
    def __eq__(self, compagnie: 'Compagnie') -> bool:
        return self.__idx == compagnie.idx
    
    def __repr__(self) -> str:
        return self.__nom
    
    @property
    def index(self):
        return self.__idx
    
    @property
    def nom(self):
        return self.__nom
    
    @property
    def info_paiement(self):
        return self.__info_paiement
    
    @property
    def courriel(self):
        return self.__courriel
    
    @property
    def centres(self):
        return self.__centre
    
    def __get_centres(self, dao: ActionDAO) -> list:
        result = dao.requete_dao(dao.Requete.SELECT_ALL, dao.Table.CENTRE, [(self.index,)])
        for info in result:
            centre = Centre(info)
        #print(result)
    
    def __get_rabais(self, dao: ActionDAO) -> list:
        pass
    
    def __get_type_clients(self, dao: ActionDAO) -> list:
        pass


class Centre:
    
    def __init__(self, idx: int, nom: str, adresse: str, ville: str, pays: str, code_postal: str):
        self.__idx = idx
        self.__nom = nom
        self.__adresse = adresse
        self.__ville = ville
        self.__pays = pays
        self.__code_postal = code_postal
        self.__salles = self.__get_salle()
        self.__reservations = self.__get_reservation()
        
    @property
    def index(self):
        return self.__idx
    
    @property
    def nom(self):
        return self.__nom
    
    @property
    def adresse(self):
        return self.__adresse
    
    @property
    def ville(self):
        return self.__ville
    
    @property
    def pays(self):
        return self.__pays
    
    @property
    def code_postal(self):
        return self.__code_postal
    
    @property
    def salles(self):
        return self.__salles
    
    @property
    def reservations(self):
        return self.__reservations
    
    def __eq__(self, centre: 'Centre') -> bool:
        return self.idx == centre.idx
    
    def __repr__(self) -> str:
        return self.nom
    
    def __get_salle(self, dao: ActionDAO) -> list:
        pass
    
    def __get_reservation(self, dao: ActionDAO) -> list:
        pass

class Reservation:
    
    def __init__(self, idx: int, courriel: str, salle: 'Salle', heure: 'Horaire',
                 nom_client: str, telephone: str, participant: int, statut: bool,
                 prix_total: float, date: Date) -> None:
        
        self.__idx = idx
        self.__courriel = courriel
        self.__salle = salle
        self.__heure = heure
        self.__nom_client = nom_client
        self.__telephone = telephone
        self.__participant = participant
        self.__statut = statut
        self.__prix_total = prix_total
        self.__date = date
        
    @property
    def index(self):
        return self.__idx
    
    @property
    def courriel(self):
        return self.__courriel
    
    @property
    def salle(self):
        return self.__salle
    
    @property
    def heure(self):
        return self.__heure
    
    @property
    def client(self):
        return self.__nom_client
    
    @property
    def telephone(self):
        return self.__telephone
    
    @property
    def participant(self):
        return self.__participant
    
    @property
    def statut(self):
        return self.__statut
    
    @property
    def prix_total(self):
        return self.__prix_total
    
    @property
    def date(self):
        return self.__date
    
    
    def modification_reservation(self, dao: ActionDAO, **kwargs):
        '''
        Variable modifiable :
        statut -> bool
        participant -> int
        date -> Date
        heure -> Horaire
        salle -> Salle
        '''
        
        key = set(kwargs.keys())

        if key == set():
            return "Aucune modification faite, aucune variable passé en paramètre"
        
        elif key == {"statut"}:
            self.__statut = kwargs["statut"]
            
        elif key == {"participant"}:
            self.__participant = kwargs["participant"]
            
        elif key == {"date"}:
            self.__date = kwargs["date"]
            
        elif key == {"heure"}:
            self.__heure = kwargs["heure"]
            
        elif key == {"salle"}:
            self.__salle = kwargs["salle"]
            
        elif key == {"date", "heure"}:
            self.__statut = kwargs["statut"]
            self.__participant = kwargs["participant"]
            self.__date = kwargs["date"]
            self.__heure = kwargs["heure"]
            
        elif key == {"participant", "date", "heure"}:
            self.__participant = kwargs["participant"]
            self.__date = kwargs["date"]
            self.__heure = kwargs["heure"]
            
        elif key == {"statut", "date", "heure"}:
            self.__statut = kwargs["statut"]
            self.__date = kwargs["date"]
            self.__heure = kwargs["heure"]
            
        elif key == {"statut", "participant", "date", "heure"}:
            self.__statut = kwargs["statut"]
            self.__participant = kwargs["participant"]
            self.__date = kwargs["date"]
            self.__heure = kwargs["heure"]
            
        elif key == {"participant", "date", "heure", "salle"}:
            self.__participant = kwargs["participant"]
            self.__date = kwargs["date"]
            self.__heure = kwargs["heure"]
            self.__salle = kwargs["salle"]
            
        elif key == {"statut", "participant", "date", "heure", "salle"}:
            self.__statut = kwargs["statut"]
            self.__participant = kwargs["participant"]
            self.__date = kwargs["date"]
            self.__heure = kwargs["heure"]
            self.__salle = kwargs["salle"]
            
        else:
            return False, "Erreur dans les paramètres de modification"
        
        try:
            dao.requete_dao(dao.Requete.UPDATE, dao.Table.RESERVATION, self.client, self.telephone, self.statut,
                        self.salle, self.participant, self.courriel, self.heure, self.prix_total, self.date, self.index)
        except:
            return False, "Erreur dans la modification des paramètres"
        
        return True, "Reservation modifier"
    
    def __eq__(self, reservation: 'Reservation') -> bool:
        return self.index == reservation.index
    
    def __repr__(self) -> str:
        return " ".join(self.client, self.date, self.heure) 
    
class Horaire:
    
    def __init__(self, idx: int, h_debut: str, h_fin: str) -> None:
        self.__idx = idx
        self.__heure_debut = h_debut
        self.__heure_fin = h_fin
        
    @property
    def index(self):
        return self.__idx
    
    @property
    def heure_depart(self):
        return self.__heure_debut
    
    @property
    def heure_fin(self):
        return self.__heure_fin
    
    def __eq__(self, horaire: 'Horaire') -> bool:
        return self.index == horaire.idx
    
    def __repr__(self) -> str:
        return " ".join(self.heure_depart, self.heure_fin)
    
class Salle:

    def __init__(self, idx: int, nom: str, description: str, nb_joueur_max: int,
                 prix_unitaire: float, duree: float, dao: ActionDAO, privee: bool = True) -> None:
        self.__idx = idx
        self.__nom = nom
        self.__description = description
        self.__nb_joueur_max = nb_joueur_max
        self.__prix_unitaire = prix_unitaire
        self.__duree = duree
        self.__privee = privee
        self.__horaires = self.__get_horaire(dao)
        
    @property
    def index(self):
        return self.__idx
    
    @property
    def nom(self):
        return self.__nom
    
    @property
    def description(self):
        return self.__description
    
    @property
    def nb_joueur_max(self):
        return self.__nb_joueur_max
    
    @property
    def prix_unitaire(self):
        return self.__prix_unitaire
        
    @property
    def duree(self):
        return self.__duree
    
    @property
    def privee(self):
        return self.__privee
    
    @property
    def liste_horaire(self):
        return self.__horaires
    
    def __eq__(self, salle: 'Salle') -> bool:
        return self.index == salle.index
    
    def __repr__(self) -> str:
        return " ".join(self.nom, self.description)
    
    def __get_horaire(self, dao):
        pass

class Rabais:
    
    def __init__(self, idx: int, nom: str, pourcentage: float, actif: bool, echeance: Date) -> None:
        self.__idx = idx
        self.__nom = nom
        self.__pourcentage = pourcentage
        self.__actif = actif
        self.__echeance = echeance
        
    @property
    def index(self):
        return self.__idx
    
    @property
    def nom(self):
        return self.__nom
    
    @property
    def pourcentage(self):
        return self.__pourcentage
    
    @property
    def actif(self):
        return self.__actif
    
    @property
    def echeance(self):
        return self.__echeance
        
    def __eq__(self, rabais: 'Rabais') -> bool:
        return self.index == rabais.index
    
    def __repr__(self) -> str:
        return " ".join(self.nom, self.actif, self.echeance)

class TypeClient:
    
    def __init__(self, idx: int, categorie: str, prix: float) -> None:
        self.__idx = idx
        self.__categorie = categorie
        self.__prix = prix
        
    @property
    def index(self):
        return self.__idx
    
    @property
    def categorie(self):
        return self.__categorie
    
    @property
    def prix(self):
        return self.__prix
        
    def __eq__(self, type_client: "TypeClient") -> bool:
        return self.index == type_client.index
    
    def __repr__(self) -> str:
        return " ".join(self.categorie, self.prix)



class Enregistrement:
    '''
    La classe enregistrement permet d'enregistrer une nouvelle compagnie ou un autre usager
    dans la table employe qui pourra se connecter au système de la compagnie auquel il appartient.
    '''

    __MESSAGE_MDP_TAILLE = "La taille du mot de passe doit être de 12 caractères et plus."
    __MESSAGE_MDP_CS = "Le mot de passe doit contenir au moins 1 caractère spéciale."
    __MESSAGE_MDP_MAJ = "Le mot de passe doit contenir au moins 1 lettre majuscule."
    __MESSAGE_MDP_MIN = "Le mot de passe doit contenir au moins 1 lettre minuscule."
    __MESSAGE_MDP_CHIFFRE = "Le mot de passe doit contenir au moins 1 chiffre."

    def __init__(self, table: ActionDAO.Table, info: dict):
        self.__info = info
        self.__type = table
        self.__msg = []
        self.__element = str(table).split('.')[1]
        self.__enregistrement()

    @property
    def msg(self):
        return self.__msg

    def __enregistrement(self):
        cour_valide, cour_msg = self.__validation_courriel(self.__info['courriel'])
        mdp_valide, mdp_msg = self.__validation_mdp(self.__info['mdp'])
        print(self.__enregistrer([cour_valide, mdp_valide], [cour_msg, mdp_msg]))

    def __crypter_mdp(self):
        mdp = codecs.encode(self.__info['mdp'])
        sel = bcrypt.gensalt()
        cryptage = bcrypt.hashpw(mdp, sel)
        mdp = codecs.decode(cryptage)
        self.__info['mdp'] = mdp

        # codex : module encoder byte codex.encode
        # decode pour retourner en str, lui donner le type et l'encodage comme utf-8

    def __validation_mdp(self, mdp: str):
        # règle du mot de passe : 
        # 12 caractère minimum, une majuscule, une minuscule, un chiffre, un caractère spécial
        pattern = [(self.__MESSAGE_MDP_CHIFFRE, r'\d+'),
                   (self.__MESSAGE_MDP_MAJ, r'[A-Z]+'),
                   (self.__MESSAGE_MDP_MIN, r'[a-z]+'),
                   (self.__MESSAGE_MDP_CS, r'\W+')]
        valider = True
        msg = 'mot de passe valide'

        if not len(mdp) >= 12:
            valider = False
            msg = self.__MESSAGE_MDP_TAILLE
        else:
            for p in pattern:
                if not re.search(p[1], mdp):
                    valider = False
                    msg = p[0]
                    break

        return valider, msg

    def __validation_courriel(self, courriel: str):
        pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        # source = https://www.geeksforgeeks.org/check-if-email-address-valid-or-not-in-python/
        if not re.fullmatch(pattern, courriel):
            return False, 'Courriel invalide'

        return True, 'Courriel valide'

    def __enregistrer(self, validation: list[bool], msg: list[str]):
        liste = []

        if not validation[0] or not validation[1]:
            self.__msg = msg
        else:
            self.__crypter_mdp()
            for element in self.__info:
                liste.append(self.__info[element])

            liste = [tuple(liste)]
            try:
                a = ActionDAO()
                a.requete_dao(a.Requete.INSERT, self.__type, liste)
                self.__msg.append(self.__element + ' enregistrer')
            except:
                 self.__msg.append(self.__element +" déjà enregistrer")


class GestionSysteme:
    
    __ALGO_ERROR ="""
    Les paramètres passées à la fonction ne sont pris en charge.
    
    La fonction prends les keywords suivant :
    h_start: float -> temps du premier départ
    h_end: float -> temps du dernier départ
    duration: float -> la durée de l'activité
    interval: float -> le temps entre deux départ
    nb_room: int -> le nombre de salle pour lesquelles on veut un horaire
    nb_emp: int -> le nombre d'employé par activité
    reset_time: float -> le temps pour réinitialliser l'activité
    greeting_time: float -> le temps d'accueil
    goodbye_time: float -> le temps de débriefing
    buffer: float -> Le temps à planifier entre les départs
    """
    
    class NiveauAcces(Enum):
        Proprietaire = 1
        Gerant = 2
        Employe = 3

    def __init__(self):
        self.__utilisateurs = {}
        # ===========================
        self.__user = None
        # Initialisation des objects
        self.__compagnie = None
        self.__centres = DoubleLinkedList()
        self.__salles = DoubleLinkedList()
        self.__reservations = DoubleLinkedList()
        
        self.__employes = []
        
        self.__type_clients = []
        self.__rabais = []
        # ===================================
        
        self.__algo = AlgoContext()
        self.__dao = ActionDAO()
        self.__action_table = {
            'compagnie': ActionDAO.Table.COMPAGNIE,
            'centre': ActionDAO.Table.CENTRE,
            'salle': ActionDAO.Table.SALLE,
            'horaire': ActionDAO.Table.HORAIRE,
            'reservation': ActionDAO.Table.RESERVATION,
            'employe': ActionDAO.Table.EMPLOYE,
            'rabais': ActionDAO.Table.RABAIS,
            'typeclient': ActionDAO.Table.TYPECLIENT
        }

        self.__action = {
                'selectionner': ActionDAO.Requete.SELECT,
                'ajouter': ActionDAO.Requete.INSERT,
                'supprimer': ActionDAO.Requete.DELETE,
                'selectionner_all': ActionDAO.Requete.SELECT_ALL,
                'modifier': ActionDAO.Requete.UPDATE,
                'lier': ActionDAO.Requete.LIER,
            }

        self.page = {
            'register': 'register',
            'login': 'login'
            # ...
        }
        self.fonction = {
            'var': 'var'
        }

    @property
    def utilisateurs(self):
        return self.__utilisateurs

    @property
    def dao(self):
        return self.__dao
    
    @property
    def reservations(self):
        return self.__reservations
    
    @property
    def compagnie(self):
        return self.__compagnie

    @property
    def centres(self):
        return self.__centres
    
    @property
    def salles(self):
        return self.__salles
    
    @property
    def employes(self):
        return self.__employes
    
    @property
    def type_clients(self):
        return self.__type_clients

    @property
    def rabais(self):
        return self.__rabais
    
    @property
    def retourner_id(self):
        return self.__id     
    
    def deconnecter_id(self):
        self.__id = None
        return True

    def valider_connexion(self, info: dict):
        # info, contient courriel et mdp
        a = ActionDAO()
        result = a.requete_dao(a.Requete.SELECT, a.Table.EMPLOYE, [(info['courriel'],)])
        if not result:
            return False, 'courriel inexistant'
        information = result[0]
        mdp_crypte = codecs.encode(information[-1])
        mdp = codecs.encode(info['mdp'])
        if bcrypt.checkpw(mdp, mdp_crypte):
            utilisateur = Employe(information[0],
                                    information[1],
                                    information[2],
                                    information[3],
                                    information[4],
                                    information[5],
                                    information[6],
                                    information[7],
                                    information[8],
                                    self.dao)
            hash = utilisateur.nom + utilisateur.prenom
            utilisateur.token = hashlib.sha1(hash.encode())
            self.__utilisateurs[utilisateur.token] = utilisateur
            return True, utilisateur.token.hexdigest(), 'Connexion Validé',
        else:
            return False, 'mot de passe invalide'

    def enregistrer(self, table: str, info: dict):
        d = {}
        for key in info.keys():
            d[key] = info[key]
            
        e = Enregistrement(self.__action_table[table], d)
        return e.msg       
        
    def resilier_abonnement(self):
        a = ActionDAO()
        result = a.requete_dao(a.Requete.DELETE, a.Table.Compagnie, self.__id)
        return result
    
    def interaction_dao(self, action: str, table: str, info: dict):
        liste = []

        for key in info.keys():
            liste.append(info[key])
        liste = [tuple(liste)]

        t = self.__action_table[table]
        r = self.__action[action]
        result = self.__dao.requete_dao(r, t, liste)

        return result

    def creation_horaire(self, **info: any) -> list['GestionSysteme.Salle']:
        '''
        La fonction prends les keywords suivant :
        h_start: float -> temps du premier départ en minute
        h_end: float -> temps du dernier départ en minute
        duration: float -> la durée de l'activité
        interval: float -> le temps entre deux départ
        nb_room: int -> le nombre de salle pour lesquelles on veut un horaire
        nb_emp: int -> le nombre d'employé par activité
        reset_time: float -> le temps pour réinitialliser l'activité
        greeting_time: float -> le temps d'accueil
        goodbye_time: float -> le temps de débriefing
        buffer: float -> Le temps à planifier entre les départs
        '''
        try:
            return self.__algo.create_schedule(**info)
        except (ValueError, KeyError) as e:
            return ValueError(self.__ALGO_ERROR)

    # ==============================================================================
    #           Fonctions protégés

    def __verifier_centre(self, a: ActionDAO, centre: tuple):
        liste_centre = a.requete_dao(a.Requete.SELECT, a.Table.CENTRE, centre[1])
        for c in liste_centre:
            if centre[0] == c[1]:
                return c[0]
        a.requete_dao(a.Requete.INSERT, a.Table.CENTRE, centre)
        self.__verifier_centre(a, centre)     

    def __get_client(self, index: int):
        a = ActionDAO()
        result = a.requete_dao(a.Requete.SELECT, a.Table.COMPAGNIE, [(index,)])
        print(result)
        return result[0][1]

    def __determiner_prix(self, r: 'Reservation'):
        tps = 0.05
        tvq = 0.09975
        cout_base = self.__participant * self.__salle.prix
        r.prix_total = cout_base + cout_base * tps + cout_base * tvq
