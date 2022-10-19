from serveur_api import Serveur
from modele.actionDAO import ActionDAO


def main():  
    ActionDAO.test_insertion()
    ActionDAO.test_suppression_selection()
    #Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())