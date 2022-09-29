'''
Le tutoriel flask
https://www.tutorialspoint.com/flask/index.htm
'''

from flask import Flask, redirect, url_for, request, render_template

app = Flask(__name__)

########################################
# La base
########################################

@app.route('/hello')
def hello_world():
    return 'Hello World'

########################################
# Insertion de variable dans l'URL
########################################

@app.route('/hello/<name>')
def hello_name(name):
    return 'Hello %s!' % name

@app.route('/blog/<int:postID>')
def show_blog(postID):
    return 'Blog Number %d' %postID

@app.route('/rev/<float:revNo>')
def revision(revNo):
    return 'Revision Number %f' %revNo

@app.route('/python/')
def hello_python():
    return 'Hello Python'
# On crée un lien canonique pour éviter de dupliquer des pages

########################################
# Redirction et url_for
########################################

@app.route('/admin')
def hello_admin():
    return 'Hello Admin'

@app.route('/guest/<guest>')
def hello_guest(guest):
    return 'Hello %s as Guest' %guest

@app.route('/user/<name>')
def hello_user(name):
    if name == 'admin':
        return redirect(url_for('hello_admin'))
    else:
        return redirect(url_for('hello_guest', guest = name))

########################################
# request
# pour récupérer de POST et GET
########################################    
@app.route('/success/<name>')
def success(name):
    return 'welcome %s' % name

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        user = request.form['nm']
        return redirect(url_for('success', name = user))
    else:
        user = request.args.get('nm')
        return redirect(url_for('success', name=user))
    
########################################
# template
# render_template
########################################

#@app.route('/')
#def index_meh():
    #return '<html><body><h1>Hello World</h1></body></html>'
# sauf que c'est meh
# Donc on peut profiter de Jinja2!
@app.route('/')
def index():
    return render_template('login.html')

@app.route('/hello/<user>')
def hello_toi(user):
    return render_template('hello.html', name = user)

# Avec jinja2 il y a 4 appels possibles sur les fichiers html
# {%...%} pour des déclarations
# {{ ... }} pour des valeurs à afficher
# {# ... #} pour des commetaires
# # ... ## pour des lignes de déclarations

@app.route('/hello/<int:score>')
def hello_score(score):
    return render_template('hello.html', marks = score)

@app.route('/result')
def result():
    dict = {'phy' : 50, 'che' : 60, 'maths' : 70}
    return render_template('result.html', result = dict)

'''
Rendu là
https://www.tutorialspoint.com/flask/flask_static_files.htm
'''

if __name__ == '__main__':
    app.run(debug = True)
    #app.run() # normal run