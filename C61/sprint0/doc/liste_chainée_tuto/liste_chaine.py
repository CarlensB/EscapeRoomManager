'''
Lien : https://www.cours-gratuit.com/tutoriel-python/tutoriel-python-les-listes-chanes-premire-partie
Tutoriel pour bâtir une liste chainée en python et ses différentes fonction
'''

class Node:
    def __init__(self, dataval=None):
        self.dataval =dataval
        self.valsuivant = None
        self.valprecedent = None # Pour une double liste chainée

class linkedList:
    def __init__(self):
        self.teteval = None

    def display_list(self):
        printval = self.teteval
        while printval is not None:
            print(printval.dataval)
            printval = printval.valsuivant

    def add_first(self, new_data):
        new_node = Node(new_data)
        # mettre à jour les nouveaux noeuds à la suite du noeud existant
        new_node.valsuivant = self.teteval
        self.teteval = new_node

    def add_last(self, new_data):
        new_node = Node(new_data)
        if self.teteval is None:
            self.teteval = new_node
            return
        last = self.teteval
        while(last.valsuivant):
            last = last.valsuivant
        last.valsuivant = new_node

    def add_in_between(self, middle, new_data):
        if middle is None:
            print("le node mentionner est absent")
            return
        new_node = Node(new_data)
        new_node.valsuivant = middle.valsuivant
        middle.valsuivant = new_node

    def delete_node(self, key):
        valsup = self.teteval
        if (valsup is not None):
            if (valsup.dataval == key):
                self.teteval = valsup.valsuivant
                valsup = None
                return
        while valsup is not None:
            if valsup.dataval == key:
                break
            prev = valsup
            valsup = valsup.valsuivant
        if valsup == None:
            return
        prev.valsuivant = valsup.valsuivant
        valsup = None

liste1 = linkedList()
liste1.teteval = Node("lundi")
e2 = Node("mardi")
e3 = Node("jeudi")

# Relier le 1er noeud au 2e noeud
liste1.teteval.valsuivant = e2

# Relier le 2e noeud au 3e noeud
e2.valsuivant = e3

# Ajouter au debut d'une liste chainée
liste1.add_first("samedi")

# Ajouter à la fin
liste1.add_last("vendredi")

# Ajouter entre 2 node
liste1.add_in_between(liste1.teteval.valsuivant.valsuivant, "mercredi")

# Supprimer d'une liste
liste1.delete_node("jeudi")

# Parcourir une liste chainée
liste1.display_list()

