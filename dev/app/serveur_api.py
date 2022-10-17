# Fichier pour aller chercher les informations à afficher sur le site web.
import flask as f
import json

from matplotlib.font_manager import json_dump
from flask_utils import HOTE, PORT

class Serveur:
    __app = f.Flask(__name__)

    @staticmethod
    def demarrer_serveur():
        Serveur.__app.run(debug=True, host=HOTE, port=PORT)

    @__app.route('/hello')
    def hello_world():

        dict = {'Mot' : "Hello World" }
        return json.dumps(dict)
    
