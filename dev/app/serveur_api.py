# Fichier pour aller chercher les informations à afficher sur le site web.
import flask as f
import json
from flask_utils import HOTE, PORT

class Serveur:
    __app = f.Flask(__name__)

    @staticmethod
    def demarrer_serveur():
        Serveur.__app.run(debug=True, host=HOTE, port=PORT)

    @__app.route('/hello')
    def hello_world():
        #http://127.0.0.1:5000/hello
        dict = {'Mot' : 'Hello World'}
        return json.dump(dict)
