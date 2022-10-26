class RabaisDAO:
    
    def __init__(self, bd) -> None:
        self.bd = bd
        self.curseur = self.bd.curseur

    def ajouter(self, args : tuple[str | float | int | int | str]):
        sql = '''
        INSERT INTO rabais (nom, pourcentage, compagnie, isActive, date_fin)
        VALUES (%s, %s, %s, %s, %s)
        '''
        val = (args)
        self.execute_query(sql, val)
    
    def supprimer(self, id: int) -> None:
        sql = "DELETE FROM rabais WHERE id = %s"
        val = (id,)
        self.execute_query(sql, val)

    def selectionner(self, rabais : str) -> list:
        sql = "SELECT * FROM rabais WHERE nom = %s"
        val = (rabais,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def selectionner_all(self, compagnie : int) -> list:
        sql = "SELECT * FROM rabais WHERE compagnie =%s"
        val = (compagnie,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def modifier(self, table: tuple[str], val: tuple[str]):
        pass

    def execute_query(self, sql : str, val : tuple = None):
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()
