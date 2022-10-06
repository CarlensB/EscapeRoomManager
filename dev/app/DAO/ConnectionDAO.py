
'''
# importing required libraries
import mysql.connector
  
dataBase = mysql.connector.connect(
  host ="localhost",
  user ="user",
  passwd ="password"
)
 
print(dataBase)
  
# Disconnecting from the server
dataBase.close()
'''
from sys import path

path.append('UtilsDAO/UTILS.py')
import UTILS.py

class ConnexionDAO:
    
    def __init__(self, hote : str, utilisateur: str, mdp : str) -> None:
        self.__hote = hote
        self.__utilisateur = utilisateur
        self.__mdp = mdp
        
    