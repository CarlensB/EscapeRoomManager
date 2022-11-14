import { observer } from "mobx-react";
import React from "react";
import loginStore from "../../src/Middlewares/loginStore"


export const CreateAccountComp = observer(() => {

    const createaccError = loginStore.getLoginError()
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
          {type: 'text', name: 'username', onChange:evt => {loginStore.updateCreateAccountInfos_username(evt.currentTarget.value)}},
          null),
  
        React.createElement(
          'label',
          {for: 'nomCompagnie'},
          'Nom de la compagnie'),
  
        React.createElement(
          'input',
          {type: 'text', name: 'nomCompagnie', onChange:evt => {loginStore.updateCreateAccountInfos_companyName(evt.currentTarget.value)}},
          null),
  
        React.createElement(
          'label',
          {for: 'password'},
          'Mot de Passe'),
  
        React.createElement(
          'input',
          {type: 'password', name: 'password',onChange:evt => {loginStore.updateCreateAccountInfos_password(evt.currentTarget.value)}},
          null),
  
        React.createElement(
          'label',
          {for: 'repeatpassword'},
          'Mot de Passe'),
          
        React.createElement(
          'input',
          {type: 'password', name: 'repeatpassword', onChange:evt => {loginStore.updateCreateAccountInfos_repeatpassword(evt.currentTarget.value)}},
          null),
  
        React.createElement(
          'div',
          {class:"error_msg"},
          errMessage
      ),
  
        React.createElement(
          'button',
          { onClick:() => {loginStore.CreateAccount()}},
          "S'inscrire"),
        React.createElement(
          'button',
          { onClick:() => {loginStore.GoToLoginPage()}},
          'Je possède déjà un compte')
        )
    )
  }
  )