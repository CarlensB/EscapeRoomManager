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


    def __init__(self) -> None:
        self.__dao = {
            'Compagnie': CompagniesDAO,
            'Centres': CentresDAO,
            'Salle': SallesDAO,
            'Horaire': HorairesDAO,
            'Reservation': ReservationsDAO,
            'Employe': EmployeDAO,
            'Rabais': RabaisDAO,
            'TypeClient': TypeClientsDAO
        }


    def requete_dao(self, requete : Requete, recherche : str, args : tuple ):
        result = 0

        dao = self.__dao[recherche]()

        if requete == self.Requete.SELECT:
            result = dao.selectionner(args)
        
        elif requete == self.Requete.INSERT:
            dao.ajouter(args)

        elif requete == self.Requete.DELETE:
            dao.supprimer(args)

        elif requete == self.Requete.SELECT_ALL:
            dao.selectionner_all(args)
        
        else:
            result = -1

        return result

    # fonction spécial

    def lier_horaire_salle(self, id_salle : int, id_horaire : list[int]):
        s = self.__dao['Salle']()
        for horaire in id_horaire:
            s.ajouter_horaire(id_salle, horaire)
    

    def ajouter_employe_centre(self, *args : tuple[ int | int]):
        # le tuple doit contenir les ids de l'employé et du centre où il travail
        sql = '''
        INSERT INTO emp_cent(id_emp, id_centre)
        VALUES(%s, %s)
        '''
        val = (args)
        self.execute_query(sql, val)

# Dans le modèle trier les salles et les employés par Centre
# Sinon rajouter un élément d'énumération pour les query spécial