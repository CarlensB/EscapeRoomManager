import { observer } from "mobx-react"
import React from "react"
import accueilStore, { eActivePage } from "../Middlewares/AccueilStore"


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
          React.createElement(ModifierCentres),React.createElement(AjouterCentres))
    )
  }
)


const ModifierCentres = observer(() => {

  let errMessage = ""
  let centreChoix = listeCentre()
  let selection = accueilStore.getSelection()
  let centres = accueilStore.getCentres()

  function genererSalles(){
    let Salles = accueilStore.getSalles();
    let arraySalles = []

    if (Salles.length > 0){
      for (let i =0; i<Salles.length; i++){
        arraySalles.push(
          React.createElement(
            'div',
            {class:"minisalleContainer" , onClick:() => {
              accueilStore.setSalleSelection(i);
              accueilStore.ActivePage = eActivePage.CreateSalle

            }},
            React.createElement(
              'div',
              {class: "miniNomSalle"},
              Salles[i].nom)
          )
        )
      }
    }

    arraySalles.push(React.createElement(
      'div',
      {class:"minisalleContainer ajout" , onClick:() => {
        accueilStore.ActivePage = eActivePage.CreateSalle

      }},
      React.createElement(
        'div',
        {class: "miniNomSalle"},
        "Ajouter Une Salle")
    ))

    return arraySalles



  }

  if (accueilStore.getCentres().length < 1 || accueilStore.getCentres().length < 1){
    return React.createElement("div", null, "")
  }
  else
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

      React.createElement('div', {class: 'containerMiniSalles'}, genererSalles()),
  
        React.createElement(
          'button',
          {class:"submit_button", onClick:()=>{accueilStore.modifierCentre()}},
          'Modifier la succursale'),
        React.createElement(
          'button',
          {class:"submit_button", onClick:() => {accueilStore.supprimerCentre()}},
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
          
          liste.push(React.createElement('option',
          (i == selection) ? {value:i, selected:'selected'} : {value:i},
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