class TypeClientsDAO:

    def __init__(self, bd) -> None:
        self.bd = bd
        self.curseur = self.bd.curseur

    def ajouter(self, args: tuple[str| float |int]):
        sql = "INSERT INTO typeclient (categorie, prix, compagnie) VALUES (%s, %s, %s)"
        val = (args) # str, str, int
        self.execute_query(sql, val)
    
    def supprimer(self, id: int) ->None:
        sql = "DELETE FROM typeclient WHERE id = %s"
        val = (id,)
        self.execute_query(sql, val)

    def selectionner(self, client_type: str) -> list:
        sql = "SELECT * from typeclient WHERE categorie = %s"
        val = (client_type,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def selectionner_all(self, compagnie : int) -> list:
        sql = "SELECT * FROM typeclient WHERE compagnie = %s"
        val = (compagnie,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def modifier(self, table: tuple[str], val: tuple[str]):
        pass

    def execute_query(self, sql : str, val : tuple = None):
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()