from typing import Union
from DAO.CompagniesDAO import CompagniesDAO
from DAO.TypeClientsDAO import TypeClientsDAO
from DAO.CentresDAO import CentresDAO
from DAO.EmployesDAO import EmployeDAO
from DAO.HorairesDAO import HorairesDAO
from DAO.RabaisDAO import RabaisDAO
from DAO.ReservationsDAO import ReservationsDAO
from DAO.SallesDAO import SallesDAO

from enum import Enum

class ActionDAO:
    
    class Requete(Enum):
        SELECT = 1
        INSERT = 2
        DELETE = 3
        SELECT_ALL = 4


    class Table(Enum):
        COMPAGNIE = 1
        CENTRE = 2
        SALLE = 3
        HORAIRE = 4
        RESERVATION = 5
        EMPLOYE = 6
        RABAIS = 7
        TYPECLIENT = 8


    def __init__(self) -> None:
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


    def requete_dao(self, requete : Requete, recherche : Table, args : tuple ) -> Union[int, tuple]:
        result = 0

        dao = self.__dao[recherche]()

        if requete == self.Requete.SELECT:
            result = dao.selectionner(args)
        
        elif requete == self.Requete.INSERT:
            dao.ajouter(args)
            result = (1, 'insertion fait')

        elif requete == self.Requete.DELETE:
            dao.supprimer(args)
            result = (2, 'element supprimer')

        elif requete == self.Requete.SELECT_ALL:
            result = dao.selectionner_all(args)
        
        else:
            result = -1

        return result

    # fonction spécial

    def lier_horaire_salle(self, id_salle : int, id_horaire : list[int]):
        s = self.__dao['Salle']()
        for horaire in id_horaire:
            s.ajouter_horaire(id_salle, horaire)
    

    def ajouter_employe_centre(self, *args : tuple[ int | int]):
        e = EmployeDAO()
        e.lier_centre(args)
        

# Dans le modèle trier les salles et les employés par Centre
# Sinon rajouter un élément d'énumération pour les query spécial