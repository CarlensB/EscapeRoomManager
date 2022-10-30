import datetime as dt
from serveur_api import Serveur
from modele.Modele import GestionSysteme, Enregistrement
from modele.Liste_chainee import DoubleLinkedList


def main(): 
    list = DoubleLinkedList() # 1, 2, 3, 4
    list.add_first(3)
    list.add_first('2')
    list.add_first(1)
    print(list.get_last()._data)
    # gs = GestionSysteme()
    # Serveur.definir_controleur(gs)
    # Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())