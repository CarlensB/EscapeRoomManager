import { observer } from 'mobx-react';
import React, {lazy, Suspense} from 'react';
import reactDom from "react-dom";
import "./Middlewares/LoginMW"
import loginStore, { ActivePage } from './Middlewares/LoginMW';

const LoginPageComp = observer(() => {

  const {loginpage} = loginStore;
  const createaccError = loginpage.CreateAccountError
  const loginErr = loginpage.LoginError

  if (loginpage.LoginPageActive == ActivePage.Login)
    return( 
      React.createElement(
        'div',
        {className: 'box-container'},
        
        React.createElement(
          'div',
          {className: 'subtitle'},
          'Veuillez vous connecter'),
        React.createElement(
          'label',
          {for: 'username'},
          'Adresse courriel'),
        React.createElement(
          'input',
          {type: 'text', name: 'username', class:'username'},
          null),
        React.createElement(
          'label',
          {for: 'password'},
          'Mot de Passe'),
        React.createElement(
          'input',
          {type: 'password', name: 'password', class:'password'},
          null),  

        React.createElement(
          'button',
          { onClick:() => {loginpage.LoginAction()}},
          'Submit'),
        React.createElement(
          'button',
          { onClick:() => {loginpage.GoToCreateAcountPage()}},
          'Créer un compte'),
        
          // {loginErr ? React.createElement(
          //   'div',
          //   {className: 'message_erreur'},
          //   "Le nom d'utilisateur ou le mot de passe est erroné")
          // : ''
          // },


        )
      )
    else return(
      React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { onClick:() => {loginpage.LoginAction()}},
          'Submit'),
          React.createElement(
            'button',
            { onClick:() => {loginpage.GoToLoginPage()}},
            'Se Connecter')
        )
    )
}
)

  



const domContainer = document.body;
const root = reactDom.createRoot(domContainer);
root.render(React.createElement(LoginPageComp));

// source: https://www.youtube.com/watch?v=2ejs-uxSbAk
