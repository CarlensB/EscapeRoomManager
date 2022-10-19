import { observer } from 'mobx-react';
import React, {lazy, Suspense} from 'react';
import reactDom from "react-dom";
import "./Middlewares/LoginMW"
import loginStore, { ActivePage } from './Middlewares/LoginMW';

const LoginPageComp = observer(() => {

  const {loginpage} = loginStore;
  console.log(ActivePage.Login)
  if (loginpage.LoginPageActive == ActivePage.Login)
    return( 
      React.createElement(
        'div',
        null,
        React.createElement(
          'button',
          { onClick:() => {loginpage.LoginAction()}},
          'Submit'),
          React.createElement(
            'button',
            { onClick:() => {loginpage.GoToCreateAcountPage()}},
            'Créer un compte')
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
            'Créer un compte')
        )
    )
}
)

  



const domContainer = document.querySelector('#erreur');
const root = reactDom.createRoot(domContainer);
root.render(React.createElement(LoginPageComp));

// source: https://www.youtube.com/watch?v=2ejs-uxSbAk
