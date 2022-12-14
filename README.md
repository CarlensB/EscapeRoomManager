# Escape Room Manager

## Sommaire
Escape Room Manager est un logiciel web de gestion des horaires et réservations d'une entreprise de jeux d'évasions. L'applications fournis également une fonctionnalités pour bâtir des horaires automatiquement ainsi qu'une page permettant de consulté les indicateurs de performance d'une activtés.

#### Ce projet est présenté par les étudiant suivant :
Carlens Belony et Maxence Guindon

## Installation

Pour pouvoir utiliser l'application, il y a certaines dépendance qu'il faut installer. Toutefois, le fichier dependancy.py permet l'installation des librairies nécessaires au projet python par le programme lui-même. Toutefois, si cela ne fonctionnait pas, il est possible de les installer simplement avec un pip install.

### Librairie externe utilisé en python
- Bcrypt
- MySqlConnector

Pour installer Bcrypt et MySqlConnector

```bash
pip install bcrypt
pip install mysql-connector-python

# Sur un ordinateur du cégep
python pip.exe install bcrypt
python pip.exe install mysql-connector-python
```

### CORS
Finalement, il faut installer l'extension CORS unblock sur le navigateur utilisé pour permettre à React et Flask d'utiliser le même port. Autrement, il ne sera pas possible d'aller chercher les informations du site via Flask. [CORS](https://chrome.google.com/webstore/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino)

![Image montrant CORS dans le chrome Web Store](/C61/Sprint3/doc/cors.PNG)

### Live Server
Pour faciliter les tests sur notre site, vous pouvez installer Live Server via VsCode.

![Image de la page de live serveur](/C61/Sprint3/doc/LiveServer.PNG)


### Base de donnée

La base de données que nous utilisons est MySql. Il est possible de faire une installation local pour l'utiliser comme base de données en contexte de développememt. Il faudra alors simplement modifier le fichier UTILS.py. [UTILS.py](/dev/app/DAO/UTILS.py)

![Image montrant les information utilisable dans UTILS](/C61/Sprint3/doc/MySQL_UTILS.PNG)

```python
USER = "erm_user"
HOTE = "127.0.0.1"
MDP  = "Votre mot de passe"
DB= "ERM_DB"
```

Dans le dossier sql sous dev, il y les scripts à exécuter pour avoir une base de donnée fonctionnel. Le script sql_query_do.sql est chargé de la création de la base de données, des différentes tables, des vues et les autres outils utilisés dans la base de données pour le projet. Il est situé ici : [sql_query_do.sql](/dev/sql/sql_query_do.sql)

Dans le même dossier, le script compagnie_test permet d'insérer une compagnie de test avec différentes informations pour faire des tests avec la base de données. Il est disponible ici : [compagnie_test.sql](/dev/sql/compagnie_test.sql)


## Utilisation
Pour utiliser l'application la première chose à faire est démarrer l'application. Vous pouvez le démarrer soit en utilisant vscode avec controle f5 ou vous pouvez ouvrir une commande cmd et lancer le serveur à partir de là.
<br>

![image](/C61/Sprint3/doc/Lancement_du_serveur.PNG)

Ensuite, vous pouvez aller vous connecter sur notre site à cette adresse [Page d'Accueil](http://127.0.0.1:5500/dev/FrontEnd/public/login.html)

Vous pouvez utiliser le compte par défaut de la compagnie test pour vous connecter soit bonjour@courriel.com et le mot de passe suivant testAndroid18!@.

Pour créer une nouvelle compagnie appuyer sur créer un compte. On vous demandera les informations suivantes :
- Le courriel de la compagnie;
- Le nom de la compagnie;
- Le mot de passe de la compagnie

![Page Register](/C61/Sprint3/doc/register.PNG)

Soyez conscient qu'un mot de passe doit correspondre à une liste de critère. Soit les suivants:
- 12 caractères minimums;
- une majuscule au minimum;
- une minuscule au minimum;
- un chiffre au minimum;
- un caractère spécial au minimum;

Une fois que vous avez une compagnie de créer, il vous sera possible de modifier les informations relative à votre premier centre. Il vous sera aussi possible de rajouter des salles ainsi qu'un horaire à ceux-ci.

Sur la page montrant les plages horaires des salles, il est possible d'ajouter ou de modifier une réservation en plus de voir celle qui sont réservé et celle qui sont libre.

Dans gérer succursale, il vous sera possible d'ajouter une succursale au besoin ou une nouvelle salle. Pour une nouvelle salle, vous aurez d'autres onglet à remplir.

![Image création de salle](/C61/Sprint3/doc/SalleMdoif.PNG)

Il est également possible de créer un horaire automatiquement à une salle et le modifier si besoin.

Sur la page rapport vous pourrez consulter les statistiques sur les performances de vos salles.


## Références
Indiquer les références et sources

## Remerciement
Nous tenons à remercier Pierre-Paul Monty et Frédéric Thériault qui ont généreusement répondu à nos questions tout au long du projet synthèse. Grâce à eux nous avons pu relever le niveau de notre application sur plusieurs niveaux.

## Licence
To the extent possible under law, Carlens Belony, Maxence Guindon has waived all copyright and related or neighboring rights to this work. (exemple, voir avec le cégep)



