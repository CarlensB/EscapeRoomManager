# ===============================================
# Nom du fichier : Modele.py
# Ce fichier contient les classes permettant d'effectuer
# la gestion des données du côté serveur.
# Auteur : Maxence Guindon
# Équipe : Carlens Belony et Maxence Guindon
# ===============================================

from dataclasses import dataclass
from enum import Enum
import traceback
from .actionDAO import ActionDAO
import bcrypt
import hashlib
import datetime as date
import re
import codecs
from .Algorithme import AlgoContext
from .Liste_chainee import DoubleLinkedList


# source pour l'encodage et décodage du mot de passe :
# https://zetcode.com/python/bcrypt/ et un peu d'aide de Pierre-Paul Monty pour la libraire codecs
  
@dataclass()
class Compagnie:
    id: int
    nom: str
    info_paiement: str
    courriel: str

@dataclass()
class Reservation:
    id: int
    courriel: str
    centre: str
    salle: str
    date: date.datetime
    nom_client: str
    participant: int
    num_telephone: str
    statut: int
    prix_total: float

@dataclass()
class Horaire:
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
    privee: bool
    liste_horaire = []

@dataclass()
class Centre:
    id: int
    nom: str
    id_compagnie: int
    adresse: str
    ville: str
    pays: str
    code_postal: str

@dataclass()
class Employe:
    id: int
    id_compagnie: int
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
    pourcentage: float
    actif: bool
    id_compagnie: int
    date_fin: str

@dataclass()
class TypeClient:
    id: int
    categorie: str
    prix: float
    
