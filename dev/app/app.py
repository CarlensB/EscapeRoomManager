import datetime as dt
from serveur_api import Serveur
from modele.Modele import GestionSysteme, Enregistrement

dict_comp = {
    'nom': 'Escape',
    'info_paiement': '1111 2222 3333 4444',
    'courriel': 'escape@gmail.com',
    'mdp': 'CarlensBelony1!'
}

def main(): 
    gs = GestionSysteme()
    #Serveur.definir_controleur(gs)

    #print(gs.enregistrer('compagnie', dict_comp))
    # for i in range(5):
    #     i += 1
    #     if i == 1:
    #         # Select
    #         info = 1
    #     elif i == 2:
    #         # Insert
    #         info = [('Client2', 514, 1, 1, 6, 'client@courriel.com', '9h', 150.00, dt.datetime(2022, 11, 10))]
    #     elif i == 3:
    #         # Delete
    #         info = 1
    #     elif i == 4:
    #         # Select_all
    #         info = 1
    #     elif i == 5:
    #         # Update
    #     elif i == 6:
    #         # Lier
    #         info = [(2, 1)]
    info = [('Client2', 514, 1, 1, 3, 'client@courriel.com', '17h', 75.00, dt.datetime(2022, 11, 10), 2)]
    print(gs.dao.requete_dao(gs.dao.Requete(5), gs.dao.Table.RESERVATION, info))
    #print(gs.dao.requete_dao(gs.dao.Requete(6), gs.dao.Table.SALLE, [(2,1)]))
    
    #gs.création_horaire(dictionnaire)
    #print(gs.valider_connexion(courriel='manager@escape.com', mdp='CarlensBelony1!'))
    #print(gs.utilisateur)
    #print(gs.enregistrer('compagnie', dict_comp))
    #gs.valider_connexion()

    
    #Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())