# Pour enregistrer les informations des salles sur la base de données
from .ConnectionDAO import ConnexionDAO

class SallesDAO:
    
    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur

    def ajouter_salle(self, *args : tuple[str | str | int | int |int | float | str]):
        sql = '''
        INSERT INTO salles (nom, description, centre, nb_max_joueur, prix_unitaire, _duree)
        VALUE(%s, %s, %s, %s, %s, %s)
        '''
        val = (args)

        if args[0][1]:
            self.curseur.execute(sql, val)
        else:
            self.curseur.executemany(sql, val)
        self.bd.connexion.commit()

    def selectioner_tous_salles(self) -> list:
        sql = "SELECT * FROM salles"
        self.curseur.execute(sql)
        result = self.curseur.fetchall()
        return result