# ===============================================
# Nom du fichier : HorairesDAO.py
# Ce fichier contient les actions pour interagir
# avec la table contenant les horaires.
# Auteur : Maxence Guindon
# Équipe : Carlens Belony et Maxence Guindon
# ===============================================

class HorairesDAO:
    
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

    def ajouter(self, args: list[tuple[str, str]]) -> None:
        sql = '''
        INSERT INTO horaires (heure_debut, heure_fin) 
        VALUES(%s, %s)
        '''#INSERT OR 
        val = args
        self.__execute_query(sql, val)
        sql = "SELECT id FROM horaires WHERE heure_debut = %s AND heure_fin = %s"
        return self.__select(sql, val[0])

    def selectionner(self, horaire: list[tuple[int]]) -> None:
        sql = '''
        SELECT id FROM horaires WHERE heure_debut = %s AND heure_fin = %s
        '''
        val = horaire[0]
        return self.__select(sql, val)

    def selectionner_all(self, salle: list[tuple[int]]) -> list:
        # Seulement tous les horaires pour une salle
        sql = "SELECT * FROM view_salle_horaire WHERE salle = %s"
        val = salle[0]
        return self.__select(sql, val)

    def supprimer(self, horaire: list[tuple[int]]) ->None:
        sql = "DELETE FROM horaires WHERE id = %s"
        val = horaire
        self.__execute_query(sql, val)

    def modifier(self, args: list[tuple[str, str, int]]) -> None:
        sql = '''UPDATE horaires SET heure_debut= %s, heure_fin= %s
                 WHERE id= %s '''
        val = args
        self.__execute_query(sql, val)
    
    def __select(self, sql: str, val: tuple) -> list:
        self.__curseur.execute(sql, val)
        result = self.__curseur.fetchall()
        return result

    def __execute_query(self, sql: str, val: tuple = None) -> None:
        self.__curseur.executemany(sql, val)
        self.__bd.connexion.commit()