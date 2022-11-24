import datetime as dt
from serveur_api import Serveur
from modele.Modele import GestionSysteme, Enregistrement
from modele.Liste_chainee import DoubleLinkedList

'''
Pour éviter les bugs d'affichage dans vscode désinstaller python for vscode.
'''


def main(): 
    gs = GestionSysteme()
    #gs.enregistrer('compagnie', {"nom": "Bonjour1","info_paiement": "test", 'courriel': "Bonjour@courriel.com", "mdp": "testAndroid18!@"})
    #gs.interaction_dao("modifier", "salle", {'nom':"Salle2", 'description':"Nouvelle Description", 'centre':16, 'nbmax':4, 'prix':25.0, 'privee':0, 'id':3})
    #print(gs.valider_connexion({'courriel':"Bonjour@courriel.com", 'mdp':"testAndroid18!@"}))
    #print(str(gs.utilisateur))
    Serveur.definir_controleur(gs)
    Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())