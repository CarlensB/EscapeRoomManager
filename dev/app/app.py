import datetime as dt
from serveur_api import Serveur
from modele.Modele import GestionSysteme, Enregistrement


def main(): 
    gs = GestionSysteme()
    Serveur.definir_controleur(gs)
    Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())