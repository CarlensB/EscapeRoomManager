# Fichier pour aller chercher les informations à afficher sur le site web.
import json

from modele.Modele import GestionSysteme
from flask_utils import HOTE, PORT
from flask import Flask, request, render_template, session, redirect


# info test



centre = ('escape', 1, '2000 rue Ontario', 'Montréal', 'Canada', 'H1H 2B2')

class Serveur:
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
        #http://127.0.0.1:5000/hello
        dict = {'Mot' : "Hello World" }
        return json.dumps(dict)

    @__app.route('/')
    def index():
        return render_template('login.html')
    
    
# Pour la connexion et l'enregistrement de nouvelle compagnie ou employe
    
    @__app.route('/validation', methods=['GET', 'POST'])
    def validation():
        if request.method != 'GET':
            info = request.form['nm']
            result = Serveur.__controleur.valider_connexion(info)
            return json.dumps(info)
        
    @__app.route('/enregistrement/<name>', methods=['GET', 'POST'])
    def enregistrement(name):
        if request.method != 'GET':
            info = request.form['nm']
            result = Serveur.__controleur.enregistrer(name, info)
            return json.dumps(info)


# insert et select pour la bd
    @__app.route('/insert/<table>', methods=['GET', 'POST'])
    def insert(table):
        if request.method == 'POST':
            info = request.form
            print(info)
            #print(info['nom'])
            result = Serveur.__controleur.inserer(table, info)
            return json.dumps(result)
        else:
            return json.dumps("GET request are ignored")
        
    @__app.route('/select/<name>', methods=['GET', 'POST'])
    def select(name):
        if request.method == 'POST':
            info = (name, request.form['nm'])
            return json.dumps(info)
        else:
            return json.dumps("GET request are ignored")


    # Pour avoir accès au variable de session
    @__app.route('/session')
    def session():
        return session