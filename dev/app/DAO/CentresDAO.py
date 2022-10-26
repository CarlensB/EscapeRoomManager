class CentresDAO:

    def __init__(self, bd) -> None:
        self.bd = bd
        self.curseur = self.bd.curseur
    
    def ajouter(self, args : tuple[str | int | str | str | str | str]):
        sql = "INSERT INTO centres (nom, compagnie, adresse, ville, pays, code_postal) VALUES (%s, %s, %s, %s, %s, %s)"
        val = (args)
        self.__execute_query(sql, val)

    def selectionner(self, compagnie : int) -> list:
        sql = "SELECT * FROM centres WHERE compagnie = %s"
        val = (compagnie,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def supprimer(self, centre : int) -> None:
        sql = "DELETE FROM centres WHERE id = %s"
        val = (centre,)
        self.__execute_query(sql, val)
    
    def modifier(self, table: tuple[str], val: tuple[str]):
        pass

    def __execute_query(self, sql : str, val : tuple = None):
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()