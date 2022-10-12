# Pour enregistrer les informations des employes sur la base de données
from .ConnectionDAO import ConnexionDAO

class EmployeDAO:
    
    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur

    def ajouter_employe(self, *args : tuple[str | int | float]):
        sql = '''
        INSERT INTO employes (compagnie, centre, nom, prenom, salaire,
        num_telephone, niveau_acces, courriel, num_ass, mot_de_passe)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        val = (args)
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()

    def ajouter_plusieurs_employes(self, *args: tuple[str | int | float]):
        sql = '''
        INSERT INTO employes (compagnie, centre, nom, prenom, salaire,
        num_telephone, niveau_acces, courriel, num_ass, mot_de_passe)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        val = (args)
        self.curseur.executemany(sql, val)
        self.bd.connexion.commit()

    def selectionner_employe(self, *employe : tuple[str]) -> tuple:
        sql = "SELECT * FROM employes WHERE nom = %s AND prenom = %s"
        val = employe
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def selectionner_tout_employes(self) -> tuple:
        sql = "SELECT * FROM employes"
        self.curseur.execute(sql)
        result = self.curseur.fetchall()
        return result

    def selectionner_employe_centre(self, centre: int) -> tuple:
        sql = "SELECT * FROM employes WHERE centre = %s"
        val = centre
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result
