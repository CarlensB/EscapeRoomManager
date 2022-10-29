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
        UPDATE = 5
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

    __MODIFICATION = 'Modification réussi'
    __INSERTION = 'Insertion réussi'
    __SUPPRESSION = 'Suppression réussi'
    __LIAISON = 'Liaison réussi'

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
            self.__action = {
                self.Requete.SELECT: 'selectionner',
                self.Requete.INSERT: 'ajouter',
                self.Requete.DELETE: 'supprimer',
                self.Requete.SELECT_ALL: 'selectionner_all',
                self.Requete.UPDATE: 'modifier',
                self.Requete.LIER: 'lier'

            }

            self.__msg = {
                self.Requete.UPDATE: self.__MODIFICATION,
                self.Requete.INSERT: self.__INSERTION,
                self.Requete.DELETE: self.__SUPPRESSION,
                self.Requete.LIER: self.__LIAISON
                }
        
    def requete_dao(self, requete: Requete, recherche: Table, args: list[tuple] | int):

        with ConnexionDAO() as bd:
            dao = self.__dao[recherche](bd)
            f = self.__action[requete]
            result = dao.fonction[f](args)

            if result == None:
                result = self.__msg[requete]

            return result
        