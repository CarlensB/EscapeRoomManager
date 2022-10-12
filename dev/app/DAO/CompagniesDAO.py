# Pour enregistrer les informations des compagnies sur la base de données
from .ConnectionDAO import ConnexionDAO

class CompagniesDAO:

    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur
    
    def ajouter_compagnie(self, *args : tuple[str]):
        sql = "INSERT INTO compagnies (nom, info_paiement, courriel, mot_de_passe) VALUES (%s, %s, %s, %s)"
        val = (args)
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()

    def selectionner_compagnie(self, compagnie : str) -> tuple:
        sql = "SELECT * from compagnies WHERE nom = %s"
        val = (compagnie,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result
        