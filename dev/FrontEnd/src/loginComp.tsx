import { observer } from 'mobx-react';
import React, {lazy, Suspense} from 'react';
import reactDom from "react-dom";
import { redirect } from 'react-router-dom';
import { ActivePage } from './Middlewares/Actions/LoginActions';
import "./Middlewares/loginStore"
import loginStore from './Middlewares/loginStore';
import './CSS/Login.css'


const LoginPageComps = observer(() => {

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

  const {loginpage} = loginStore
  const loginErr = loginpage.LoginError
  let errMessage = ""
  if (loginErr){
    errMessage = "Le mot de passe ou l'indentifiant est erronné";
  }
  
  
  return(   
    React.createElement(
      'div',
      {class:'form'}, 

      React.createElement(
        'h1',
        null,
        'EscapeRoom Manager'),

      React.createElement(
        'h3',
        null,
        'Veuillez vous connecter'),
  
      React.createElement(
        'label',
        {for: 'username'},
        'Adresse courriel'),

      React.createElement(
        'input',
        {type: 'text', name: 'username', onChange:evt => {loginStore.loginpage.loginInfos.username = evt.currentTarget.value}},
        null),

      React.createElement(
        'label',
        {for: 'password'},
        'Mot de Passe'),
    
      React.createElement(
        'input',
        {type: 'password', name: 'password', onChange:evt => {loginStore.loginpage.loginInfos.password = evt.currentTarget.value}},
        null),

      React.createElement(
        'div',
        {class:"error_msg"},
        errMessage
    ),
      
  
      React.createElement(
        'button',
        { onClick:() => {loginpage.LoginAction()}},
        'Se Connecter'),
      React.createElement(
        'button',
        { onClick:() => {loginpage.GoToCreateAcountPage()}},
        'Créer un compte'),
    
      
  )
    )
    
  })

const CreateAccountComp = observer(() => {

  const {loginpage} = loginStore;
  const createaccError = loginpage.CreateAccountError
  let errMessage = ''
  if (createaccError)
    errMessage = "Les informations entrées sont invalides ou incomplètes."

  return(
    React.createElement(
      'div',
      {class:'form'},

      React.createElement(
        'h1',
        null,
        'EscapeRoom Manager'),
    
      React.createElement(
        'h3',
        null,
        'Créez votre compte!'),

      React.createElement(
        'label',
        {for: 'username'},
        'Adresse courriel'),

      React.createElement(
        'input',
        {type: 'text', name: 'username', onChange:evt => {loginStore.loginpage.createAccountInfos.username = evt.currentTarget.value}},
        null),

      React.createElement(
        'label',
        {for: 'nomCompagnie'},
        'Nom de la compagnie'),

      React.createElement(
        'input',
        {type: 'text', name: 'nomCompagnie', onChange:evt => {loginStore.loginpage.createAccountInfos.companyName = evt.currentTarget.value}},
        null),

      React.createElement(
        'label',
        {for: 'password'},
        'Mot de Passe'),

      React.createElement(
        'input',
        {type: 'password', name: 'password',onChange:evt => {loginStore.loginpage.createAccountInfos.password = evt.currentTarget.value}},
        null),

      React.createElement(
        'label',
        {for: 'repeatpassword'},
        'Mot de Passe'),
        
      React.createElement(
        'input',
        {type: 'password', name: 'repeatpassword', onChange:evt => {loginStore.loginpage.createAccountInfos.repeatpassword = evt.currentTarget.value}},
        null),

      React.createElement(
        'div',
        {class:"error_msg"},
        errMessage
    ),

      React.createElement(
        'button',
        { onClick:() => {loginpage.CreateAcountAction()}},
        "S'inscrire"),
      React.createElement(
        'button',
        { onClick:() => {loginpage.GoToLoginPage()}},
        'Je possède déjà un compte')
      )
  )
}
)

// source: https://www.youtube.com/watch?v=2ejs-uxSbAk
const domContainer = document.getElementById('pageWeb');
const root = reactDom.createRoot(domContainer);
root.render(React.createElement(LoginPageComps));