from argparse import Action
from dataclasses import dataclass
from enum import Enum
from typing import Union
from .actionDAO import ActionDAO
import bcrypt
# installation : python pip.exe install bcrypt
# folder : C:\Python310\Scripts
import re
import codecs
from .Algorithme import AlgoContext


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
        self.__enregistrer([cour_valide, mdp_valide], [cour_msg, mdp_msg])

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
    class NiveauAcces(Enum):
        Proprietaire = 1
        Gerant = 2
        Employe = 3

    def __init__(self):
        self.__client = None
        self.__user = None
        self.__id = None
        self.__acces = None
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
    def client(self):
        return self.__client

    @property
    def acces(self):
        return self.__acces

    @property
    def dao(self):
        return self.__dao

    def valider_connexion(self, **info: str):
        # info, contient courriel et mdp
        a = ActionDAO()
        result = a.requete_dao(a.Requete.SELECT, a.Table.EMPLOYE, (info['courriel'],))
        information = result[0]
        mdp_crypte = codecs.encode(information[-1])
        mdp = codecs.encode(info['mdp'])
        if bcrypt.checkpw(mdp, mdp_crypte):
            self.__id = information[1]
            self.__user = information[3] + " " + information[2]
            self.__acces = GestionSysteme.NiveauAcces(information[6]).name
            self.__client = self.__get_client(self.__id)
            return True, 'Connexion Validé'
        else:
            return False, 'mot de passe invalide'

    def enregistrer(self, type: str, info: dict):
        e = Enregistrement(self.__action_table[type], info)
        return e.msg

    def deconnexion(self):
        pass

    def resilier_abonnement(self):
        a = ActionDAO()
        result = a.requete_dao(a.Requete.DELETE, a.Table.Compagnie, self.__id)
        return result
    
    def inserer(self, table: str, info: dict):
        liste = []
        for key in info.keys():
            liste.append(info[key])
        liste = tuple(liste)
            
        a = ActionDAO()
        t = self.__action_table[table]
        r = a.Requete.INSERT
        result = a.requete_dao(r, t, liste)
        return result

    def creation_horaire(self, info: dict) -> list['GestionSysteme.Salle']:
        algo = AlgoContext()
        algo.demarrer_algorithme(info['algo_choix'], info['contraintes'])

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
        result = a.requete_dao(a.Requete.SELECT, a.Table.COMPAGNIE, index)
        return result[0][1]

    def __determiner_prix(self, r: 'Reservation'):
        tps = 0.05
        tvq = 0.09975
        cout_base = self.__participant * self.__salle.prix
        r.prix_total = cout_base + cout_base * tps + cout_base * tvq

    # ==============================================================================
    #           DataClass interne

    @dataclass()
    class Reservation:
        id: int
        courriel: str = None
        centre: str = None
        salle: str = None
        nom_client: str = 'Client'
        num_telephone: str = '514-000-0000'
        participant: int = 0
        statut: bool = False
        prix_total: float = 0.0

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
        liste_horaire: list['GestionSysteme.Horaire']

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

    @dataclass()
    class TypeClient:
        id: int
        categorie: str
        prix: float
