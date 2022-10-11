// Structure de base inspiré du tutoriel youtube à l'adresse https://www.youtube.com/watch?v=CVpUuw9XSjY
import ReactDOM from 'react-dom';
import Redux from 'redux';
import { Provider, ReactReduxContext } from 'react-redux';
import { configureStore } from 'redux';
import LoginReact from './login.js';
import allReducer from './reducers'
import allActions from './actions'

const store = configureStore(allReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



// STORE = GLOBALIZED STATE (C'est là où se trouvent "l'État" du site, ou les variables qui sont stockées.)

// ACTION

// REDUCER (Dit quoi faire avec l'action)

// DISPATCH (appelle la fonction Reducer en passant une action en paramètre; c'est ce qu'on trouve dans le OnClick)










ReactDOM.render(
    <Provider store = {store}>
        <LoginReact />
    </Provider>,
     document.getElementById('root'));


ServiceWorker.unregister();