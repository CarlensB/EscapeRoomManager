

from logging import raiseExceptions


class DoubleLinkedList:

    __ERROR_MSG = f"The type of the element you place are not the same. They need to be of the same type."
    
    class _Node:
        
        def __init__(self, data = None) -> None:
            self._data = data
            self._next_node = None
            self._prev_node = None

        def __eq__(self, node: 'DoubleLinkedList._Node') -> bool:
            if isinstance(node, DoubleLinkedList._Node):
                return self._data == node._data
            return False
        
        # Source pour la fonction __eq__
        # Source : https://www.pythontutorial.net/python-oop/python-__eq__/

    def __init__(self, *value: any) -> None:
        self.__front_node = None
        self.__last_node = None
        self.__data_type = None
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

    @property
    def data_type(self):
        return self.__data_type

    @property
    def get_first(self):
        return self.__front_node

    @property
    def get_last(self):
        return self.__last_node

    def add_first(self, new_data: any) -> None:
        # todo: placer au bon endroit la fonction self.__determine_data_type()
        # pour valider le data qu'on tente de rentrer
        new_node = self._Node(new_data)
        if self.__front_node is not None:
            self.__verify_data((new_data,))
            self.__front_node._prev_node = new_node
            if self.__front_node._next_node is None:
                self.__last_node = self.__front_node
        new_node._next_node = self.__front_node
        self.__front_node = new_node
    
    def add_last(self, new_data: any) -> None:
        new_node = self._Node(new_data)

    def __place_value(self, value: tuple) -> None:
        self.__determine_data_type(value[0])
        if self.__verify_data(value):
            for v in value:
                self.add_first(v)

    def __determine_data_type(self, data: any) -> any:
        self.__data_type = data.__class__

    def __verify_data(self, value: tuple) -> bool:
        for v in value:
            if self.__data_type != v.__class__ : raise ValueError(self.__ERROR_MSG + f" The data: {self.__data_type}, wrong value type: {v.__class__}")
        return True