# Pour enregistrer les informations des rabais sur la base de données
from .ConnectionDAO import ConnexionDAO

class RabaisDAO:
    
    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur

    def ajouter_rabais(self, *args : tuple[str | float | int | int | int | str]):
        sql = '''
        INSERT INTO rabais (nom, pourcentage, compagnie, isActive, date_fin)
        VALUES (%s, %s, %s, %s, %s)
        '''
        val = (args)

        if args[0][1]:
            self.curseur.execute(sql, val)
        else:
            self.curseur.executemany(sql, val)
        self.bd.connexion.commit()

    def selectionner_rabais(self, rabais : str) -> list:
        sql = "SELECT * FROM rabais WHERE nom = %s"
        val = (rabais,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def selectionner_tous_rabais(self) -> list:
        sql = "SELECT * FROM rabais"
        self.curseur.execute(sql)
        result = self.curseur.fetchall()
        return result
