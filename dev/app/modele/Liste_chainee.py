class DoubleLinkedList:

    __ERROR_MSG = f"The type of the element you place are not the same. They need to be of the same type."
    
    class _Node:
        
        def __init__(self, data: any = None) -> None:
            self._data = data
            self._next_node = None
            self._prev_node = None
            
        @property
        def value(self) -> any:
            return self._data
            
        @property
        def next_val(self) -> any:
            return self._next_node
        
        @property
        def prev_val(self) -> any:
            return self._prev_node
        
        @value.setter
        def value(self, value) -> any:
            self._data = value
        
        @next_val.setter
        def next_val(self, value: any) -> None:
            self._next_node = value
            
        @prev_val.setter
        def prev_val(self, value: any) -> None:
            self._prev_node = value

        def __eq__(self, node: 'DoubleLinkedList._Node') -> bool:
            if isinstance(node, DoubleLinkedList._Node):
                return self.value == node.value
        
        def __repr__(self) -> str:
            return str(self.value)
        
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
            self.n = self.n.next_val
            return result.value
        else:
            raise StopIteration    

    # source __iter__ et __next__
    # Source : https://www.programiz.com/python-programming/iterator
    # Titre : Building Custom Iterators
    
    def __reversed__(self) -> 'DoubleLinkedList._Node':
        reverse_list = []
        self.prev = self.__last_node
        while self.prev != None:
            reverse_list.append(self.prev)
            self.prev = self.prev.prev_val
        return reverse_list
    
    # inspiration pour reversed :
    # https://stackoverflow.com/questions/21529359/reversing-a-linked-list-in-python
    
    def __getitem__(self, index: int) -> any:
        if isinstance(index, int):
            if index < 0:
                index = len(self) + index

            for i, value in enumerate(self):
                if i == index:
                    return value
            raise IndexError(f'{type(self).__name__} index {index} out of range(0, {len(self)-1})')
        
    # source pour getitem:
    # https://stackoverflow.com/questions/57400399/implementation-of-linkedlist-in-python-getitem-method

    def __repr__(self) -> str:
        if self.is_empty:
            return "[]"
        res = "["
        node = self.__front_node
        while node is not None:
            res += repr(node)
            if node.next_val is not None:
                res += ", "
            node = node.next_val
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
            self.__front_node.prev_val = new_node
            if self.__front_node.next_val is None:
                self.__last_node = self.__front_node
        else:
            self.__determine_data_type(new_data)
        new_node.next_val = self.__front_node
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
            if self.__front_node.next_val is None:
                self.__last_node = self.__front_node
        else:
            self.__verify_data((new_data,))
            self.__last_node.next_val = new_node
            new_node.prev_val = self.__last_node
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
                search_node = self.__search_node(prev_data)
                new_node.prev_val = search_node
                new_node.next_val = search_node.next_val
                if search_node is not self.__last_node:
                    search_node.next_val.prev_val = new_node
                search_node.next_val = new_node
                self.__last_node = new_node if search_node is self.__last_node else self.__last_node
                self.__lenght += 1

            except AttributeError:
                raise ValueError(f"The object passed as previous data is not in the list {prev_data}")
        else:
            self.add_last(new_data)
   
            
    def remove(self, data: any) -> None:
        if not self.is_empty:
            self.__verify_data((data,))
            if data is self.__front_node.value:
                self.remove_firt()
                return

            if data is self.__last_node.value:
                self.remove_last()
                return

            search_node = self.__search_node(data)

            search_node.next_val.prev_val = search_node.prev_val
            search_node.prev_val.next_val = search_node.next_val
            del(search_node)
            self.__lenght -= 1

        else:
            raise ValueError(f"The list is empty")
        
        # if search_node is not None and search_node == data:
        #     print('test')
        
    def clear(self) -> None:
        while self.__last_node is not None:
            self.remove_last()
        self.__front_node = None   

    def remove_firt(self) -> None:
        node = self.__front_node
        self.__front_node = self.__front_node.next_val
        self.__front_node.prev_val = None
        del(node)
        self.__lenght -= 1

    def remove_last(self) -> None:
        node = self.__last_node
        self.__last_node = self.__last_node.prev_val
        if self.__last_node is not None:
            self.__last_node.next_val = None
        del(node)
        self.__lenght -= 1

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

    def __search_node(self, data: any) -> 'DoubleLinkedList._Node':
        # Essayer d'aller 2 fois plus vite!
        # Pour comprendre que j'avais besoin d'un and ici
        # Source : https://stackoverflow.com/questions/54163163/python-while-with-two-conditions-and-or-or
        first = self.__front_node
        last = self.__last_node
        while first.value != data and last.value != data:
            first = first.next_val
            last = last.prev_val
        search_node = first if last.value != data else last
        return search_node
   