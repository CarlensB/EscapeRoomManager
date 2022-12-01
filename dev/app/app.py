import datetime as dt
from modele.actionDAO import ActionDAO
from serveur_api import Serveur
from modele.Modele import GestionSysteme, Enregistrement
from modele.Liste_chainee import DoubleLinkedList

'''
Pour éviter les bugs d'affichage dans vscode désinstaller python for vscode.
'''

r = {'nom_client': 'Jonathan Frédéric',
     'num_telephone': "514-438-2570",
     'statut_reservation': 1,
     'salle': 1,
     'nb_personnes': 4,
     'courriel': "johndoe@gmail.com",
     'prix_total': 100.0,
     'date': (2022, 12, 3, 12, 00)}


def main(): 
    gs = GestionSysteme()
    #gs.enregistrer('compagnie', {"nom": "Bonjour1","info_paiement": "test", 'courriel': "Bonjour@courriel.com", "mdp": "testAndroid18!@"})
    #gs.interaction_dao("modifier", "salle", {'nom':"Salle2", 'description':"Nouvelle Description", 'centre':16, 'nbmax':4, 'prix':25.0, 'privee':0, 'id':3})
    gs.valider_connexion({'courriel':"Bonjour@courriel.com", 'mdp':"testAndroid18!@"})
    gs.utilisateurs[gs.retourner_id].mise_a_jour_session_info(ActionDAO.Table.COMPAGNIE)
    #print(gs.utilisateurs[0].compagnie)
    #print(gs.interaction_dao(gs.retourner_id, 'ajouter', 'reservation', r))
    #print(str(gs.utilisateur))
    #Serveur.definir_controleur(gs)
    #Serveur.demarrer_serveur()
    #print(str(ActionDAO.Table.CENTRE))
    
if __name__=='__main__':
    quit(main())