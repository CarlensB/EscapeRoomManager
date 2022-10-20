from serveur_api import Serveur
from modele.Modele import GestionSysteme, Enregistrement


def main(): 
    print('Hello World')
    print(Enregistrement('Embrouille', 'Visa','manager@embrouille.com','DBZ@ndroid18').msg)
    #Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())