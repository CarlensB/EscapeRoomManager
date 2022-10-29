class ReservationsDAO:
    
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

    def ajouter(self, args: list[tuple[str, str, int, int, int, str, str, float, str]]) -> None:
        sql ='''
        INSERT INTO reservations (nom_client, num_telephone, statut_reservation, salle,
        nb_personnes, courriel, heure, prix_total, date)
        VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        val = args
        self.__execute_query(sql, val)

    def supprimer(self, reservation: list[tuple[int]]) -> None:
        sql = "DELETE FROM reservations WHERE id = %s"
        val = reservation
        self.__execute_query(sql, val)

    def selectionner(self, reservation: list[tuple[int]]) -> list:
        sql = "SELECT * from reservations WHERE id = %s"
        val = reservation[0]
        return self.__select(sql, val)

    def selectionner_all(self, compagnie: list[tuple[int]]) -> list:
        sql = "SELECT * FROM view_reservation_compagnie WHERE id_compagnie = %s"
        val = compagnie[0]
        return self.__select(sql, val)

    def modifier(self, args: list[tuple[str, str, int, int, int, str, str, float, str, int]]) -> None:
        sql = '''
        UPDATE reservations
            SET nom_client= %s, num_telephone= %s, statut_reservation= %s,
            salle= %s, nb_personnes= %s, courriel= %s, heure= %s,
            prix_total= %s, date= %s
                WHERE id= %s
        '''
        val = args
        self.__execute_query(sql, val)

    def __select(self, sql: str, val: tuple) -> None:
        self.__curseur.execute(sql, val)
        result = self.__curseur.fetchall()
        return result

    def __execute_query(self, sql : str, val : tuple = None):
        self.__curseur.executemany(sql, val)
        self.__bd.connexion.commit()