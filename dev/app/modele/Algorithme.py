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
        Receive the time in minutes for the h_start and h_end variable.
        Can also build a schedule for multiple room. Accept these key-values argument:
        nb_room : int
        nb_emp: int
        reset_time: float
        greeting_time: float
        goodbye_time: float
        buffer: float -> 
        The buffer variable is build from reset_time, greeting_time and goodbye_time if it's
        not received by the function.
        
        h_end is receive here as the last start of the activity.
        '''
        
        keys = set(kwargs.keys())
        if keys == set():
            self.__strategy_naive.execute_algorithme(h_start, h_end, duration, interval)
            return self.__strategy_naive.schedule
            
        elif keys == {'nb_room', 'buffer'}:
            self.__strategy_bc.execute_algorithme(h_start, h_end, kwargs['nb_room'], duration, interval, kwargs['buffer'])
            return self.__strategy_bc.schedule
            
        elif keys == {'nb_room', 'greeting_time', 'goodbye_time'}:
            buffer = kwargs['greeting_time'] + kwargs['goodbye_time']
            self.__strategy_bc.execute_algorithme(h_start, h_end, kwargs['nb_room'], duration, interval, buffer)
            return self.__strategy_bc.schedule
            
        elif keys == {'nb_room', 'reset_time', 'goodbye_time'}:
            buffer = kwargs['reset_time'] + kwargs['goodbye_time']
            self.__strategy_bc.execute_algorithme(h_start, h_end, kwargs['nb_room'], duration, interval, buffer)
            return self.__strategy_bc.schedule
            
        elif keys == {'nb_room', 'reset_time', 'greeting_time'}:
            buffer = kwargs['reset_time'] + kwargs['greeting_time']
            self.__strategy_bc.execute_algorithme(h_start, h_end, kwargs['nb_room'], duration, interval, buffer)
            return self.__strategy_bc.schedule
            
        elif keys == {'nb_room', 'reset_time', 'greeting_time', 'goodbye_time'}:
            buffer = kwargs['reset_time'] + kwargs['greeting_time'] + kwargs['goodbye_time']
            self.__strategy_bc.execute_algorithme(h_start, h_end, kwargs['nb_room'], duration, interval, buffer)
            return self.__strategy_bc.schedule
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
        self._space_between_start = None
        
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

    def ajust_schedule_end(sel, h_end: float):
        return h_end + (24*60)
            
    def create_schedule(self, h_start: float, h_end: float):
        schedule = []
        next_start = h_start
        while next_start <= h_end:
            schedule.append(next_start)
            next_start = schedule[-1] + self._space_between_start
        schedule = [i/60 for i in schedule]
        schedule = [i-24 if i > 24 else i for i in schedule]
        return schedule
        
    def execute_algorithme(self, h_start: float, h_end: float, duration: float=60., interval: float=30.):
        '''
        The start and end time need to be in minute for the function to work.
        '''
        self._space_between_start = duration + interval
        
        if h_start > h_end:
            h_end = self.ajust_schedule_end(h_end)
        self.schedule = self.create_schedule(h_start, h_end)

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
        
    def execute_algorithme(self, h_start: float, h_end: float, nb_salle: int, duration: float = 60., interval: float = 30., buffer: float = 15.):
        self._space_between_start = duration + interval
        
        a = [h_start]*nb_salle
        n = len(a)
        a = self.execute_A_n_k(a, n, n, buffer, used=[False]*n)

        for i in range(n):
            if a[i] > h_end:
                h_end = self.ajust_schedule_end(h_end)
            self.schedule.append((self.create_schedule(a[i], h_end), i))

        
    def execute_A_n_k(self, a: list, n: int, k: int, buffer: float, depth: int = 0, used: list= [], ans: list = [], curr: list = []):
        '''
        Implement permutation of k items out of n items
        depth: start from 0, and represent the depth of the search
        used: track what items are  in the partial solution from the set of n
        curr: the current partial solution
        ans: collect all the valide solutions
        '''
        if depth == k:
            ans.append(curr[::])
            return
        
        for i in range(n):
            if not used[i]:
                curr.append(a[i])
                used[i] = True
                # Contraintes de salle et départ différent (1 salles d'accueil)
                # Contraintes d'employés (inclus le temps de rangement et ou temps d'accueil)
                a[i] = self.validate_value_unique(a[i], i, buffer, a)         

                self.execute_A_n_k(a, n, k, buffer, depth+1, used, ans, curr)
                
                curr.pop()
                used[i] = False 
        return a
    
    def validate_value_unique(self, value: any, index:any, buffer: any, tab: list):
        for idx, elem in enumerate(tab):
            if value == elem and index != idx:
                value += buffer
        return value

class FowardChecking:
    def __init__(self) -> None:
        pass

#...

class MinConflict:
    pass

#...


 # +-+-+-+-+
 # |T|E|S|T|
 # +-+-+-+-+

if __name__ == '__main__':
    s = AlgoContext()
    print(s.create_schedule(8.*60, 21.*60, 90, 30))
