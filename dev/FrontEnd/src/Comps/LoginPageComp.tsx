import { observer } from "mobx-react";
import React from "react";
import loginStore from "../../src/Middlewares/loginStore"


export const LoginPageComp = observer(() => {

    const loginErr = loginStore.getLoginError()
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
          {type: 'text', name: 'username', onChange:evt => {loginStore.updateLoginInfos_username(evt.currentTarget.value)}},
          null),
  
        React.createElement(
          'label',
          {for: 'password'},
          'Mot de Passe'),
      
        React.createElement(
          'input',
          {type: 'password', name: 'password', onChange:evt => {loginStore.updateLoginInfos_password(evt.currentTarget.value)}},
          null),
  
        React.createElement(
          'div',
          {class:"error_msg"},
          errMessage
      ),
        
    
        React.createElement(
          'button',
          { onClick:() => {loginStore.Login()}},
          'Se Connecter'),
        React.createElement(
          'button',
          { onClick:() => {loginStore.GoToCreateAcountPage()}},
          'Créer un compte'),
      
        
    )
      )
      
    })
  