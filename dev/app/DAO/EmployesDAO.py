# Pour enregistrer les informations des employes sur la base de données
class EmployeDAO:
    
    def __init__(self, bd) -> None:
        self.__bd = bd
        self.__curseur = self.__bd.curseur
        self.__fonction ={
            'ajouter': self.ajouter,
            'selectionner': self.selectionner,
            'supprimer': self.supprimer,
            'selectionner_all': self.selectionner_all,
            'modifier': self.modifier,
            'lier': self.lier
        }

    @property
    def fonction(self):
        return self.__fonction

    def ajouter(self, args: list[tuple[int, str, str, float, str, int, str, int, str]]) -> None:
        sql = '''
        INSERT INTO employes (compagnie, nom, prenom, salaire,
        num_telephone, niveau_acces, courriel, num_ass, mot_de_passe)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        '''
        val = args
        self.__execute_query(sql, val)
        
    def supprimer(self, employe: list[tuple[int]]) -> None:
        sql="DELETE FROM employes WHERE id = %s"
        val= employe
        self.__execute_query(sql, val)

    def selectionner(self, employe : list[tuple[int]]) -> list:
        sql = "SELECT * FROM employes WHERE courriel= %s"
        val = employe[0]
        return self.__select(sql, val)

    def selectionner_all(self, compagnie : list[tuple[int]]) -> list:
        sql = "SELECT * FROM employes WHERE compagnie = %s"
        val = compagnie[0]
        return self.__select(sql, val)

    def modifier(self, args: list[tuple[str]]) -> None:
        sql = '''
        UPDATE employes
            SET compagnie= %s, nom= %s, prenom= %s, salaire= %s,
                    num_telephone= %s, niveau_acces= %s, courriel= %s,
                    num_ass= %s, mot_de_passe= %s
                WHERE id= %s
        '''
        val = args
        self.__execute_query(sql, val)

    def lier(self, liste_id: list[tuple[int, int]]) -> None:
        '''
        Le tuple doit contenir les ids de l'employé
        et du centre où il travail
        '''
        sql = '''
        INSERT INTO emp_cent(id_emp, id_centre)
        VALUES(%s, %s)
        '''
        val = liste_id
        self.__execute_query(sql, val)

    def __select(self, sql: str, val: tuple) -> list:
        self.__curseur.execute(sql, val)
        result = self.__curseur.fetchall()
        return result

    def __execute_query(self, sql : str, val : tuple = None) -> None:
        self.__curseur.executemany(sql, val)
        self.__bd.connexion.commit()