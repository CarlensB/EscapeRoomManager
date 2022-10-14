# Pour enregistrer les informations de réservation sur la base de données
from .ConnectionDAO import ConnexionDAO

class ReservationsDAO:
    
    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur

    def ajouter_reservation(self, *args : tuple[str | int | int | int | int | str | int | int | int | str]):
        sql ='''
        INSERT INTO reservations (nom_client, num_telephone, statut_reservation, salle,
        nb_personnes, courriel, heure, prix_total, date)
        VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        val = (args)
        self.execute_query(sql, val)

    def supprimer_reservation(self, id: int) -> None:
        sql = "DELETE FROM reservations WHERE id = %s"
        val = (id,)
        self.execute_query(sql, val)

    def selectionner_tous_reservations(self, salle : int) -> list:
        sql = "SELECT * from reservations WHERE salle = %s"
        val = (salle,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def execute_query(self, sql : str, val : tuple = None):
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()