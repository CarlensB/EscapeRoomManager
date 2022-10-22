from serveur_api import Serveur
from modele.Modele import GestionSysteme, Enregistrement
from modele.actionDAO import ActionDAO


def main(): 
    print('Hello World')
    #gs.valider_connexion(courriel='manager@escape.com', mdp='CarlensBelony1!')

    
    Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())