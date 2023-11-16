# Escape Room Manager

## Sommaire
Escape Room Manager est un logiciel web de gestion des horaires et réservations d'une entreprise de jeux d'évasions. L'application fournit également une fonctionnalité pour bâtir des horaires automatiquement ainsi qu'une page permettant de consulter les indicateurs de performance d'une activité.

#### Ce projet est présenté par les étudiants suivant :
Carlens Belony et Maxence Guindon

## Installation

Pour pouvoir utiliser l'application, il y a certaines dépendances qu'il faut installer. Toutefois, le fichier dependancy.py permet l'installation des librairies nécessaires au projet python par le programme lui-même. Toutefois, si cela ne fonctionnait pas, il est possible de les installer simplement avec un pip install.

### Librairie externe utilisée en python
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


### Base de données

La base de données que nous utilisons est MySql. Il est possible de faire une installation locale pour l'utiliser comme base de données en contexte de développement. Il faudra alors simplement modifier le fichier UTILS.py. [UTILS.py](/dev/app/DAO/UTILS.py)

![Image montrant les informations utilisables dans UTILS](/C61/Sprint3/doc/MySQL_UTILS.PNG)

```python
USER = "erm_user"
HOTE = "127.0.0.1"
MDP  = "Votre mot de passe"
DB= "ERM_DB"
```

Dans le dossier sql sous dev, il y a les scripts à exécuter pour avoir une base de données fonctionnelle. Le script sql_query_do.sql est chargé de la création de la base de données, des différentes tables, des vues et les autres outils utilisés dans la base de données pour le projet. Il est situé ici : [sql_query_do.sql](/dev/sql/sql_query_do.sql)

Dans le même dossier, le script compagnie_test permet d'insérer une compagnie de test avec différentes informations pour faire des tests avec la base de données. Il est disponible ici : [compagnie_test.sql](/dev/sql/compagnie_test.sql)


## Utilisation
Pour utiliser l'application, la première chose à faire est de démarrer l'application. Vous pouvez la démarrer soit en utilisant vscode avec contrôle f5 ou vous pouvez ouvrir une commande cmd et lancer le serveur à partir de là.
<br>

![image](/C61/Sprint3/doc/Lancement_du_serveur.PNG)

Ensuite, vous pouvez aller vous connecter sur notre site à cette adresse [Page d'Accueil](http://127.0.0.1:5500/dev/FrontEnd/public/login.html)

Vous pouvez utiliser le compte par défaut de la compagnie test pour vous connecter soit bonjour@courriel.com et le mot de passe suivant testAndroid18!@.

Pour créer une nouvelle compagnie, appuyer sur créer un compte. On vous demandera les informations suivantes :
- Le courriel de la compagnie;
- Le nom de la compagnie;
- Le mot de passe de la compagnie

![Page Register](/C61/Sprint3/doc/register.PNG)

Soyez conscient qu'un mot de passe doit correspondre à une liste de critère. Soit les suivants:
- 12 caractères minimum;
- une majuscule au minimum;
- une minuscule au minimum;
- un chiffre au minimum;
- un caractère spécial au minimum;

Une fois que vous avez une compagnie de créée, il vous sera possible de modifier les informations relatives à votre premier centre. Il vous sera aussi possible de rajouter des salles ainsi qu'un horaire à ceux-ci.

Sur la page montrant les plages horaires des salles, il est possible d'ajouter ou de modifier une réservation, en plus de voir celles qui sont réservées et celles qui sont libres.

Dans gérer succursale, il vous sera possible d'ajouter une succursale au besoin ou une nouvelle salle. Pour une nouvelle salle, vous aurez d'autres onglets à remplir.

![Image création de salles](/C61/Sprint3/doc/SalleMdoif.PNG)

Il est également possible de créer un horaire automatiquement à une salle et le modifier si besoin.

Sur la page rapport, vous pourrez consulter les statistiques sur les performances de vos salles.

Finalement, lorsque tout sera prêt, vous pourrez commencer à ajouter des réservations au fur et à mesure que des clients voudront réserver vos services.

![Image création de salles](/C61/Sprint3/doc/Accueil.PNG)


## Références
Source principale : 
- CNIL. (2017, Janvier 27). CNIL. Récupéré sur Les conseils de la CNIL pour un bon mot de passe : https://www.cnil.fr/fr/les-conseils-de-la-cnil-pour-un-bon-mot-de-passe#:~:text=Un%20bon%20mot%20de%20passe%20doit%20contenir%20au%20moins%2012,est%20%C3%A9quip%C3%A9%20de%20s%C3%A9curit%C3%A9s%20compl%C3%A9mentaires%20 !
- Shvets, A. (2018, Décembre 5). Strategy. Récupéré sur refactoring guru : https://refactoring.guru/design-patterns/strategy
- Wang, X. (2022, Janvier 10). What is HTTP middleware? Best practices for building, designing and using middleware. Récupéré sur moesif blog : https://www.moesif.com/blog/engineering/middleware/What-Is-HTTP-Middleware/#:~:text=Middleware%20is%20a%20design%20pattern,on%20the%20core%20business%20logic.
- https://medium.com/algorithms-and-leetcode/backtracking-e001561b9f28
- https://www.tutorialspoint.com/python_data_structure/python_backtracking.htm#:~:text=Practical%20Data%20Science%20using%20Python&text=Backtracking%20is%20a%20form%20of,not%20give%20the%20required%20solution.
- https://medium.com/algorithms-and-leetcode/backtracking-with-leetcode-problems-part-2-705c9cc70e52
- https://medium.com/algorithms-and-leetcode/in-depth-backtracking-with-leetcode-problems-part-3-b225f19e0d51


## Remerciement
Nous tenons à remercier Pierre-Paul Monty et Frédéric Thériault qui ont généreusement répondu à nos questions tout au long du projet synthèse. Grâce à eux nous avons pu relever le niveau de notre application sur plusieurs niveaux.

## Licence
Dans la mesure du possible en vertu de la loi, Carlens Belony et Maxence Guindon renoncent à tous les droits d'auteur et droits connexes ou voisins sur ce projet.



