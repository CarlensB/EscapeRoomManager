from dataclasses import dataclass
from typing import Union
from .actionDAO import ActionDAO

import re

# une fonctionalité intégré dans python qui peut nous être utile pour gérer l'informations
# une data classe n'est qu'un contenant et ne peut pas opérer son propre data.
# En gros elle contient ses variables et des méthodes de base comme les setters et getter

class Enregistrement:

    __MESSAGE_MDP_TAILLE= "La taille du mot de passe doit être de 12 caractères et plus."
    __MESSAGE_MDP_CS= "Le mot de passe doit contenir au moins 1 caractère spéciale."
    __MESSAGE_MDP_MAJ= "Le mot de passe doit contenir au moins 1 lettre majuscule."
    __MESSAGE_MDP_MIN= "Le mot de passe doit contenir au moins 1 lettre minuscule."
    __MESSAGE_MDP_CHIFFRE= "Le mot de passe doit contenir au moins 1 chiffre."


    def __init__(self, nom: str, info_paiement: str, courriel: str, mdp: str):
        self.__info= (nom, info_paiement, courriel, mdp)
        self.__msg = []
        cour_valide, cour_msg= self.__validation_courriel(courriel)
        mdp_valide, mdp_msg= self.__validation_mdp(mdp)
        self.__enregistrer_compagnie([cour_valide, mdp_valide], [cour_msg, mdp_msg])
        
    def __validation_mdp(self, mdp: str) -> Union[bool,str]:
        # règle du mot de passe : 
        # 12 caractère minimum, une majuscule, une minuscule, un chiffre, un caractère spécial
        pattern = [(self.__MESSAGE_MDP_CHIFFRE, r'\d+'),
                   (self.__MESSAGE_MDP_MAJ, r'[A-Z]+'),
                   (self.__MESSAGE_MDP_MIN, r'[a-z]+'),
                   (self.__MESSAGE_MDP_CS, r'\W+')]
        valider = True
        msg='valide'

        if not len(mdp) >= 12:
            valider = False
            msg = self.__MESSAGE_MDP_TAILLE
        else:
            for p in pattern:
                if not re.search (p[1], mdp):
                    valider = False
                    msg=p[0]
                    break
        
        return valider, msg

    def __validation_courriel(self, courriel: str) -> Union[bool, str]:
        pattern = '@'

        if not re.search(pattern, courriel):
            return False, 'Courriel invalide'

        return True, 'Courriel valide'


    def __enregistrer_compagnie(self, validation: list[bool], msg: list[str]):
        if not validation[0] or not validation[1]:
            self.__msg = msg
        else:
            self.__msg.append('Compagnie enregistrer')
            a = ActionDAO()
            a.requete_dao(a.Requete.INSERT, 'Compagnie', self.__info)

    @property
    def msg(self) -> list[str]:
        return self.__msg
        

class GestionSysteme:

    def __init__(self, entreprise) -> None:
        self.__client = entreprise
        self.__id = self.__get_id_compagnie()
        print(self.__id)


    def __get_id_compagnie(self):
        a = ActionDAO()
        result = a.requete_dao(a.Requete.SELECT, 'Compagnie', self.__client)
        return result[0][0]


    def __determiner_prix(self, r : 'Reservation'):
        tps = 0.05
        tvq = 0.09975
        cout_base = self.__participant * self.__salle.prix
        r.prix_total = cout_base + cout_base*tps + cout_base*tvq

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
        prix_total: float  = 0.0 


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
        pourcentage: float # Exemple 0.15 pour 15%
        actif: bool
    
    @dataclass()
    class TypeClient:
        id: int
        categorie: str
        prix: float
