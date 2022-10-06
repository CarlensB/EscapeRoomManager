# importing required libraries
#import mysql.connector

import sys #import path
import UtilsDao.UTILS as UTILS

class ConnexionDAO:
    
    def __init__(self, hote : str, utilisateur: str, mdp : str, ) -> None:
        self.__hote = hote
        self.__utilisateur = utilisateur
        self.__mdp = mdp
        
    def connexion_db(self):
        self.__databse = mysql.connector.connect(
            host= self.__hote,
            user= self.__utilisateur,
            passwd= self.__mdp
        )
        
    def utiliser_db():
        UTILS.UTILISER_DB
        
    def fermer_db(self):
        self.__databse.close()
        
    def creation_bd(self):
        pass
    
    def creation_table(self):
        pass
    
    def creation_utilisateur(self, nom_compagnie : str) -> None:
        f = UTILS.initialiser_bd.creation_utilisateur
        print(f(nom_compagnie))
    
