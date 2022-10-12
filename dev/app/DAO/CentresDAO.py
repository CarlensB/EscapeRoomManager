# Pour enregistrer les informations des centres sur la base de données

from .ConnectionDAO import ConnexionDAO

class CentresDAO:

    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur
    
    def ajouter_centre(self, *args : tuple[str | int]):
        sql = "INSERT INTO centres (nom, compagnie, adresse, ville, pays, code_postal) VALUES (%s, %s, %s, %s, %s, %s)"
        val = (args)

        if args[0][1]:
            self.curseur.execute(sql, val)
        else:
            self.curseur.executemany(sql, val)
        self.bd.connexion.commit()

    def selectionner_tous_centres(self) -> list:
        sql = "SELECT * FROM centres"
        self.curseur.execute(sql)
        result = self.curseur.fetchall()
        return result