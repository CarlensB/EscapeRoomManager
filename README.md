# Escape Room Manager

## Sommaire
Escape Room Manager est un logiciel web de gestion des horaires et réservations d'une entreprise de jeux d'évasions. L'applications fournis également une fonctionnalités pour bâtir des horaires automatiquement ainsi qu'une page permettant de consulté les indicateurs de performance d'une activtés.

#### Ce projet est présenté par les étudiant suivant :
Carlens Belony et Maxence Guindon

## Installation

Pour pouvoir utiliser l'application, il y a certaines dépendance qu'il faut installer.

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

Également, la base de données que nous utilisons est MySql. Il est possible de faire une installation local pour l'utiliser comme base de données en contexte de développememt. Il faudra alors simplement modifier le fichier UTILS.py. [UTILS.py](/dev/app/DAO/UTILS.py)

![Image montrant les information utilisable dans UTILS](/C61/Sprint3/doc/MySQL_UTILS.PNG)

```python
USER = "erm_user"
HOTE = "127.0.0.1"
MDP  = "Votre mot de passe"
DB= "ERM_DB"
```

Également, le script sql sql_query_do.sql devra être exécuté pour avoir les tables, les vues et les autres outils utilisés dans la base de données pour le projet. Il est situé ici : [sql_query_do.sql](/C61/Sprint1/doc/sql/sql_query_do.sql)

## Utilisation
Expliquer comment utiliser le projet.
Capture d'écran si possible

## Références
Indiquer les références et sources

## Contact
(optionnelle)

## Remerciement
Nous tenons à remercier Pierre-Paul Monty et Frédéric Thériault qui ont généreusement répondu à nos questions tout au long du projet synthèse. Grâce à eux nous avons pu relever le niveau de notre application sur plusieurs niveaux.

## Licence
To the extent possible under law, Carlens Belony, Maxence Guindon has waived all copyright and related or neighboring rights to this work. (exemple, voir avec le cégep)



