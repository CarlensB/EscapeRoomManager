# Pour enregistrer les informations des salles sur la base de données
from .ConnectionDAO import ConnexionDAO

class SallesDAO:
    
    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur

    def ajouter_salle(self, *args : tuple[str | str | int | int | float | int]):
        sql = '''
        INSERT INTO salles (nom, description, centre, nb_max_joueur, prix_unitaire, horaire)
        VALUE(%s, %s, %s, %s, %s, %s)
        '''
        val = (args)
        self.execute_query(sql, val)

    def supprimer_salle(self, salle: int) -> None:
        sql = "DELETE FROM salles WHERE id = %s"
        val = (salle,)
        self.execute_query(sql, val)

    def selectioner_tous_salles(self, compagnie : int) -> list:
        sql = "SELECT * FROM view_salles_compagnie WHERE id_compagnie = %s"
        val = (compagnie,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def selectionner_salles_centres(self, centre : int) -> list:
        sql = "SELECT * FROM salles WHERE centre = %s"
        val = (centre,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def execute_query(self, sql : str, val : tuple = None):
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()