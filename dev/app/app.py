from serveur_api import Serveur
from DAO.CompagniesDAO import CompagniesDAO

def main():
    # ajouter un objet serveur qui contiendra flask
    print('on arrive')
    Serveur.demarrer_serveur()

if __name__=='__main__':
    quit(main())