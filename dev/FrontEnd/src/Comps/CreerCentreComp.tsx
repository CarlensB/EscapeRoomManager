import { observer } from "mobx-react"
import React from "react"
import accueilStore from "../Middlewares/AccueilStore"


export const AppCreerSucursalle = observer(() => {
    return (React.createElement('div',
          {class: 'AppRight'},
          React.createElement(Formulaire)
          ))
}

)


const Formulaire = observer(() => {

    return(
        React.createElement(genererCentres)
    )

    function listeCentre(){
      let liste = []
        for (let i = 0; i<accueilStore.compagnie.centres.length; i++)
          {
            liste.push(React.createElement('option',
            {value:accueilStore.compagnie.centres[i].nom},
            accueilStore.compagnie.centres[i].nom))
          }  
       
      return liste
    }

    function genererCentres(){

        let errMessage = ""
        
        // if (accueilStore.compagnie.newCentreInfos.nom.length < 1 && accueilStore.compagnie.newCentreInfos.adresse.length < 1){
        // errMessage = "Il manque des informations";
        // }

        
        
        
        return(React.createElement('div',
        {class:'ContainerFormulaire'},

        React.createElement(
          'div',
          {class:'nouveauCentreFormulaire'},

          React.createElement(
              'label',
              {for: 'nom'},
              'Nom: '),
      
            React.createElement(
              'input',
              {type: 'text', name: 'nom', onChange:evt => {accueilStore.compagnie.newCentreInfos.nom = evt.currentTarget.value}},
              null),
      
            React.createElement(
              'label',
              {for: 'adresse'},
              'Adresse:'),
          
            React.createElement(
              'input',
              {type: 'text', name: 'adresse', onChange:evt => {accueilStore.compagnie.newCentreInfos.nom = evt.currentTarget.value}},
              null),
      
            React.createElement(
              'div',
              {class:"error_msg"},
              errMessage
          ),
          React.createElement(
            'button',
            {class:"submit_button"},
            'Ajouter une succursale')
        ),
        

        React.createElement(
          'div',
          {class:'ModifierCentreFormulaire'},

          React.createElement('select',
          {name:'centreChoix'},
          React.createElement(listeCentre),
          ),

          React.createElement(
              'label',
              {for: 'nom'},
              'Nom: '),
      
            React.createElement(
              'input',
              {type: 'text', name: 'nom', onChange:evt => {accueilStore.compagnie.newCentreInfos.nom = evt.currentTarget.value}},
              null),
      
            React.createElement(
              'label',
              {for: 'adresse'},
              'Adresse:'),
          
            React.createElement(
              'input',
              {type: 'text', name: 'adresse', onChange:evt => {accueilStore.compagnie.newCentreInfos.nom = evt.currentTarget.value}},
              null),
      
            React.createElement(
              'div',
              {class:"error_msg"},
              errMessage
          ),
        ))

      ) 
    }
  }
)