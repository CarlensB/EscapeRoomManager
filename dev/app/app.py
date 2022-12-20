# ===============================================
# Nom du fichier : app.py
# Ce fichier effectue l'installation des dépendances si besoin
# ainsi que le démarrage du serveur Flask.
# Auteur : Maxence Guindon
# Équipe : Carlens Belony et Maxence Guindon
# ===============================================

from serveur_api import Serveur
from dependancy import DependancyInstall



class App:
    def __init__(self) -> None:
        dependance = ["bcrypt", "mysql-connector-python"]
        path = [r"C:\Users\user\AppData\Local\Programs\Python\Python310\Scripts\pip.exe", r"C:\Python310\Scripts\pip.exe"]
        self.__dependancy_install = DependancyInstall(*dependance, path=path[0])
        
    def define_app_controleur(self):
        self.__dependancy_install.install_stuff()
        from modele.Modele import GestionSysteme
        return GestionSysteme()
    

def main():
    # Démarrage du serveur
    app = App()
    Serveur.definir_controleur(app.define_app_controleur())
    Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())
