#from ..modele.actionDAO import ActionDAO

class CentresDAO:

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

    def ajouter(self, args: list[tuple[str, int, str, str, str, str]]) -> None:
        sql = "INSERT INTO centres (nom, compagnie, adresse, ville, pays, code_postal) VALUES (%s, %s, %s, %s, %s, %s)"
        val = args
        self.__execute_query(sql, val)
        sql = "SELECT id FROM centres WHERE nom = %s"
        return self.__select(sql, (val[0][0],))
 

    def selectionner(self, centre: list[tuple[int]]) -> list:
        sql = "SELECT * FROM centres WHERE id = %s"
        val = centre[0]
        return self.__select(sql, val)
    
    def supprimer(self, centre: list[tuple[int]]) -> None:
        sql = "DELETE FROM centres WHERE id = %s"
        val = centre
        self.__execute_query(sql, val)

    def selectionner_all(self, compagnie: list[tuple[int]]) -> list:
        sql = "SELECT * FROM centres WHERE compagnie = %s"
        val = compagnie[0]
        print(val)
        return self.__select(sql, val)

    def modifier(self, args: list[tuple[str, int, str, str, str, str, int]]) -> None:
        sql = '''UPDATE centres SET nom= %s, compagnie= %s, adresse= %s, ville= %s, pays= %s, code_postal= %s
                 WHERE id= %s'''
        val = args
        self.__execute_query(sql, val)

    def recuper_salle(self, centre: list[tuple[int]]) -> list:
        sql = '''SELECT salle FROM view_salles_compagnie WHERE id_centre =%s'''
        val = centre[0]
        return self.__select(sql, val)

    def __execute_query(self, sql: str, val: list[tuple] = None) -> None:
        self.__curseur.executemany(sql, val)
        self.__bd.connexion.commit()

    def __select(self, sql: str, val: tuple) -> list:
        self.__curseur.execute(sql, val)
        result = self.__curseur.fetchall()
        return result
