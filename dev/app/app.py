from serveur_api import Serveur
from modele.Modele import GestionSysteme
from dependancy import DependancyInstall

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
     'date': "2022-12-3 18:00"}

e = {'compagnie': 1,
     'nom': 'Carlens',
     'prenom': 'Belony',
     'salaire': 18.00,
     'num_telephone': "514-300-8575",
     'niveau_acces': 2,
     'courriel': "carlens@belony.com",
     'num_ass': 257_098_765,
     'mdp': "testAndroid18!@"}

dependance = ["bcrypt", "mysql-connector-python"]


def main():
    #définition du contorleur
    DependancyInstall(*dependance)
    gs = GestionSysteme()

    #Test
    #gs.valider_connexion({'courriel':"Bonjour@courriel.com", 'mdp':"testAndroid18!@"})
    #gs.enregistrer('compagnie', {"nom": "Bonjour1","info_paiement": "test", 'courriel': "Bonjour@courriel.com", "mdp": "testAndroid18!@"})
    #gs.interaction_dao("modifier", "salle", {'nom':"Salle2", 'description':"Nouvelle Description", 'centre':16, 'nbmax':4, 'prix':25.0, 'privee':0, 'id':3})
    #gs.utilisateurs[gs.retourner_id].mise_a_jour_session_info(ActionDAO.Table.SALLE)
    #print(gs.interaction_dao(gs.retourner_id, 'ajouter', 'employe', e))

    # Démarrage du serveur
    Serveur.definir_controleur(gs)
    Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())