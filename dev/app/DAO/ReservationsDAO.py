class ReservationsDAO:
    
    def __init__(self, bd) -> None:
        self.bd = bd
        self.curseur = self.bd.curseur

    def ajouter(self, args : tuple[str | int | int | int | int | str | int | int | int | str]):
        sql ='''
        INSERT INTO reservations (nom_client, num_telephone, statut_reservation, salle,
        nb_personnes, courriel, heure, prix_total, date)
        VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        val = (args)
        self.__execute_query(sql, val)

    def supprimer(self, id: int) -> None:
        sql = "DELETE FROM reservations WHERE id = %s"
        val = (id,)
        self.__execute_query(sql, val)

    def selectionner(self, salle : int) -> list:
        sql = "SELECT * from reservations WHERE salle = %s"
        val = (salle,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def modifier(self, table: tuple[str], val: tuple[str]):
        pass

    def __execute_query(self, sql : str, val : tuple = None):
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()