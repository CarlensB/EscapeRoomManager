from serveur_api import Serveur
from modele.Modele import GestionSysteme, Enregistrement
from modele.actionDAO import ActionDAO


def main(): 
    print('Hello World')
    # gs = GestionSysteme()
    # print(gs.enregistrer('compagnie', dict_comp))

    
    Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())