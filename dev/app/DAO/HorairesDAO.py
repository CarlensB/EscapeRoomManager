# Pour enregistrer les informations des horaires sur la base de données
from .ConnectionDAO import ConnexionDAO

class HorairesDAO:
    
    def __init__(self) -> None:
        self.bd = ConnexionDAO()
        self.curseur = self.bd.curseur

    def ajouter_horaire(self, *args : tuple[int | str | str | str]):
        sql = '''
        INSERT INTO horaires (salle, heure_debut, heure_fin, intervalle)
        VALUES(%s, %s, %s, %s)
        '''
        val = (args)
        self.curseur.execute(sql, val)
        self.bd.connexion.commit()

    def selectionner_horaire(self, salle : int) -> tuple:
        sql = "SELECT * FROM horaires WHERE salle = %s"
        val = (salle,)
        self.curseur.execute(sql, val)
        result = self.curseur.fetchall()
        return result