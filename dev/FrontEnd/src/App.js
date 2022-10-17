import React from 'react';
import {ReactReduxContext, useSelector, useDispatch} from 'react-redux';
import {loginAction, newAccountAction} from './actions/loginAction.js';

  function App() {

    const Login = () => { 
        const i = useSelector(state => state.loggedIn)
        return i
      }

      const NewAccount = () => { 
        const i = useSelector(state => state.newAccount)
        return i
      }

    const Dispatch = () => { 
        const i = useDispatch();
        return i
      }
    const api = () => {
      fetch('http://127.0.0.1:5000/hello')
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
    }

      // const Dispatch = useDispatch();
      
      return (
        React.createElement(
          'div',
          null,
            React.createElement(
            'button',
            {type:'submit'
            // , onClick:() => {Dispatch(loginAction())}
            , onClick:() => {api()}
        },
            'Submit'), 

            Login && React.createElement('div',
            {className:'message_erreur'},
            'Le mot de passe est erroné'),
              
             )
         );  
    }

    export default App;