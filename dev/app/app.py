import datetime as dt
from serveur_api import Serveur
from modele.Modele import GestionSysteme, Enregistrement
from modele.Liste_chainee import DoubleLinkedList

'''
Pour éviter les bugs d'affichage dans vscode désinstaller python for vscode.
'''


def main(): 
    gs = GestionSysteme()
    Serveur.definir_controleur(gs)
    Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())