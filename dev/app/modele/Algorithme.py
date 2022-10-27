from enum import Enum, auto
from typing import ForwardRef

class AlgoContext:
    
    class AlgoChoice(Enum):
        eNaif = auto()
        eBackCheking = auto()
        eFowardChecking = auto()
        eMinConflict = auto()
        eAC3 = auto()
        
    
    def __init__(self):
        self.__choice = self.AlgoChoice()
        self.__algo_d = {
            self.__choix.eNaif : AlgoNaif,
            self.__choix.eBackChecking: BackChecking,
            self.__choix.eFowardChecking: FowardChecking,
            self.__choix.eMinConflict: MinConflict,
            self.__choix.eAC3: AC3           
        }
        
    @property
    def choice(self):
        return self.__choice 
          

class AlgoNaif:
    pass

#...

class BackChecking:
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