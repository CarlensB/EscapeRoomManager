# ===============================================
# Nom du fichier : RabaisDAO.py
# Ce fichier contient les actions pour interagir
# avec la table contenant les rabais.
# Auteur : Maxence Guindon
# Équipe : Carlens Belony et Maxence Guindon
# ===============================================

class RabaisDAO:
    
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

    def ajouter(self, args: list[tuple[str, float, int, int, str]]) -> None:
        sql = '''
        INSERT INTO rabais (nom, pourcentage, compagnie, isActive, date_fin)
        VALUES (%s, %s, %s, %s, %s)
        '''
        val = args
        self.__execute_query(sql, val)

    def selectionner(self, rabais: list[tuple[int]]) -> list:
        sql = "SELECT * FROM rabais WHERE id = %s"
        val = rabais[0]
        return self.__select(sql, val)

    def supprimer(self, horaire: list[tuple[int]]) -> None:
        sql = "DELETE FROM rabais WHERE id = %s"
        val = horaire
        self.__execute_query(sql, val)

    def selectionner_all(self, compagnie : list[tuple[int]]) -> list:
        sql = "SELECT * FROM rabais WHERE compagnie =%s"
        val = compagnie[0]
        return self.__select(sql, val)
        
    def modifier(self, args: list[tuple[str, float, int, int, str, int]]) -> None:
        sql = '''UPDATE rabais
                 SET nom= %s, pourcentage= %s, compagnie= %s, isActive= %s, date_fin= %s
                 WHERE id= %s'''
        val = args
        self.__execute_query(sql, val)

    def __select(self, sql: str, val: tuple) -> list:
        self.__curseur.execute(sql, val)
        result = self.__curseur.fetchall()
        return result

    def __execute_query(self, sql : str, val : tuple = None):
        self.__curseur.executemany(sql, val)
        self.__bd.connexion.commit()
