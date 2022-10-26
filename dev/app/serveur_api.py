# Fichier pour aller chercher les informations à afficher sur le site web.
import flask as f
import json

from modele.Modele import GestionSysteme
from flask_utils import HOTE, PORT
from flask import request, render_template, session, redirect


# info test

dict_comp = {
        'nom' : 'escape',
        'info_paiement': 'Visa',
        'courriel' : 'manager@escape.com',
        'mdp' : 'CarlensBelony1!'}

dict_emp = {
    'compagnie' : 2,
    'nom' : 'Guindon',
    'prenom' : 'Maxence',
    'salaire' : 13.75,
    'num_telephone' : '514-207-0088',
    'niveau_acces' : 2,
    'courriel' : 'maxguindon@escape.com',
    'num_ass': 111,
    'mdp' : 'CarlensBelony1!'

}

centre = ('escape', 1, '2000 rue Ontario', 'Montréal', 'Canada', 'H1H 2B2')

class Serveur:
    __app = f.Flask(__name__)
    __app.secret_key = 'ERM'
    __controleur = None
    
    @staticmethod
    def demarrer_serveur() -> None:
        Serveur.__app.run(debug=True, host=HOTE, port=PORT)

    @staticmethod
    def definir_controleur(controleur) -> None:
        Serveur.__controleur = controleur

    @__app.route('/hello')
    def hello_world():
        #http://127.0.0.1:5000/hello
        dict = {'Mot' : "Hello World" }
        return json.dumps(dict)

    @__app.route('/')
    def index():
        return render_template('login.html')

    @__app.route('/<name>', methods=['GET', 'POST'])
    def requete(name):
        if request.method == 'POST':
            session['username'] = 'admin'
            session['acces'] = '4'
            info = (name, request.form['nm'])
            return json.dumps(info)
        else:
            info = request.args.get('nm')
            return name, info

    @__app.route('/session')
    def session():
        return session

        #return json.dumps(name)
        #if request.methods == "POST":
        #     Serveur.__controleur.page[name]
        # result = Serveur.__controleur.enregistrer('compagnie',)
        # result1 = Serveur.__controleur.enregistrer('employe', )
        # json = json.dumps(result, result1)
        # return json
