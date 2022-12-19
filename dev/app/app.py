# ===============================================
# Nom du fichier : app.py
# Ce fichier effectue l'installation des dépendances si besoin
# ainsi que le démarrage du serveur Flask.
# Auteur : Maxence Guindon
# Équipe : Carlens Belony et Maxence Guindon
# ===============================================



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

s = {
    "nom": "Test",
    "description": "Test description",
    "centre": 1,
    "nb_max_joueur": 6,
    "prix": 25,
    "privee": 1,
    "horaires": (480, 1320, 60)
}

class App:
    def __init__(self) -> None:
        dependance = ["bcrypt", "mysql-connector-python"]
        path = [r"C:\Users\user\AppData\Local\Programs\Python\Python310\Scripts\pip.exe", r"C:\Python310\Scripts\pip.exe"]
        self.__dependancy_install = DependancyInstall(*dependance, path=path[1])
        
    def define_app_controleur(self):
        self.__dependancy_install.install_stuff()
        from modele.Modele import GestionSysteme
        return GestionSysteme()
    

def main():
    # Démarrage du serveur
    app = App()
    Serveur.definir_controleur(app.define_app_controleur())
    Serveur.demarrer_serveur()
    
    #Test
    # gs = app.define_app_controleur()
    # gs.valider_connexion({'courriel':"Bonjour@courriel.com", 'mdp':"testAndroid18!@"})
    # gs.enregistrer('compagnie', {"nom": "Bonjour1","info_paiement": "test", 'courriel': "Bonjour@courriel.com", "mdp": "testAndroid18!@"})
    
    # print(gs.interaction_dao(gs.retourner_id, "ajouter", "salle", s))
    # print(gs.interaction_dao(gs.retourner_id, "selectionner", "reservation", {'id': 1107}))
    
    
if __name__=='__main__':
    quit(main())