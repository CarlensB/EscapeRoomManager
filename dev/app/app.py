from serveur_api import Serveur
from modele.Modele import GestionSysteme, Enregistrement
from modele.actionDAO import ActionDAO

dictionnaire ={
    'algo_choix': 1,
    'contraintes': {'salles': ['Salle1', 'Salle2', 'Salle3'],
                    'heures': [9, 1],
                    'intervalle': 15,
                    'employe': 2
                }
}

dict_comp = {
        'nom' : 'escape1',
        'info_paiement': 'Visa',
        'courriel' : 'manager@escape1.com',
        'mdp' : 'CarlensBelony1!'}

dict_emp = {
    'compagnie' : 2,
    'nom' : 'Guindon',
    'prenom' : 'Maxence',
    'salaire' : 13.75,
    'num_telephone' : '514-207-0088',
    'niveau_acces' : 2,
    'courriel' : 'maxguindon@escape.com',
    'num_ass': 111,
    'mdp' : 'CarlensBelony1!'

}

def main(): 
    print('Hello World')
    gs = GestionSysteme()
    Serveur.definir_controleur(gs)
    #gs.création_horaire(dictionnaire)
    #print(gs.valider_connexion(courriel='manager@escape.com', mdp='CarlensBelony1!'))
    #print(gs.utilisateur)
    #print(gs.enregistrer('compagnie', dict_comp))
    #gs.valider_connexion()

    
    Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())