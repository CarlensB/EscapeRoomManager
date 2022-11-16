from enum import Enum, auto
from abc import ABC, abstractmethod

class AlgoContext():
    '''
    Une classe de context pour des tests et s'organiser avec le design pattern
    stratefy.
    '''
    pass

# Source pour interface
# https://realpython.com/python-interface/#formal-interfaces

class AlgoStrategy(ABC):
    '''
    A class that will implement the best strategy to execute in direct
    regard of the parameters in will receive.
    '''
    
    def __init__(self, **kwargs) -> None:
        super().__init__()
        
    
    @abstractmethod
    def ajust_schedule_end():
        '''
        This function serve to adjust the end time of an activity if it's start
        time is bigger(in int or float) then is end time.
        '''
        pass
    
    @abstractmethod
    def create_schedule():
        '''
        This function serve to create the schedule of the different activity
        the user want to fit in a day.
        '''
        pass
    
    @abstractmethod
    def create_room():
        '''
        This function serve to create the room(s) or activity(s), if the user is not
        given any finish room object.
        '''
        pass
    
    @abstractmethod
    def execute_algorithme():
        '''
        This function will execute the algorithme decide by the context.
        '''
        pass

 # +-+-+-+-+-+-+-+-+ +-+-+-+-+-+ +-+-+-+-+ +-+-+-+-+-+-+-+-+
 # |C|o|n|c|r|e|t|e| |C|l|a|s|s| |A|l|g|o| |S|t|r|a|t|e|g|y|
 # +-+-+-+-+-+-+-+-+ +-+-+-+-+-+ +-+-+-+-+ +-+-+-+-+-+-+-+-+
          

class AlgoNaive(AlgoStrategy):

    '''
    This class execute an naive algorithme to determine the schedule of one
    activity.
    '''
    
    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)

    def ajust_schedule_end(self):
        pass
        




#...

class BackChecking(AlgoStrategy):
    '''
    L'algorithme de Back checking ou back tracking est un algorithme naif qui avance vers une solution jusqu'à ce que
    celle-ci soit déterminée comme correct ou incorrect, auquelle cas, l'algorithme reviendra en arrière pour essayer une
    nouvelle solution.
    La classe BackChecking fait l'implémentation de cette algorithme.
    Source :
    https://medium.com/algorithms-and-leetcode/backtracking-e001561b9f28
    https://www.tutorialspoint.com/python_data_structure/python_backtracking.htm#:~:text=Practical%20Data%20Science%20using%20Python&text=Backtracking%20is%20a%20form%20of,not%20give%20the%20required%20solution.
    https://medium.com/algorithms-and-leetcode/backtracking-with-leetcode-problems-part-2-705c9cc70e52
    https://medium.com/algorithms-and-leetcode/in-depth-backtracking-with-leetcode-problems-part-3-b225f19e0d51
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

 # +-+-+-+-+
 # |T|E|S|T|
 # +-+-+-+-+

class test(AlgoStrategy):
    def __init__(self, **kwargs) -> None:
        super().__init__(**kwargs)
        self.kwargs = kwargs
        
    def ajuster_heure_fin(self):
        print(self.kwargs)

if __name__ == '__main__':
    t = test(main="main", malin=66) 
    t.ajuster_heure_fin()