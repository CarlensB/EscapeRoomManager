from serveur_api import Serveur
from modele.Modele import GestionSysteme, Enregistrement


def main(): 
    print('Hello World')
    e = Enregistrement('Escape', 'Visa', '12@escape.com', 'CarlensBelony1!')
    print(e.msg)
    #Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())