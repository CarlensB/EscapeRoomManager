// ===============================================
// Nom du fichier : LoginPageComp.tsx
// Ce fichier contient les composantes REACT
// necéssaires pour l'affichage de la page de
// connection et les méthodes qui viennent
// avec.
// ainsi que les méthodes qui viennent avec.
// Auteur : Carlens Belony
// Équipe : Carlens Belony et Maxence Guindon
// ===============================================

import { observer } from "mobx-react";
import React from "react";
import loginStore from "../Middlewares/ControlleurLogin"


export const LoginPageComp = observer(() => {

    
    let errMessage = loginStore.message
    console.log(loginStore.message)
    
    
    
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
  