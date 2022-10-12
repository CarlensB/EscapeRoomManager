# Pour enregistrer les informations des centres sur la base de données

from .ConnectionDAO import ConnexionDAO

class CentresDAO:

    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur
    
    def ajouter_centre(self, *args : tuple[str | int]):
        sql = "INSERT INTO centres (nom, compagnie, adresse, ville, pays, code_postal) VALUES (%s, %s, %s, %s, %s, %s)"
        val = (args)
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()

    def selectionner_centre(self, centre : str) -> tuple:
        sql = "SELECT * from centres WHERE nom = %s"
        val = centre
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result
        