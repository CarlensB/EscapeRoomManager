import { observer } from "mobx-react";
import React from "react";
import loginStore from "src/Middlewares/loginStore";

export const CreateAccountComp = observer(() => {

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