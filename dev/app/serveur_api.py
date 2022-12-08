# Fichier pour aller chercher les informations à afficher sur le site web.
from datetime import datetime
import json
import re

from modele.Modele import GestionSysteme
from flask_utils import HOTE, PORT
from flask import Flask, request, render_template, session, redirect

class Serveur():
    __app = Flask(__name__)
    __app.secret_key = 'ERM'
    __controleur = None
    __GET_MSG = "GET request are ignored"

    @staticmethod
    def demarrer_serveur() -> None:
        Serveur.__app.run(debug=True, host=HOTE, port=PORT)

    @staticmethod
    def definir_controleur(controleur) -> None:
        Serveur.__controleur = controleur
        
    @staticmethod
    def rendre_json_compatible(obj: any):
        # ce code est inspiré de cette source :
        # https://stackoverflow.com/questions/11875770/how-to-overcome-datetime-datetime-not-json-serializable
        '''
        Rendre les objets datetime json seriazible
        '''
        if isinstance(obj, datetime):
            return obj.isoformat()
        raise TypeError ("Type %s not seriazible" %type(obj))
        


    # Pour la connexion et l'enregistrement de nouvelle compagnie ou employe

    @__app.route('/validation', methods=['GET', 'POST'])
    def validation():
        if request.method == 'POST':
            info = request.form
            result = Serveur.__controleur.valider_connexion(info)
            if result[0]:
                session["token"] = result[2]
                session["id_compagnie"] = result[3]
                session["niv_acces"] = result[4]
                print('test', session)
            return json.dumps(result)

    @__app.route('/enregistrement/<name>', methods=['GET', 'POST'])
    def enregistrement(name):
        if request.method == 'POST':
            info = request.form
            result = Serveur.__controleur.enregistrer(name, info)
            return json.dumps(result)
        else:
            return json.dumps(Serveur.__GET_MSG)

    @__app.route('/creation/horaire', methods=['GET', 'POST'])
    def creation_horaire():
        if request.method == 'POST':
            info = request.form.to_dict()
            result = Serveur.__controleur.creation_horaire(info=info)
            return json.dumps(result)
        else:
            return json.dumps(Serveur.__GET_MSG)

    # insert et select pour la bd
    @__app.route('/<action>/<table>', methods=['GET', 'POST'])
    def execute(action, table):

        if request.method == 'POST':
            info = request.form.to_dict()
            token = session["token"] #info[0]
            result = Serveur.__controleur.interaction_dao(token, action, table, info)
            return json.dumps(result, default=Serveur.rendre_json_compatible)
        else:
            return json.dumps(Serveur.__GET_MSG)

    # Pour avoir accès au variable de session
    @__app.route('/session', methods=['GET', 'POST'])
    def session():
        if request.method == 'POST':
            return session
    
    # Pour avoir accès aux centres de l'usager connecté SEULEMENT SI la connection a été établie
    @__app.route('/id_connection')
    def id_connection():
        user = Serveur.__controleur.utilisateur
        print(user)
        if user is not None:
            result = (Serveur.__controleur.interaction_dao("selectionner_all", "centre",{"id":user.id_compagnie}), user.__dict__)
            print(result)
            if len(result) > 0:
                return json.dumps(result)
            else: return json.dumps(user)
        else:
            return json.dumps(False)
        
    # Pour se déconnecter
    @__app.route('/deconnecter', methods=['GET', 'POST'])
    def deconnecter():
        print(Serveur.__controleur.utilisateurs.keys())
        if request.method == 'POST' or request.method == 'GET':
            retour = Serveur.__controleur.deconnecter_id(session["token"])
            session.pop("token", None)
            session.pop("id_compagnie", None)
            session.pop("niv_acces", None)
            return json.dumps(retour)
        
    # API pour les sites externes de nos clients     
    @__app.route("/api/compagnie_info/<id_compagnie>", methods=["GET", "POST"])
    def api(id_compagnie):
        if request.method == "POST":
            resultat = Serveur.__controleur.api(id_compagnie)
            return json.dumps(resultat, default=Serveur.rendre_json_compatible)
        
    @__app.route("/api/reservation", methods=["GET", "POST"])
    def api_reservation():
        if request.method == "POST":
            info = request.form.to_dict()
            resultat = Serveur.__controleur.interaction_dao(None, "ajouter", "reservation", info)
            return json.dumps(resultat)
        
    # fonction pour le site permettant de montrer l'intégration sur le site d'un client
    @__app.route("/showcase", methods=["GET", "POST"])
    def showcase():
        if request.method == "POST":
            resultat = Serveur.__controleur.renvoi_compagnie()
            return json.dumps(resultat)
