from enum import Enum, auto
from abc import ABC, abstractmethod

class AlgoContext():
    '''
    Une classe de context pour des tests et s'organiser avec le design pattern
    stratefy.
    '''
    def __init__(self):
        self.__strategy_naive = AlgoNaive()
        self.__strategy_bc = BackChecking()
        self.__strategy_fc = FowardChecking()
        #... else
        
    def create_schedule(self, h_start: float, h_end: float, duration: float = 60., interval: float = 15., **kwargs):
        '''
        Can also build a schedule for multiple room. Accept these key-values argument:
        nb_room : int
        nb_emp: int
        reset_time: float
        greeting_time: float
        '''
        
        keys = set(kwargs.keys())
        if keys == set():
            self.__strategy_naive.execute_algorithme(h_start, h_end, duration, interval)
        elif keys == {'nb_room'}:
            pass
        elif keys == {'nb_room', 'nb_emp'}:
            pass
        elif keys == {'nb_room', 'reset_time'}:
            pass
        elif keys == {}:
            pass
        elif keys == {'nb_room', 'nb_emp', 'reset_time'}:
            pass
        elif keys == {'reset_time', 'greeting_time'}:
            pass
        elif keys == {'nb_room', 'nb_emp', 'reset_time', 'greeting_time'}:
            pass
        else:
            raise ValueError('Les paramètres passées à la fonction ne sont pris en charge')

# Source pour interface
# https://realpython.com/python-interface/#formal-interfaces

class AlgoStrategy(ABC):
    '''
    A class that will implement the best strategy to execute in direct
    regard of the parameters in will receive.
    '''
    
    def __init__(self) -> None:
        super().__init__()
        self.__schedule = []
        self.h_start = None
        self.h_end = None
        self.__space_between_start = None
        
    @property
    def schedule(self):
        return self.__schedule
    
    @schedule.setter
    def schedule(self, value):
        self.__schedule = value
        
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
    
    def __init__(self) -> None:
        super().__init__()

    def ajust_schedule_end(self):
        self.h_end = self.h_end + (24*60)
            
    def create_schedule(self):
        next_start = self.h_start
        while next_start <= self.h_end:
            self.schedule.append(next_start)
            next_start = self.schedule[-1] + self.__space_between_start
        self.schedule = [i/60 for i in a.schedule]
        self.schedule = [i-24 if i > 24 else i for i in a.schedule]
        
    def execute_algorithme(self, h_start: float, h_end: float, duration: int=60, interval: int=30):
        self.h_start = h_start
        self.h_end = h_end
        self.__space_between_start = duration + interval
        
        if self.h_start > self.h_end:
            self.ajust_schedule_end()
        self.create_schedule()

#...

class BackChecking(AlgoNaive):
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
    
    def __init__(self) -> None:
        super().__init__()
        self.__ratio = None
        
    @property
    def ratio(self):
        return self.__ratio
    
    @ratio.setter
    def ratio(self, value):
        self.__ratio = value
        
    def execute_algorithme(self, a: list, n: int, k: int, buffer: float, depth: int = 0, used: list= [], ans: list = [], curr: list = []):
        '''
        Implement permutation of k items out of n items
        depth: start from 0, and represent the depth of the search
        used: track what items are  in the partial solution from the set of n
        curr: the current partial solution
        ans: collect all the valide solutions
        '''
        if depth == k:
            ans.append(curr[::])
            print('test : ', [i/60 for i in a])
            return
        
        for i in range(n):
            if not used[i]:
                curr.append(a[i])
                used[i] = True
                # Contraintes d'intervalle
                # Contraintes d'employés (inclus le temps de rangement et ou temps d'accueil)
                if self.ratio is not None and self.ratio < 1:
                    if a[i] - a[i-1] < buffer:
                        a[i] += buffer
                    # try:
                    #     prev = a[i-1]
                    # except:
                    #     prev = -1
                    # if prev == a[i]:
                    #     a[i] += interval
                    # a[i] = buffer                       
                
                print(curr)
                self.execute_algorithme(a, n, k, buffer, depth+1, used, ans, curr)
                
                curr.pop()
                print('backtrack: ', curr)
                used[i] = False
                
        return

class FowardChecking:
    def __init__(self, *args, **kwargs) -> None:
        pass

#...

class MinConflict:
    pass

#...


 # +-+-+-+-+
 # |T|E|S|T|
 # +-+-+-+-+

if __name__ == '__main__':
    a = BackChecking()#AlgoNaive(duration=45, h_start=9*60, h_end=1*60, intervalle=15)
    a.ratio = 1/3
    a.execute_algorithme([9*60, 9*60, 9*60], 3, 3, 15, used=[False]*3)
    #print(a.schedule)