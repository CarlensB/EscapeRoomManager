# Fichier pour aller chercher les informations à afficher sur le site web.
import json

from modele.Modele import GestionSysteme
from flask_utils import HOTE, PORT
from flask import Flask, request, render_template, session, redirect

class Serveur():
    __app = Flask(__name__)
    __app.secret_key = 'ERM'
    __controleur = None

    @staticmethod
    def demarrer_serveur() -> None:
        Serveur.__app.run(debug=True, host=HOTE, port=PORT)

    @staticmethod
    def definir_controleur(controleur) -> None:
        Serveur.__controleur = controleur

    #  test

    @__app.route('/hello')
    def hello_world():
        # http://127.0.0.1:5000/hello
        dict = {'Mot': "Hello World"}
        return json.dumps(dict)

    @__app.route('/')
    def index():
        return render_template('login.html')

    # Pour la connexion et l'enregistrement de nouvelle compagnie ou employe

    @__app.route('/validation', methods=['GET', 'POST'])
    def validation():
        if request.method == 'POST':
            info = request.form
            result = Serveur.__controleur.valider_connexion(info)
            return json.dumps(result)

    @__app.route('/enregistrement/<name>', methods=['GET', 'POST'])
    def enregistrement(name):
        if request.method == 'POST':
            info = request.form['nm']
            result = Serveur.__controleur.enregistrer(name, info)
            return json.dumps(result)

    # insert et select pour la bd
    @__app.route('/<action>/<table>', methods=['GET', 'POST'])
    def insert(action, table):
        if request.method == 'POST':
            info = request.form
            result = Serveur.__controleur.interaction_dao(action, table, info)
            return json.dumps(result)
        else:
            info = request.form
            result = Serveur.__controleur.interaction_dao(action, table, info)
            return json.dumps(result)
            #return json.dumps("GET request are ignored")

    # Pour avoir accès au variable de session
    @__app.route('/session')
    def session():
        return session
