from serveur_api import Serveur, dict_comp
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

def main(): 
    print('Hello World')
    gs = GestionSysteme()
    gs.création_horaire(dictionnaire)
    #print(gs.enregistrer('compagnie', dict_comp))

    
    #Serveur.demarrer_serveur()
    
    
if __name__=='__main__':
    quit(main())