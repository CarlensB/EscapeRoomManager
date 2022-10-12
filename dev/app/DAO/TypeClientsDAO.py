# Pour enregistrer les informations des clients sur la base de données
from .ConnectionDAO import ConnexionDAO

class TypeClientsDAO:

    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur

    def ajouter_type_client(self, *args: tuple[str|int]):
        sql = "INSERT INTO typeclient (categorie, prix, compagnie) VALUES (%s, %s, %s)"
        val = (args) # str, str, int
        
        if args[0][1]:
            self.curseur.execute(sql, val)
        else:
            self.curseur.executemany(sql, val)
        self.bd.connexion.commit()

    def selectionner_type_client(self, client_type: str) -> list:
        sql = "SELECT * from typeclient WHERE categorie = %s"
        val = (client_type,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def selectionner_tous_type_client(self) -> list:
        sql = "SELECT * FROM typeclient"
        self.curseur.execute(sql)
        result = self.curseur.fetchall()
        return result