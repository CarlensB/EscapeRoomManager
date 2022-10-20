# Pour enregistrer les informations des compagnies sur la base de données
from .ConnectionDAO import ConnexionDAO

class CompagniesDAO:

    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur
    
    def ajouter(self, args : tuple[str | str | str | str]):
        sql = "INSERT INTO compagnies (nom, info_paiement, courriel, mot_de_passe) VALUES (%s, %s, %s, %s)"
        val = (args)
        self.__execute_query(sql, val)

    def selectionner(self, compagnie : str) -> list:
        sql = "SELECT * from compagnies WHERE nom = %s"
        val = (compagnie,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def supprimer(self, compagnie : int) -> None:
        sql = "DELETE FROM compagnies WHERE id = %s"
        val = (compagnie,)
        self.__execute_query(sql, val)

    def __execute_query(self, sql : str, val : tuple = None):
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()
        