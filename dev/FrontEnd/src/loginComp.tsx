import { observer } from 'mobx-react';
import React, {lazy, Suspense} from 'react';
import reactDom from "react-dom";
import { redirect } from 'react-router-dom';
import "./Middlewares/LoginMW"
import loginStore, { ActivePage } from './Middlewares/LoginMW';


export const LoginPageComps = observer(() => {

  const {loginpage} = loginStore;

  if (loginpage.LoginPageActive == ActivePage.Login)
    return (React.createElement(
      'div',
      null, React.createElement(LoginPageComp)))
    else if (loginpage.LoginPageActive == ActivePage.CreateAccount)
    return (React.createElement(
      'div',
      null, React.createElement(CreateAccountComp)))
    else window.location.href = "../public/accueilEmp.html?username=" + loginpage.loginInfos.username
    
}
)

const LoginPageComp = observer(() => {

  const {loginpage} = loginStore;
  const loginErr = loginpage.LoginError
  let LoginMessage = ""
  if (loginErr){
    LoginMessage = "Le mot de passe ou l'indentifiant est erronné";
  }
  
  
  return(   
    React.createElement(
      'div',
      null, 
    React.createElement(
      'div',
      {className: 'subtitle'},
      'Veuillez vous connecter'),
  
    React.createElement(
      'div',
      {className: 'label_container'},
  
      React.createElement(
        'label',
        {for: 'username'},
        'Adresse courriel'),
      React.createElement(
        'label',
        {for: 'password'},
        'Mot de Passe'),
  
      ),
  
    React.createElement(
      'div',
      {className: 'input_container'},
  
    React.createElement(
      'input',
      {type: 'text', name: 'username', class:'username', onChange:evt => {loginStore.loginpage.loginInfos.username = evt.currentTarget.value}},
      null),
    
    React.createElement(
      'input',
      {type: 'password', name: 'password', class:'password', onChange:evt => {loginStore.loginpage.loginInfos.password = evt.currentTarget.value}},
      null),
    ),  
  
    React.createElement(
      'button',
      { onClick:() => {loginpage.LoginAction()}},
      'Submit'),
    React.createElement(
      'button',
      { onClick:() => {loginpage.GoToCreateAcountPage()}},
      'Créer un compte'),
    
    React.createElement(
      'div',
      {class:"error_msg"},
      LoginMessage
    )
  )
    )
    
  })

const CreateAccountComp = observer(() => {

  const {loginpage} = loginStore;
  const createaccError = loginpage.CreateAccountError
  const loginErr = loginpage.LoginError

  return(
    React.createElement(
      'div',
      null,
    
      React.createElement(
        'div',
        {className: 'subtitle'},
        'Créer votre compte!'),

      React.createElement(
        'div',
        {className: 'container_label'},

        React.createElement(
          'label',
          {for: 'username', class: 'label'},
          'Adresse courriel'),

        React.createElement(
          'label',
          {for: 'nomCompagnie', class: 'label'},
          'Nom de la compagnie'),

        React.createElement(
          'label',
          {for: 'password', class: 'label'},
          'Mot de Passe'),

        React.createElement(
          'label',
          {for: 'repeatpassword', class: 'label'},
          'Mot de Passe'),
      ),

      React.createElement(
        'div',
        {className: 'container_input'},

        React.createElement(
          'input',
          {type: 'text', name: 'username', class:'input', onChange:evt => {loginStore.loginpage.createAccountInfos.username = evt.currentTarget.value}},
          null),

        
        React.createElement(
          'input',
          {type: 'text', name: 'nomCompagnie', class:'input',onChange:evt => {loginStore.loginpage.createAccountInfos.companyName = evt.currentTarget.value}},
          null),

        
        React.createElement(
          'input',
          {type: 'password', name: 'password', class:'input',onChange:evt => {loginStore.loginpage.createAccountInfos.password = evt.currentTarget.value}},
          null),
        
        React.createElement(
          'input',
          {type: 'password', name: 'repeatpassword', class:'input',onChange:evt => {loginStore.loginpage.createAccountInfos.repeatpassword = evt.currentTarget.value}},
          null),
      ),

      React.createElement(
        'button',
        { onClick:() => {loginpage.CreateAcountAction()}},
        "S'inscrire"),
        React.createElement(
          'button',
          { onClick:() => {loginpage.GoToLoginPage()}},
          'Se Connecter')
      )
  )
}
)

// source: https://www.youtube.com/watch?v=2ejs-uxSbAk
const domContainer = document.querySelector('#boite');
const root = reactDom.createRoot(domContainer);
root.render(React.createElement(LoginPageComps));