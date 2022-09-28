import re
import numpy as np

class strategy_algo():
    def __init__(self, strategy, dictionary):
        self.__strategy = strategy # valeur en int déterminant la stratégie à utiliser
        self.__dictionary  = dictionary
        self.determine_algo()
        self.__data = self.create_schedule()
    
    @property
    def strategy(self):
        return self.__strategy

    @property
    def dictionary(self):
        return self.__dictionary 
    
    @property
    def data(self):
        return self.__data

    @strategy.setter
    def strategy(self, valeur):
        self.__strategy = valeur

    @dictionary.setter
    def dictionary (self, valeur):
        self.__dictionary = valeur

    @data.setter
    def data(self, valeur):
        self.__data = valeur

    def determine_algo(self):
        match self.strategy:
            case 0:
                a = Algo(self.dictionary)
            case _:
                print("Strategy not yet implemented")
        return a

    def create_schedule(self):
        a = self.determine_algo()
        a.creation_h()
        return a.horaire[:]

class Salle:
    def __init__(self, nom, description, duree, prix, privee, horaire=None, centre=None):
        self.nom = nom
        self.description = description
        self.duree = duree # Penser à le normaliser en minute
        self.prix = prix
        self.privee = privee
        self.horaire = horaire
        self.centre = centre

class Horaire:
    def __init__(self): 
        pass

class Algo:
    def __init__(self, donnees):
        self.donnees = donnees
        self.intervalle = int(re.findall(r"\d+", self.donnees["intervalle"])[0])
        self.h_debut = int(re.findall(r"\d+", self.donnees["h_debut"])[0])*60
        self.h_fin = int(re.findall(r"\d+", self.donnees["h_fin"])[0])*60
        self.ajuster_h_fin()
        self.espace = self.intervalle + self.donnees["duree"]
        self.horaire = [] #np.ndarray(self.h_fin)
        self.__tmps_rangement = 5
        self.__tmps_accueil = 15
        self.__tmps_fin = 5

    @property
    def tmps_rangement(self):
        return self.__tmps_rangement

    @property
    def tmps_accueil(self):
        return self.__tmps_accueil

    @property
    def tmps_fin(self):
        return self.__tmps_fin

    @tmps_rangement.setter
    def tmps_rangement(self, valeur):
        self.__tmps_rangement = valeur
    
    @tmps_accueil.setter
    def tmps_accueil(self, valeur):
        self.__tmps_accueil = valeur

    @tmps_fin.setter
    def tmps_fin(self, valeur):
        self.__tmps_fin = valeur

    
    def creation_salle(self):
        
        return Salle(self.donnees["nom"], self.donnees["description"], self.donnees["duree"], self.donnees["prix"], self.donnees["privee"])

    def ajuster_h_fin(self):
        if self.h_debut > self.h_fin:
            self.h_fin = self.h_fin + (24*60)
    
    def creation_h(self):
        self.horaire.append(self.h_debut)
        next_start =  self.horaire[-1]+ self.espace
        if next_start < self.h_fin:
            self.h_debut = next_start
            self.creation_h()

def main():
    dictionnaire = { "nom" : "nom_salle",
                  "description" :  "Lorem Ipsum",
                  "duree" : 60,
                  "prix" : 25.0,
                  "privee" : True,
                  "h_debut" : "16h00",
                  "h_fin" : "22h00",
                  "intervalle" : "30min",
                   }
    s = strategy_algo(0, dictionnaire)
    for data in s.data:
        print(data/60)

if __name__ == "__main__":
    quit(main())