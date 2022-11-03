#from modele.actionDAO import ActionDAO

class CompagniesDAO:

    def __init__(self, bd) -> None:
        self.__bd = bd
        self.__curseur = self.__bd.curseur
        self.__fonction ={
            'ajouter': self.ajouter,
            'selectionner': self.selectionner,
            'supprimer': self.supprimer,
            'selectionner_all': self.selectionner_all,
            'modifier': self.modifier,
            'recuper_salle': self.recuper_salle
        }

    @property
    def fonction(self):
        return self.__fonction

    def ajouter(self, args: list[tuple[str, str, str, str]]) -> None:
        sql = "INSERT INTO compagnies (nom, info_paiement, courriel, mot_de_passe) VALUES (%s, %s, %s, %s)"
        val = args
        self.__execute_query(sql, val)

    def selectionner(self, compagnie: list[tuple[int]]) -> list[tuple]:
        sql = "SELECT * from compagnies WHERE id = %s"
        val = compagnie[0]
        return self.__select(sql, val)

    def selectionner_all(self, args: list[tuple[int]]) -> list[tuple]:
        sql = "SELECT * FROM compagnies"
        return self.__select(sql)

    def supprimer(self, compagnie: list[tuple[int]]) -> None:
        sql = "DELETE FROM compagnies WHERE id = %s"
        val = compagnie
        self.__execute_query(sql, val)

    def modifier(self, args: list[tuple[str, str, str, str]]) -> None:
        sql = '''UPDATE compagnies SET nom= %s, info_paiement= %s, courriel= %s, mot_de_passe= %s
                 WHERE id= %s'''
        val = args
        self.__execute_query(sql, val)

    def recuper_salle(self, compagnie: list[tuple[int]]) -> list:
        sql = '''SELECT salle FROM view_salles_compagnie WHERE id_compagnie = %s'''
        val = compagnie[0]
        return self.__select(sql, val)

    def __execute_query(self, sql: str, val: list[tuple] = None) -> None:
        self.__curseur.executemany(sql, val)
        self.__bd.connexion.commit()

    def __select(self, sql: str, val: tuple = None) -> list:
        self.__curseur.execute(sql, val)
        result = self.__curseur.fetchall()
        return result
