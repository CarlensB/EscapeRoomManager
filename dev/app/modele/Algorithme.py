from enum import Enum, auto

class AlgoContext:
    
    class AlgoChoix(Enum):
        eNaif = auto()
        eBackChecking = auto()
        eFowardChecking = auto()
        eMinConflict = auto()
        eAC3 = auto()
        
    
    def __init__(self):
        self.__choix = self.AlgoChoix
        self.__algo_d = {
            self.AlgoChoix.eNaif : AlgoNaif,
            self.AlgoChoix.eBackChecking: BackChecking,
            self.AlgoChoix.eFowardChecking: FowardChecking,
            self.AlgoChoix.eMinConflict: MinConflict,
            self.AlgoChoix.eAC3: AC3           
        }
        
    @property
    def choice(self):
        return self.__choice 

    def demarrer_algorithme(self, choice: int, contraintes: dict):
        algo = self.__algo_d[self.AlgoChoix(choice)](**contraintes)
          

class AlgoNaif:

    '''
    La classe AlgoNaif sert surtout à déterminer l'horaire pour une salle sans égard au nombre d'employé.
    '''
    
    def __init__(self, salles: list['GestionSysteme.Salle'], heures: tuple[str], intervalle: int, employe: int):
        self.__horaires = []
        self.__salles = salles
        self.__heures = heures
        self.__intervalle = intervalle
        self.__employe = employe
        self.__ajuster_h_fin()
        self.__creation_horaire()

    def __ajuster_h_fin(self):
        self.__heures[0] = self.__heures[0]*60
        self.__heures[1] = self.__heures[1]*60
        if self.__heures[0] > self.__heures[1]:
            self.__heures[1] = self.__heures[1]+ (24*60)

    def __creation_horaire(self):
        for s in self.__salles:
            s.liste_horaire.append(self.__listing(s.duree))

    
    def __listing(self, duree: int):
        self.__horaires.append(self.__heures[0])
        prochain_depart = self.__horaire[-1] + duree
        if prochain_depart < self.__heures[1]:
            self.__heures[0] = prochain_depart
            self.__listing(duree)





#...

class BackChecking:
    '''
    L'algorithme de Back checking ou back tracking est un algorithme naif qui avance vers une solution jusqu'à ce que
    celle-ci soit déterminée comme correct ou incorrect, auquelle cas, l'algorithme reviendra en arrière pour essayer une
    nouvelle solution.
    La classe BackChecking fait l'implémentation de cette algorithme.
    Source :
    https://medium.com/algorithms-and-leetcode/backtracking-e001561b9f28
    https://www.tutorialspoint.com/python_data_structure/python_backtracking.htm#:~:text=Practical%20Data%20Science%20using%20Python&text=Backtracking%20is%20a%20form%20of,not%20give%20the%20required%20solution.
    '''

    pass

#...

class FowardChecking:
    pass

#...

class MinConflict:
    pass

#...

class AC3:
    pass

#...