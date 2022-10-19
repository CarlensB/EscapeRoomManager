from DAO.CompagniesDAO import CompagniesDAO
from DAO.TypeClientsDAO import TypeClientsDAO
from DAO.CentresDAO import CentresDAO
from DAO.EmployesDAO import EmployeDAO
from DAO.HorairesDAO import HorairesDAO
from DAO.RabaisDAO import RabaisDAO
from DAO.ReservationsDAO import ReservationsDAO
from DAO.SallesDAO import SallesDAO

class ActionDAO:

    @staticmethod
    def test_insertion():
        # Test pour compagnie
        id_compagnie = None
        id_centre = None
        id_salle = None
        id_horaire = None
        try:
            com = CompagniesDAO()
            com.ajouter_compagnie('MaxEscape', '8888 9999 9010 2040', 'manager@maxescape.com', 'maxescape1')
            id_compagnie = com.selectionner_compagnie('MaxEscape')[0][0]
            print('succès d\'insertion compagnie')
        except:
            print('echec d\'insertion compagnie')

        # Test pour centre
        try:
            c = CentresDAO()
            c.ajouter_centre('MaxEscape', id_compagnie, '255 rue Ontario', 'Montréal', 'Canada', 'H1Z 5B7')
            id_centre = c.selectionner_tous_centres(id_compagnie)[0][0]
            print('succès d\'insertion centre')
        except:
            print('echec d\'insertion centre')

        # Test pour horaire
        try:
            h = HorairesDAO()
            h.ajouter_horaire('9h', '20h')
            id_horaire = h.selectionner_horaire('9h', '20h')[0][0]
            print('succès d\'insertion horaire')
        except:
            print('echec d\'insertion horaire')

        # Test pour salle
        try:
            s = SallesDAO()
            s.ajouter_salle('salle1', 'desc salle1', id_centre, 6, 24.99)
            id_salle = s.selectionner_salles_centres(id_centre)[0][0]
            s.ajouter_horaire(id_horaire, id_salle)

            print('succès d\'insertion salle')
        except:
            print('echec d\'insertion salle')

        # Test pour rabais
        try:
            r = RabaisDAO()
            r.ajouter_rabais('rabais1', 0.25, id_compagnie, 0, "2022-12-12")
            print('succès d\'insertion rabais')
        except:
            print('echec d\'insertion rabais')

        # Test pour typeclient
        try:
            tc = TypeClientsDAO()
            tc.ajouter_type_client('Enfant', 19.99, id_compagnie)
            print('succès d\'insertion typeclient')
        except:
            print('echec d\'insertion typeclient')

        # Test pour employe
        try:
            e = EmployeDAO()
            e.ajouter_employe(id_compagnie, 'Gourde', 'Yanni', 35.48, '514-222-3333', 1, 'ygourde@maxescape.com', 123, 'gourde1')
            id_e = e.selectionner_employe('Gourde', 'Yanni')[0][0]
            e.ajouter_employe_centre(id_e,id_centre)
            print('succès d\'insertion employe')
        except:
            print('echec d\'insertion employe')

        # Test pour reservation
        try:
            r = ReservationsDAO()
            r.ajouter_reservation('Claude Lortie', 514, 1, id_salle, 2, 'lortie@email.com', '11h30', 57.49, "2022-12-12 11:30")
            print('succès d\'insertion reservation')
        except:
            print('echec d\'insertion reservation')

    @staticmethod
    def test_suppression_selection():
        com = CompagniesDAO()
        s = SallesDAO()
        c_result = com.selectionner_compagnie('MaxEscape')
        id_compagnie = c_result[0][0]
        id_salle = s.selectioner_tous_salles(id_compagnie)[0][1]

        # Test pour rabais
        try:
            r = RabaisDAO()
            result = r.selectionner_tous_rabais(id_compagnie)
            id_r = result[0][0]
            r.supprimer_rabais(id_r)
            print('succès suppression rabais')
            print(f'succès sélection : {result}')
        except:
            print('echec suppression rabais')

        # Test pour typeclient
        try:
            tc = TypeClientsDAO()
            result = tc.selectionner_tous_type_client(id_compagnie)
            id_tc = result[0][0]
            tc.supprimer_type_client(id_tc)
            print('succès suppression typeclient')
            print(f'succès sélection : {result}')
        except:
            print('echec suppression typeclient')

        # Test pour employe
        try:
            e = EmployeDAO()
            result = e.selectionner_tout_employes(id_compagnie)
            id_e = result[0][0]
            e.supprimer_employe(id_e)
            print('succès suppression employe')
            print(f'succès sélection : {result}')
        except:
            print('echec suppression employe')

        # Test pour reservation
        try:
            r =ReservationsDAO()
            result = r.selectionner_tous_reservations(id_salle)
            id_r = result[0][0]
            r.supprimer_reservation(id_r)
            print('succès suppression reservation')
            print(f'succès sélection : {result}')
        except:
            print('echec suppression reservation')

        # Test pour salle
        try:
            s = SallesDAO()
            result = s.selectioner_tous_salles(id_compagnie)
            s.supprimer_salle(id_salle)
            print('succès suppression salle')
            print(f'succès sélection : {result}')
        except:
            print('echec suppression salle')

        # Test pour horaire
        try:
            h = HorairesDAO()
            result = h.selectionner_horaire('9h', '20h')
            id_h = result[0][0]
            h.supprimer_horaire(id_h)
            print('succès suppression horaire')
            print(f'succès sélection : {result}')
        except:
            print('echec suppression horaire')

        #Test pour centre
        try:
            c = CentresDAO()
            result = c.selectionner_tous_centres(id_compagnie)
            id_centre = result[0][0]
            c.supprimer_centre(id_centre)
            print('succès suppression centre')
            print(f'succès sélection : {result}')
        except:
            print('echec suppression centre')

            # Test pour compagnie
        try:
            com.supprimer_compagnie(id_compagnie)
            print('succès suppression compagnie')
            print(f'succès sélection : {c_result}')
        except:
            print('echec suppression compagnie')