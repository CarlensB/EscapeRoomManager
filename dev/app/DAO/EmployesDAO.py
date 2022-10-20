# Pour enregistrer les informations des employes sur la base de données
from .ConnectionDAO import ConnexionDAO

class EmployeDAO:
    
    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur

    def ajouter(self, *args : tuple[ int | str | str | float | str | int | str | int | str]):
        sql = '''
        INSERT INTO employes (compagnie, nom, prenom, salaire,
        num_telephone, niveau_acces, courriel, num_ass, mot_de_passe)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        val = (args)
        self.__execute_query(sql, val)
        
    def supprimer(self, employe: int) ->None:
        sql="DELETE FROM employes WHERE id = %s"
        val= (employe,)
        self.__execute_query(sql, val)

    def selectionner(self, *employe : tuple[str]) -> list:
        sql = "SELECT * FROM employes WHERE nom = %s AND prenom = %s"
        val = (employe)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def selectionner_all(self, compagnie : int) -> list:
        sql = "SELECT * FROM employes WHERE compagnie = %s"
        val = (compagnie,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def __execute_query(self, sql : str, val : tuple = None):
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()