# Pour enregistrer les informations des horaires sur la base de données
from .ConnectionDAO import ConnexionDAO

class HorairesDAO:
    
    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur

    def ajouter(self, args : tuple[ str | str | int]):
        sql = '''
        INSERT INTO horaires (heure_debut, heure_fin)
        VALUES(%s, %s)
        '''
        val = (args)
        self.__execute_query(sql, val)

    def selectionner(self, args : tuple[str | str]):
        sql = '''
        SELECT * FROM horaires WHERE heure_debut = %s AND heure_fin = %s
        '''
        val = (args)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def selectionner_all(self, salle : str) -> list:
        # Seulement tous les horaires pour une salle
        sql = "SELECT * FROM view_salle_horaire WHERE salle = %s"
        val = (salle,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def supprimer(self, id : int) ->None:
        sql = "DELETE FROM horaires WHERE id = %s"
        val = (id,)
        self.__execute_query(sql, val)

    def __execute_query(self, sql : str, val : tuple = None):
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()