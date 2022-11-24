from argparse import Action
from dataclasses import dataclass
from enum import Enum
from sqlite3 import Date
from typing import Union
from .actionDAO import ActionDAO
import bcrypt
# installation : python pip.exe install bcrypt
# folder : C:\Python310\Scripts
import re
import codecs
from .Algorithme import AlgoContext
from .Liste_chainee import DoubleLinkedList


# source pour l'encodage et décodage du mot de passe :
# https://zetcode.com/python/bcrypt/ et un peu d'aide de Pierre-Paul Monty pour la libraire codecs

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
        self.__user = None
        # Initialisation des objects
        self.__compagnie = None
        self.__centres = DoubleLinkedList()
        self.__salles = DoubleLinkedList()
        self.__reservations = DoubleLinkedList()
        
        self.__employes = []
        
        self.__type_clients = []
        self.__rabais = []
        
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
    def utilisateur(self):
        return self.__user

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
            self.__user = Employe(information[0],
                                 information[2],
                                 information[3],
                                 information[4],
                                 information[5],
                                 information[6],
                                 information[7],
                                 information[8])
            return True, 'Connexion Validé'
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

# ==============================================================================
#           DataClass interne

@dataclass()
class Compagnie:
    id: int
    nom: str
    info_paiement: str
    courriel: str

@dataclass()
class Reservation:
    id: int
    courriel: str = None
    centre: str = None
    salle: str = None
    heure: str = None
    nom_client: str = 'Client'
    num_telephone: str = '514-000-0000'
    participant: int = 0
    statut: bool = False
    prix_total: float = 0.0
    date: Date = None

@dataclass()
class Horaire:
    id: int
    heure_debut: str
    heure_fin: str

@dataclass()
class Salle:
    id: int
    nom: str
    description: str
    centre: str
    nb_joueur_max: int
    prix_unitaire: float
    duree: float
    privee: bool
    liste_horaire: list[Horaire]

@dataclass()
class Centre:
    id: int
    nom: str
    adresse: str
    ville: str
    pays: str
    code_postal: str

@dataclass()
class Employe:
    id: int
    nom: str
    prenom: str
    salaire: float
    num_telephone: str
    niveau_acces: int
    courriel: str
    num_ass: int

@dataclass
class Rabais:
    id: int
    nom: str
    pourcentage: float  # Exemple 0.15 pour 15%
    actif: bool
    date_fin: Date

@dataclass()
class TypeClient:
    id: int
    categorie: str
    prix: float 
