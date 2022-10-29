from typing import Union
from enum import Enum

from DAO.ConnectionDAO import ConnexionDAO
from DAO.CompagniesDAO import CompagniesDAO
from DAO.TypeClientsDAO import TypeClientsDAO
from DAO.CentresDAO import CentresDAO
from DAO.EmployesDAO import EmployeDAO
from DAO.HorairesDAO import HorairesDAO
from DAO.RabaisDAO import RabaisDAO
from DAO.ReservationsDAO import ReservationsDAO
from DAO.SallesDAO import SallesDAO

class ActionDAO:
    
    class Requete(Enum):
        SELECT = 1
        INSERT = 2
        DELETE = 3
        SELECT_ALL = 4
        UPDTAE = 5
        LIER = 6


    class Table(Enum):
        COMPAGNIE = 1
        CENTRE = 2
        SALLE = 3
        HORAIRE = 4
        RESERVATION = 5
        EMPLOYE = 6
        RABAIS = 7
        TYPECLIENT = 8

    def __init__(self):
            self.__dao = {
                self.Table.COMPAGNIE: CompagniesDAO,
                self.Table.CENTRE: CentresDAO,
                self.Table.SALLE: SallesDAO,
                self.Table.HORAIRE: HorairesDAO,
                self.Table.RESERVATION: ReservationsDAO,
                self.Table.EMPLOYE: EmployeDAO,
                self.Table.RABAIS: RabaisDAO,
                self.Table.TYPECLIENT: TypeClientsDAO
            }    
        
    def requete_dao(self, requete: Requete, recherche: Table, args: tuple ):
        result = 0

        with ConnexionDAO() as bd:
            dao = self.__dao[recherche](bd)

            if requete == self.Requete.SELECT:
                result = dao.selectionner(args)
            
            elif requete == self.Requete.INSERT:
                dao.ajouter(args)
                result = (1, 'insertion fait')

            elif requete == self.Requete.DELETE:
                dao.supprimer(args)
                result = (1, 'element supprimer')

            elif requete == self.Requete.SELECT_ALL:
                result = dao.selectionner_all(args)

            elif requete == self.Requete.LIER:
                dao.lier(args)
                result = (1, 'liaison faite')
            
            else:
                result = -1

            return result

    # fonction spécial

    def lier_horaire_salle(self, id_salle : int, id_horaire : list[int]):
        s = self.__dao['Salle']()
        for horaire in id_horaire:
            s.ajouter_horaire(id_salle, horaire)
        

# Dans le modèle trier les salles et les employés par Centre
# Sinon rajouter un élément d'énumération pour les query spécial