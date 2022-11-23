class SallesDAO:
    
    def __init__(self, bd) -> None:
        self.__bd = bd
        self.__curseur = self.__bd.curseur
        self.__fonction ={
            'ajouter': self.ajouter,
            'selectionner': self.selectionner,
            'supprimer': self.supprimer,
            'selectionner_all': self.selectionner_all,
            'modifier': self.modifier,
            'lier': self.lier
        }

    @property
    def fonction(self):
        return self.__fonction

    def ajouter(self, args : list[tuple[str, str, int, int, float, int]]) -> None:
        sql = '''
        INSERT INTO salles (nom, description, centre, nb_max_joueur, prix_unitaire, privee)
        VALUE(%s, %s, %s, %s, %s, %s)
        '''
        val = args
        self.__execute_query(sql, val)
        sql = "SELECT id FROM salles WHERE nom = %s"
        return self.__select(sql, (val[0][0],))
 

    def selectionner(self, salle: list[tuple[int]]) -> list:
        sql = '''SELECT * FROM salles WHERE id = %s'''
        val = salle[0]
        return self.__select(sql, val)

    def supprimer(self, salle: list[tuple[int]]) -> None:
        sql = "DELETE FROM salles WHERE id = %s"
        val = salle
        self.__execute_query(sql, val)

    def selectionner_all(self, compagnie: list[tuple[int]]) -> list:
        sql = "SELECT * FROM salles WHERE centre = %s"
        val = compagnie[0]
        return self.__select(sql, val)

    def modifier(self, args: list[tuple[str, str, int, int, float, int]]) -> None:
        sql = '''UPDATE salles
                 SET nom= %s, description= %s, centre= %s, nb_max_joueur= %s, prix_unitaire= %s, privee= %s
                 WHERE id = %s'''
        val = args
        self.__execute_query(sql, val)

    def lier(self, liste_id: list[tuple[int, int]]) -> None:
        ''' le tuple des id doit avoir cette configuraiton(id_horaire, id_salle)'''
        sql = "INSERT INTO hor_salle(id_horaire, id_salle) VALUES( %s, %s)"
        val = liste_id
        self.__execute_query(sql, val)
        

    def __execute_query(self, sql : str, val : tuple = None) -> None:
        self.__curseur.executemany(sql, val)
        self.__bd.connexion.commit()

    def __select(self, sql: str, val: tuple) -> list:
        self.__curseur.execute(sql, val)
        result = self.__curseur.fetchall()
        return result