from serveur_api import Serveur
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
path = r"C:\Users\user\AppData\Local\Programs\Python\Python310\Scripts\pip.exe"


def main():
    di = DependancyInstall(*dependance, path=path)
    di.install_stuff()
    from modele.Modele import GestionSysteme
    gs = GestionSysteme()

    #Test
    #gs.valider_connexion({'courriel':"Bonjour@courriel.com", 'mdp':"testAndroid18!@"})
#     gs.enregistrer('compagnie', {"nom": "Bonjour1","info_paiement": "test", 'courriel': "Bonjour@courriel.com", "mdp": "testAndroid18!@"})


    # Démarrage du serveur
    Serveur.definir_controleur(gs)
    Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())