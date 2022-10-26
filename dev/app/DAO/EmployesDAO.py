# Pour enregistrer les informations des employes sur la base de données
class EmployeDAO:
    
    def __init__(self, bd) -> None:
        self.bd = bd
        self.curseur = self.bd.curseur

    def ajouter(self, args : tuple[ int | str | str | float | str | int | str | int | str]) -> None:
        sql = '''
        INSERT INTO employes (compagnie, nom, prenom, salaire,
        num_telephone, niveau_acces, courriel, num_ass, mot_de_passe)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        val = (args)
        self.__execute_query(sql, val)
        
    def supprimer(self, employe: int) -> None:
        sql="DELETE FROM employes WHERE id = %s"
        val= (employe,)
        self.__execute_query(sql, val)

    def selectionner(self, employe : tuple[str]) -> list:
        if len(employe) > 1:
            sql = "SELECT * FROM employes WHERE nom = %s AND prenom = %s"
            val = (employe)
        else:
            sql = "SELECT * FROM employes WHERE courriel = %s"
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

    def modifier(self, table: tuple[str], val: tuple[str]):
        pass

    def lier(self, args: tuple) -> None:
        # le tuple doit contenir les ids de l'employé et du centre où il travail
        sql = '''
        INSERT INTO emp_cent(id_emp, id_centre)
        VALUES(%s, %s)
        '''
        val = (args)
        self.__execute_query(sql, val)

    def __execute_query(self, sql : str, val : tuple = None) -> None:
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()