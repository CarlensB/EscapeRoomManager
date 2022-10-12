import mysql.connector
from .UTILS import USER, HOTE, MDP, DB


class ConnexionDAO:

    def __init__(self) -> None:
        self.__conn = None
        self.__curs = None
        self.connexion_bd()

    @property
    def connexion(self):
        return self.__conn

    @property
    def curseur(self):
        return self.__curs

    def __del__(self):
        self.fermer_bd()

    def connexion_bd(self):
        self.__conn = mysql.connector.connect(
            user= USER,
            host= HOTE,
            password= MDP,
            database= DB
        )
        self.__curs = self.__conn.cursor()

    def fermer_bd(self):
        self.__curs.close()
        self.__conn.close()
