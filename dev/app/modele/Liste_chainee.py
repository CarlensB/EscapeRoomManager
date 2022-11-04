class DoubleLinkedList:

    __ERROR_MSG = f"The type of the element you place are not the same. They need to be of the same type."
    
    class _Node:
        
        def __init__(self, data: any = None) -> None:
            self._data = data
            self._next_node = None
            self._prev_node = None

        def __eq__(self, node: 'DoubleLinkedList._Node') -> bool:
            if isinstance(node, DoubleLinkedList._Node):
                return self._data == node._data
        
        def __repr__(self) -> str:
            return str(self._data)
        
        # Source pour la fonction __eq__
        # Source : https://www.pythontutorial.net/python-oop/python-__eq__/

    def __init__(self, *value: any) -> None:
        self.__front_node = None
        self.__last_node = None
        self.__data_type = None
        self.__lenght = 0
        if value:
            self.__place_value(value)

    def __iter__(self) -> 'DoubleLinkedList':
        self.n = self.__front_node
        return self

    def __next__(self) -> 'DoubleLinkedList._Node':
        if self.n != None:
            result = self.n
            self.n = self.n._next_node
            return result
        else:
            raise StopIteration

    # source __iter__ et __next__
    # Source : https://www.programiz.com/python-programming/iterator
    # Titre : Building Custom Iterators

    def __repr__(self) -> str:
        if self.is_empty:
            return "[]"
        res = "["
        node = self.__front_node
        while node is not None:
            res += repr(node)
            if node._next_node is not None:
                res += ", "
            node = node._next_node
        res += "]"
        return res

    def __len__(self) -> int:
        return self.__lenght


    # source pour représenté la liste chainé avec repr ainsi que len:
    # https://otfried.org/courses/cs206/notes/linkedlists.pdf
    
    def __bool__(self) -> bool:
        return not self.is_empty

    @property
    def data_type(self):
        return self.__data_type

    @property
    def get_first(self):
        return self.__front_node

    @property
    def get_last(self):
        return self.__last_node

    @property
    def is_empty(self) -> bool:
        '''
        Return a bool detecting if the list is empty
        '''
        # Source : l'idée me vient de la même source que pour la représentation avec repr
        return self.__front_node is None

    def add_first(self, new_data: any) -> None:
        '''
        Add an element at the first position of the list.
        '''
        new_node = self._Node(new_data)
        if not self.is_empty:
            self.__verify_data((new_data,))
            self.__front_node._prev_node = new_node
            if self.__front_node._next_node is None:
                self.__last_node = self.__front_node
        else:
            self.__determine_data_type(new_data)
        new_node._next_node = self.__front_node
        self.__front_node = new_node
        self.__lenght += 1
    
    def add_last(self, new_data: any) -> None:
        '''
        Add an element at the last position of the list.
        '''
        new_node = self._Node(new_data)
        if self.is_empty:
            self.__determine_data_type(new_data)
            self.__front_node = new_node
            if self.__front_node._next_node is None:
                self.__last_node = self.__front_node
        else:
            self.__verify_data((new_data,))
            self.__last_node._next_node = new_node
            new_node._prev_node = self.__last_node
            self.__last_node = new_node
        self.__lenght += 1
        
    def add(self, new_data: any,  prev_data: any = None) -> None:
        '''
        Add an element in the liste with the possibility to add it behind another element.
        '''
        if prev_data is not None and not self.is_empty:
            self.__verify_data((prev_data,))

            if self.__data_type is not None:
                self.__verify_data((new_data,))

            new_node = self._Node(new_data)

            try:
                first = self.__front_node
                last = self.__last_node
                # Essayer d'aller 2 fois plus vite!
                # Pour comprendre que j'avais besoin d'un and ici
                # Source : https://stackoverflow.com/questions/54163163/python-while-with-two-conditions-and-or-or
                while first._data != prev_data and last._data != prev_data:
                    first = first._next_node
                    last = last._prev_node
                search_node = first if last._data != prev_data else last
                new_node._prev_node = search_node
                new_node._next_node = search_node._next_node
                if search_node is not self.__last_node:
                    search_node._next_node._prev_node = new_node
                search_node._next_node = new_node
                self.__last_node = new_node if search_node is self.__last_node else self.__last_node
                self.__lenght += 1
                
            except AttributeError:
                raise ValueError(f"The object passed as previous data is not in the list {prev_data}")
        else:
            self.add_last(new_data)
   
            
    def delete_node(self, data: any) -> None:
        search_node = self.__front_node
        if search_node is not None and search_node == data:
            print('test')
    
    def get_value(self):
        pass

    def __place_value(self, value: tuple) -> None:
        self.__determine_data_type(value[0])
        self.__verify_data(value)
        for v in value:
            self.add_last(v)

    def __determine_data_type(self, data: any) -> any:
        self.__data_type = data.__class__

    def __verify_data(self, value: tuple) -> None:
        for v in value:
            if self.__data_type != v.__class__ : raise ValueError(self.__ERROR_MSG + f" The data: {self.__data_type}, wrong value type: {v.__class__}")
            
# Test
#===============================================================

if __name__ == '__main__':
    list = DoubleLinkedList(9,11)
    list.add(13)
    list.add(15)
    list.add(17)
    list.add(19, 15)
    list.add(18, 17)
    list.add_first(1)
    list.add(21, 1)
    list.add_last(30)
    print(list)