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
        React.createElement(
          'div',
          null,
          (accueilStore.getCentres.length > 0) ? React.createElement(ModifierCentres) : "",React.createElement(AjouterCentres))
    )
  }
)

const ModifierCentres = observer(() => {

  let errMessage = ""
  let centreChoix = listeCentre()
  let selection = accueilStore.getSelection()
  let centres = accueilStore.getCentres()
  
  return(
    React.createElement('div',
  {class:'ContainerFormulaire'},

    React.createElement(
      'div',
      {class:'title'},
      'Modifier ou supprimer une succursalle'
    ),

    React.createElement(
      'div',
      {class:'ModifierCentreFormulaire'},
  
      React.createElement('select',
      {name:'centreChoix', onChange:evt =>{accueilStore.setSelection(parseInt(evt.currentTarget.value))}},
      centreChoix,
      ),
  
      React.createElement(
        'div',
        {class:'labelContainer'},
  
        React.createElement(
          'label',
          {class:'label'},
          'Ancien Nom:'),
      
        React.createElement(
          'label',
          {class:'label'},
          centres[selection].nom),
      ),
  
      React.createElement(
        'div',
        {class:'labelContainer'},
  
        React.createElement(
          'label',
          {class:'label'},
          'Ancienne Adresse:'),
      
        React.createElement(
          'label',
          {class:'label'},
          centres[selection].adresse),
      ),
  
      React.createElement(
        'div',
        {class:'labelContainer'},
  
        React.createElement(
          'label',
          {for: 'nom'},
          'Nouveau Nom: '),
  
        React.createElement(
          'input',
          {type: 'text', class:'nomSalleMod', onChange:evt => {accueilStore.updateModCentreInfosNom(evt.currentTarget.value)}},
          null),
      ),
  
      React.createElement(
        'div',
        {class:'labelContainer'},
  
        React.createElement(
          'label',
          {for: 'adresse'},
          'Nouvelle adresse:'),
      
        React.createElement(
          'input',
          {type: 'text', class:'adresseSalleMod', name: 'adresse', onChange:evt => {accueilStore.updateModCentreInfosAdresse(evt.currentTarget.value)}},
          null),
      ),
  
        React.createElement(
          'button',
          {class:"submit_button", onClick:()=>{accueilStore.modifierCentre()}},
          'Modifier la succursale'),
        React.createElement(
          'button',
          {class:"submit_button", onChange:evt => {accueilStore.supprimerCentre()}},
          'Supprimer la succursale'),
          React.createElement(
            'div',
            {class:"error_msg"},
            errMessage
            ),  
    )
  )
  )

  

  function listeCentre(){
    let selection = accueilStore.getSelection()
    let centres = accueilStore.getCentres()
    let liste = []
      for (let i = 0; i<centres.length; i++)
        {
          if (i == selection)
          liste.push(React.createElement('option',
          {value:i, selected:'selected',},
          centres[i].nom))
          else
          liste.push(React.createElement('option',
          {value:i},
          centres[i].nom))
        }  
     
    return liste
  }
})



const AjouterCentres = observer(() => {

  let errMessage = ""  
  // if (accueilStore.compagnie.newCentreInfos.nom.length < 1 && accueilStore.compagnie.newCentreInfos.adresse.length < 1){
    // errMessage = "Il manque des informations";
    // }
  
  return(React.createElement('div',
  {class:'ContainerFormulaire'},

    React.createElement(
      'div',
      {class:'title'},
      'Ajouter une succursalle'
    ),

    React.createElement(
      'div',
      {class:'nouveauCentreFormulaire'},    

      React.createElement(
          'label',
          {for: 'nom'},
          'Nom: '),

        React.createElement(
          'input',
          {type: 'text', name: 'nom', onChange:evt => {accueilStore.updateNewCentreInfosNom(evt.currentTarget.value)}},
          null),

        React.createElement(
          'label',
          {for: 'adresse'},
          'Adresse:'),
      
        React.createElement(
          'input',
          {type: 'text', name: 'adresse', onChange:evt => {accueilStore.updateNewCentreInfosAdresse(evt.currentTarget.value)}},
          null),

        React.createElement(
          'div',
          {class:"error_msg"},
          errMessage),

      React.createElement(
        'button',
        {class:"submit_button", onClick:()=>{accueilStore.ajouterCentre()}},
        'Ajouter une succursale')
  ),

  )

) 
})