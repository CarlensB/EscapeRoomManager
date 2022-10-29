from types import TracebackType
import mysql.connector
# python pip.exe install mysql-connector-python
# dossier : C:\Python310\Scripts
import traceback
from .UTILS import USER, HOTE, MDP, DB


class ConnexionDAO:

    def __init__(self) -> None:
        self.__conn = None
        self.__curs = None

    def __enter__(self):
        self.__connexion_bd()
        return self

    def __exit__(self, exc_type: BaseException, exc_value: BaseException, exc_tb: TracebackType) -> bool:
        # inspiré des méthodes vue en classe avec Pierre-Paul Monty
        # Travailler avec le with
        self.__fermer_bd()
        if isinstance(exc_value, Exception):
            trace = traceback.format_exception(exc_type, exc_value, exc_tb)
            print(''.join(trace))
            return False
        return True

    @property
    def connexion(self):
        return self.__conn

    @property
    def curseur(self):
        return self.__curs

    def __connexion_bd(self) -> None:
        self.__conn = mysql.connector.connect(
            user= USER,
            host= HOTE,
            password= MDP,
            database= DB
        )
        self.__curs = self.__conn.cursor()

    def __fermer_bd(self) -> None:
        self.__curs.close()
        self.__conn.close()
