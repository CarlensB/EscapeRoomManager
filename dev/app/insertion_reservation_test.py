# ===============================================
# Nom du fichier : insertion_reservation_test.py
# Ce fichier permet d'insérer des réservations aléatoires
# à la compagnie voulue.
# Auteur : Maxence Guindon
# Équipe : Carlens Belony et Maxence Guindon
# ===============================================

import csv
from random import randint
from datetime import datetime
from modele.actionDAO import ActionDAO

class CreationResarvationTest:
    def __init__(self) -> None:
        self.nom = []
        self.prenom = []
        self.dao = ActionDAO()
        self.get_name()
        
        
    def get_name(self):
        with open("dev/app/banqueNom.txt", encoding="utf-8") as file:
            csv_reader = csv.reader(file, delimiter=",")
            for row in csv_reader:
                self.nom.append(row[0])
                self.prenom.append(row[1])
                self.prenom.append(row[2])
                self.date_keep_trace = []
                
    def build_name(self) -> str:
        prenom = self.prenom[randint(0, len(self.prenom)-1)]
        nom = self.nom[randint(0, len(self.nom)-1)]
        return " ".join((prenom, nom))
        
    def create_reservation(self, id_compagnie, date_debut: tuple[int, int, int], date_fin: tuple[int, int, int] = (2023, 3,30)):
        reservation = ["nom", "num_telephone", "statut_reservation", "salle", "nb_personne", "courriel", "prix_total", "date"]
        horaire_salle = []
        salle = []
        horaire = ""
        # Get salle
        
        centres = self.dao.requete_dao(self.dao.Requete.SELECT_ALL, self.dao.Table.CENTRE, [(id_compagnie,)])
        for idx in centres:
            for s in self.dao.requete_dao(self.dao.Requete.SELECT_ALL, self.dao.Table.SALLE, [(idx[0],)]):
                salle.append(s)
     
        # Get horaire
        for s in salle:
            horaire_salle.append(self.dao.requete_dao(ActionDAO.Requete.SELECT_ALL, ActionDAO.Table.HORAIRE, [(s[1],)]))
                
        # Get name
        reservation[0] = self.build_name()
        
        # Get num_telephone
        reservation[1] = f"514-{randint(100,999)}-{randint(1000,9999)}"
        
        # Get statut_reservation
        reservation[2] = randint(0,1)
        
        # Get salle
        salle_active = salle[randint(0, len(salle)-1)]
        reservation[3] = salle_active[0]
        
        # Get Personne
        reservation[4] = randint(2,salle_active[4])
        
        # Get courriel
        reservation[5] = "".join(reservation[0].split(" "))+"@courriel.com"
        
        # Get Prix_total
        reservation[6] = reservation[4] * salle_active[5]
        
        # Getdate
        for h in horaire_salle:
            if h[0][0] == salle_active[0]:
                horaire = h
                break
        
        time = horaire[randint(0, len(horaire)-1)]
        hd = time[2].split("h")
        year = randint(date_debut[0], date_fin[0])
        
        info_unique_reservation = self.create_schedule(year, date_debut, date_fin, hd, reservation, salle_active)
        
        while info_unique_reservation in self.date_keep_trace:
            info_unique_reservation = self.create_schedule(year, date_debut, date_fin, hd, reservation, salle_active)
            
        self.date_keep_trace.append(info_unique_reservation)
        return tuple(reservation)
    
    def create_schedule(self, year, date_debut, date_fin, hd, reservation, salle_active):
        if year == date_debut[0]:
            month = randint(date_debut[1],12)
        else:
            month = randint(1, date_fin[1])
            
        if month == 2:
            day_max =28
        else:
            day_max = 30
            
        if hd[1] != "":
            reservation[7] = datetime(year, month, randint(1,day_max), int(hd[0]), int(hd[1]) )
        else:
            reservation[7] = datetime(year, month, randint(1,day_max), int(hd[0]))
            
        return (salle_active[3], salle_active[1], reservation[7])
        
    
    def enter_reservation_bd(self, id_compagnie, date_debut: tuple[int, int, int] = (2022, 9, 1), date_fin: tuple[int, int, int] = (2023, 3,30), nb_reservation: int = 1):
        reservation = [0]*nb_reservation
        for i in range(nb_reservation):
            reservation[i] = self.create_reservation(id_compagnie, date_debut, date_fin)
        self.dao.requete_dao(self.dao.Requete.INSERT, self.dao.Table.RESERVATION, reservation)
            
    def get_reservation(self, id_compagnie):
        result = self.dao.requete_dao(ActionDAO.Requete.SELECT_ALL, ActionDAO.Table.RESERVATION,[(id_compagnie,)])
        self.date_keep_trace = [(r[11], r[3], r[4]) for r in result]

def main():
    crt = CreationResarvationTest()
    crt.get_reservation(id_compagnie=1)
    crt.enter_reservation_bd(1, (2022, 12, 1), (2023,1,8), nb_reservation=550)
    print("done")
    
if __name__ == '__main__':
    quit(main())
            