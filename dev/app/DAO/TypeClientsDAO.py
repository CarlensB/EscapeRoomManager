class TypeClientsDAO:

    def __init__(self, bd) -> None:
        self.__bd = bd
        self.__curseur = self.__bd.curseur
        self.__fonction ={
            'ajouter': self.ajouter,
            'selectionner': self.selectionner,
            'supprimer': self.supprimer,
            'selectionner_all': self.selectionner_all,
            'modifier': self.modifier,
        }

    @property
    def fonction(self):
        return self.__fonction

    def ajouter(self, args: list[tuple[str| float |int]]):
        sql = "INSERT INTO typeclient (categorie, prix, compagnie) VALUES (%s, %s, %s)"
        val = args # str, str, int
        self.__execute_query(sql, val)
    
    def supprimer(self, tc: int) ->None:
        sql = "DELETE FROM typeclient WHERE id = %s"
        val = [(tc,)]
        self.__execute_query(sql, val)

    def selectionner(self, client_type: int) -> list:
        sql = "SELECT * from typeclient WHERE id = %s"
        val = (client_type,)
        return self.__select(sql, val)

    def selectionner_all(self, compagnie : int) -> list:
        sql = "SELECT * FROM typeclient WHERE compagnie = %s"
        val = (compagnie,)
        return self.__select(sql, val)

    def modifier(self, args: list[tuple[str| float |int]]) -> None:
        sql = '''UPDATE typeclient
                 SET categorie= %s, prix= %s, compagnie= %s
                 WHERE id= %s'''
        val = args
        self.__execute_query(sql ,val)

    def __select(self, sql: str, val: tuple) -> list:
        self.__curseur.execute(sql, val)
        result = self.__curseur.fetchall()
        return result

    def __execute_query(self, sql : str, val : tuple = None):
        self.__curseur.executemany(sql, val)
        self.__bd.connexion.commit()