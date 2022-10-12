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
        
        if args[0][1]:
            self.curseur.execute(sql, val)
        else:
            self.curseur.executemany(sql, val)
        self.bd.connexion.commit()


    def selectionner_employe(self, *employe : tuple[str]) -> list:
        sql = "SELECT * FROM employes WHERE nom = %s AND prenom = %s"
        val = employe
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def selectionner_tout_employes(self) -> list:
        sql = "SELECT * FROM employes"
        self.curseur.execute(sql)
        result = self.curseur.fetchall()
        return result

    def selectionner_employe_centre(self, centre: int) -> list:
        sql = "SELECT * FROM employes WHERE centre = %s"
        val = centre
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result