class Usager:
    def __init__(self, utilisateur: Employe, dao: ActionDAO) -> None:
        self.__dao = dao
        self.__id_compagnie = utilisateur.id_compagnie
        self.__session_info ={
            'usager': utilisateur,
            'employes': [],
            'compagnie': None,
            'centres': [],
            'salles': DoubleLinkedList(),
            'reservations': DoubleLinkedList(),
            'rabais': [],
            'typeClient': []
        }
        print(self.__obtenir_info_initiale())
        
    @property
    def session_info(self):
        return self.__session_info
    
    @property
    def id_compagnie(self):
        return self.__id_compagnie
    
    def __obtenir_info_initiale(self):
        msg_erreur = []
        try:
            info = self.__dao.requete_dao(ActionDAO.Requete.SELECT_ALL, ActionDAO.Table.EMPLOYE, [(self.__id_compagnie,)])
            for e in info:
                self.__session_info["employes"].append(Employe(*e[:-1]))
        except:
            msg_erreur.append("Aucun employe à afficher")
        
        try:
            info = self.__dao.requete_dao(ActionDAO.Requete.SELECT, ActionDAO.Table.COMPAGNIE, [(self.__id_compagnie,)])[0]
            self.__session_info["compagnie"] = Compagnie(*info[:-1])
        except:
            msg_erreur.append("Usager invalide, il n'est associé à aucune compagnie")
        
        try:
            info = self.__dao.requete_dao(ActionDAO.Requete.SELECT_ALL, ActionDAO.Table.CENTRE,[(self.__id_compagnie,)])
            for e in info:
                self.__session_info["centres"].append(Centre(*e))
        except:
            msg_erreur.append("Aucun centre répertorié")
            
        try:
            for centre in self.__session_info["centres"]:
                info = self.__dao.requete_dao(ActionDAO.Requete.SELECT_ALL, ActionDAO.Table.SALLE,[(centre.id,)])
                for e in info:
                    self.__session_info["salles"].add(Salle(*e))
        except:
            msg_erreur.append("Aucune salle n'est incluse dans un centre")
            
        try:
            for salle in self.__session_info['salles']:
                info = self.__dao.requete_dao(ActionDAO.Requete.SELECT_ALL, ActionDAO.Table.HORAIRE, [(salle.nom,)])
                for e in info:
                    debut, fin = e[2:]
                    h = Horaire(debut, fin)
                    salle.liste_horaire.append(h)
        except:
            msg_erreur.append("Aucune horaire répertorié")
            
        try:
            info = self.__dao.requete_dao(ActionDAO.Requete.SELECT_ALL, ActionDAO.Table.RESERVATION,[(self.__id_compagnie,)])
            for e in info:
                reservation = Reservation(*e[:-3])
                self.__session_info["reservations"].add_first(reservation.__dict__)
                
        except Exception as e:
            msg_erreur.append(("Aucune réservation répertorié", traceback.format_exception(e)))
            
        try:
            info = self.__dao.requete_dao(ActionDAO.Requete.SELECT_ALL, ActionDAO.Table.RABAIS,[(self.__id_compagnie,)])
            for e in info:
                self.__session_info["rabais"].append(Rabais(*e))
        except:
            msg_erreur.append("Aucun rabais répertorié")

        try:
            info = self.__dao.requete_dao(ActionDAO.Requete.SELECT_ALL, ActionDAO.Table.TYPECLIENT,[(self.__id_compagnie,)])
            for e in info:
                self.__session_info["typeClient"].append(TypeClient(*e[:-1]))
        except:
            msg_erreur.append("Aucun typeclient répertorié")
                            
        return msg_erreur
            
    def mise_a_jour_session_info(self, table: ActionDAO.Table):
        str_table = str(table).split(".")[1]
        recherche = self.__id_compagnie
        if str_table == 'SALLE':
            self.session_info["salles"].clear()
            for centre in self.session_info["centres"]:
                result = self.__dao.requete_dao(ActionDAO.Requete.SELECT_ALL, table, [(centre.id,)])
                for salle in result:
                    self.session_info["salles"].add(salle)
            print(self.session_info["salles"])
                
        result = self.__dao.requete_dao(ActionDAO.Requete.SELECT_ALL, table, [(recherche,)])

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
        # 12 caractères minimums, une majuscule, une minuscule, un chiffre, un caractère spécial
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
        self.__utilisateurs = {"Null": None}
        self.__id = None
        
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
                'selectionner': self.selectionner,
                'ajouter': self.ajouter,
                'supprimer': self.supprimer,
                'selectionner_all': self.selectionner_tout,
                'modifier': self.modifier,
                'lier': self.lier
            }
        
    @property
    def utilisateurs(self):
        return self.__utilisateurs

    @property
    def dao(self):
        return self.__dao  
    
    @property
    def retourner_id(self):
        return self.__id     
    
    def deconnecter_id(self, token):
        self.__id = None
        self.__utilisateurs.pop(token)
        return True

    def valider_connexion(self, info: dict):
        '''
        info doit contient les clefs courriel et mdp
        '''
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
                                    information[8])
            hash = utilisateur.nom + utilisateur.prenom
            self.__id = hashlib.sha1(hash.encode()).hexdigest()
            self.__utilisateurs[self.__id] = Usager(utilisateur, self.dao)
            return True, 'Connexion Validé', self.__id, information[1], information[6]
        else:
            return False, 'mot de passe invalide'

    def enregistrer(self, table: str, info: dict):
        d = {}
        for key in info.keys():
            d[key] = info[key]
            
        e = Enregistrement(self.__action_table[table], d)
        return e.msg       
        
    def resilier_abonnement(self, token):
        result = "Vous ne disposez pas des droits d'accès pour cette action"
        if self.__utilisateurs[token].session_info["usager"].niv_acces <= 1:
            result = self.__dao.requete_dao(self.__dao.Requete.DELETE, self.__dao.Table.Compagnie, self.__utilisateurs[token].id_compagnie)
        return result
    
    def interaction_dao(self, token: str, action: str, table: str, info: dict):
        if token in set(self.utilisateurs.keys()):
            usager = self.utilisateurs[token]
            result = ""

            table_et_action = (table, action)

            if table_et_action != ("employe", "ajouter") and table_et_action != ("compagnie", "ajouter"):
                liste = []
                for key in info.keys():
                    liste.append(info[key])
                liste = [tuple(liste)]

                requete = self.__action[action]
                result = requete(usager, table, liste)

            else:
                result = self.enregistrer(table, info)

            return result if table != "reservation" else result.to_json()
        
        elif token is None and table == "reservation":
            liste = []
            for key in info.keys():
                liste.append(info[key])
            liste = [tuple(liste)]

            result = self.__dao.requete_dao(ActionDAO.Requete.INSERT, ActionDAO.Table.RESERVATION, liste)
            return result
                
    def selectionner(self, usager: Usager, table: str, info: list) -> dict:
        key = table + 's' if table != 'usager' else 'usager'
        for elem in usager.session_info[key]:
            if elem.id == info[0][0]:
                return elem

    def selectionner_tout(self, usager: Usager, table: str, info: list) -> list:
        key = table + 's' if table != 'usager' else 'usager'
        return usager.session_info[key]

    def ajouter(self, usager: Usager, table: str, info: list) -> str:
        table_liaison = []
        if table == "horaire":
            table = self.__action_table[table]
            horaire = list(info[0])
            for idx, text in enumerate(horaire[1:]):
                _, hd, hf = text.split(",")
                heure_debut, minute_debut = hd.split(":")
                heure_fin, minute_fin = hf.split(":")
                horaire[idx+1] = "h".join((heure_debut, minute_debut if minute_debut != '0' else "")), "h".join((heure_fin, minute_fin if minute_fin != '0' else ""))
            print(horaire)
            
            for h in horaire[1:]:
                result = self.__dao.requete_dao(ActionDAO.Requete.SELECT, table, [h])
                if result:
                    table_liaison.append((result[0][0], horaire[0]))
                else:
                    table_liaison.append((self.__dao.requete_dao(ActionDAO.Requete.INSERT, table, [h])[0][0], horaire[0]))
            
            result = self.__dao.requete_dao(ActionDAO.Requete.LIER, ActionDAO.Table.SALLE, table_liaison)
            
        else:
            table = self.__action_table[table]
            result = self.__dao.requete_dao(ActionDAO.Requete.INSERT, table, info)            
            usager.mise_a_jour_session_info(table)
        return result


    def supprimer(self, usager: Usager, table: str, info: list) -> str:
        table = self.__action_table[table]
        result = self.__dao.requete_dao(ActionDAO.Requete.DELETE, table, info)
        usager.mise_a_jour_session_info(table)
        return result

    def modifier(self, usager: Usager, table: str, info: list) -> str:
        table = self.__action_table[table]
        result = self.__dao.requete_dao(ActionDAO.Requete.UPDATE, table, info)
        usager.mise_a_jour_session_info(table)
        return result


    def lier(self, usager: Usager, table: str, info: list) -> str:
        table = self.__action_table[table]
        result =self.__dao.requete_dao(ActionDAO.Requete.LIER, table, info)
        usager.mise_a_jour_session_info(table)
        return result
    
    def api(self, id_compagnie: int) -> list:
        info_compagnie = {}
        
        compagnie = self.__dao.requete_dao(ActionDAO.Requete.SELECT, ActionDAO.Table.COMPAGNIE, [(int(id_compagnie),)])
        index, nom = compagnie[0][:2]
        info_compagnie['compangie'] = nom
        info_compagnie['index'] = index
        
        centres = self.__dao.requete_dao(ActionDAO.Requete.SELECT_ALL, ActionDAO.Table.CENTRE, [(int(id_compagnie),)])
        info_compagnie["centres"] = centres
        
        salles = self.__dao.requete_dao(ActionDAO.Requete.SPECIAL, ActionDAO.Table.SALLE, [(int(id_compagnie),)])
        info_compagnie["salles"] = salles
        
        horaires = []
        for salle in salles:
            index = salle[1]
            horaires.append(self.__dao.requete_dao(ActionDAO.Requete.SELECT_ALL, ActionDAO.Table.HORAIRE, [(index,)]))
        
        info_compagnie["horaires"] = horaires
        
        reservations = self.__dao.requete_dao(ActionDAO.Requete.SELECT_ALL, ActionDAO.Table.RESERVATION, [(int(id_compagnie),)])
        dict_reservation = {}
        for reservation in reservations:
            dict_reservation[reservation[0]] = {'horaire': reservation[4],'participants': reservation[6], "id_salle": reservation[10], "id_centre": reservation[11]}
            
        info_compagnie["reservations"] = dict_reservation
        return info_compagnie    

    def creation_horaire(self, **info: any) -> list:
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
        info = info['info']

        for key in info.keys():
            if key != 'nb_room':
                info[key] = float(info[key])
            else:
                info[key] = int(info[key])

        try:
            return self.__algo.create_schedule(**info)
        except (ValueError, KeyError) as e:
            return ValueError(self.__ALGO_ERROR)       
        
    # fonction pour le site de showcase
    def renvoi_compagnie(self):
        return self.__dao.requete_dao(ActionDAO.Requete.SELECT_ALL, ActionDAO.Table.COMPAGNIE, [(1,)])
