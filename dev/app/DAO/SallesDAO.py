# Pour enregistrer les informations des salles sur la base de données
from .ConnectionDAO import ConnexionDAO

class SallesDAO:
    
    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur

    def ajouter(self, args : tuple[str | str | int | int | float ]):
        sql = '''
        INSERT INTO salles (nom, description, centre, nb_max_joueur, prix_unitaire)
        VALUE(%s, %s, %s, %s, %s)
        '''
        val = (args)
        self.__execute_query(sql, val)

    def supprimer(self, salle: int) -> None:
        sql = "DELETE FROM salles WHERE id = %s"
        val = (salle,)
        self.__execute_query(sql, val)

    def selectioner(self, compagnie : int) -> list:
        sql = "SELECT * FROM view_salles_compagnie WHERE id_compagnie = %s"
        val = (compagnie,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result

    def ajouter_horaire(self, args : tuple[int, int]):
        sql = "INSERT INTO hor_salle(id_horaire, id_salle) VALUES( %s, %s)"
        val = (args)
        self.__execute_query(sql, val)

    def __execute_query(self, sql : str, val : tuple = None):
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()