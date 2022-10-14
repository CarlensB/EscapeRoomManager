# Pour enregistrer les informations des employes sur la base de données
from .ConnectionDAO import ConnexionDAO

class EmployeDAO:
    
    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur

    def ajouter_employe(self, *args : tuple[ int | str | str | float | str | int | str | int | str]):
        sql = '''
        INSERT INTO employes (compagnie, nom, prenom, salaire,
        num_telephone, niveau_acces, courriel, num_ass, mot_de_passe)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        val = (args)
        self.execute_query(sql, val)
        
    def ajouter_employe_centre(self, *args : tuple[ int | int]):
        # le tuple doit contenir les ids de l'employé et du centre où il travail
        sql = '''
        INSERT INTO emp_cent(id_emp, id_centre)
        VALUES(%s, %s)
        '''
        val = (args)
        self.execute_query(sql, val)
    
    def supprimer_employe(self, employe: int) ->None:
        sql="DELETE FROM employes WHERE id = %s"
        val= (employe,)
        self.execute_query(sql, val)

    def selectionner_employe(self, *employe : tuple[str]) -> list:
        sql = "SELECT * FROM employes WHERE nom = %s AND prenom = %s"
        val = (employe)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def selectionner_tout_employes(self, compagnie : int) -> list:
        sql = "SELECT * FROM employes WHERE compagnie = %s"
        val = (compagnie,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def selectionner_employe_centre(self, centre: int) -> list:
        sql = "SELECT * FROM view_employes_lieu WHERE centre = %s"
        val = (centre,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def execute_query(self, sql : str, val : tuple = None):
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()