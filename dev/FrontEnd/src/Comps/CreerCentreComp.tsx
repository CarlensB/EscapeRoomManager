import { observer } from "mobx-react"
import React from "react"
import accueilStore, { eActivePage } from "../Middlewares/ControlleurApp"


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
          React.createElement(AjouterCentres),React.createElement(ModifierCentres))
    )
  }
)


const ModifierCentres = observer(() => {

  let errMessage = ""
  let centreChoix = listeCentre()
  let selection = accueilStore.getSelectionCentre()
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
              {class: 'miniNomSalle add', onClick:() => {
                accueilStore.setSalleSelection(i);
                accueilStore.ActivePage = eActivePage.CreateSalle
              }},
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

  if (accueilStore.getCentres().length < 1){
    return React.createElement("div", null, "")
  }
  else
  return(
    React.createElement('div',
  {class:'ContainerFormulaire'},

  
  React.createElement(
    'div',
    {class:'ModifierCentreFormulaire'},

    React.createElement(
      'div',
      {class:'title'},
      'Modifier une succursalle'
    ),
  
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
          {class:'label'},
          'Ancienne Ville:'),
      
        React.createElement(
          'label',
          {class:'label'},
          centres[selection].ville),
      ),
  

      React.createElement(
        'div',
        {class:'labelContainer'},
  
        React.createElement(
          'label',
          {class:'label'},
          'Ancien Pays:'),
      
        React.createElement(
          'label',
          {class:'label'},
          centres[selection].pays),
      ),
  

      React.createElement(
        'div',
        {class:'labelContainer'},
  
        React.createElement(
          'label',
          {class:'label'},
          'Ancien code Postal:'),
      
        React.createElement(
          'label',
          {class:'label'},
          centres[selection].code_postal),
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
        'div',
        {class:'labelContainer'},
  
        React.createElement(
          'label',
          {for: 'Ville'},
          'Nouvelle Ville: '),
  
        React.createElement(
          'input',
          {type: 'text', class:'nomSalleMod', onChange:evt => {accueilStore.updateModCentreInfosVille(evt.currentTarget.value)}},
          null),
      ),
  
      React.createElement(
        'div',
        {class:'labelContainer'},
  
        React.createElement(
          'label',
          {for: 'Pays'},
          'Nouveau Pays:'),
      
        React.createElement(
          'input',
          {type: 'text', class:'adresseSalleMod', name: 'Pays', onChange:evt => {accueilStore.updateModCentreInfosPays(evt.currentTarget.value)}},
          null),
      ),
      
      React.createElement(
        'div',
        {class:'labelContainer'},
  
        React.createElement(
          'label',
          {for: 'CP'},
          'Nouveau Code Postal:'),
      
        React.createElement(
          'input',
          {type: 'text', class:'adresseSalleMod', name: 'CP', onChange:evt => {accueilStore.updateModCentreInfosCodePostal(evt.currentTarget.value)}},
          null),
      ),
      
      React.createElement('div', {class: 'containerMiniSalles'}, genererSalles()),

      React.createElement(
        'div',
        {class:'labelContainer'},
  
        React.createElement(
          'button',
          {class:"submit_button", onClick:()=>{accueilStore.modifierCentre()}},
          'Modifier la succursale'),
          accueilStore.getCentres().length > 1 ?
              React.createElement(
                'button',
                {class:"submit_button", onClick:() => {accueilStore.supprimerCentre()}},
                'Supprimer la succursale') 
          : ""

      ),
          React.createElement(
            'div',
            {class:"error_msg"},
            errMessage
            ),  
    )
  )
  )

  

  function listeCentre(){
    let selection = accueilStore.getSelectionCentre()
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
    {class:'nouveauCentreFormulaire'},    

    React.createElement(
      'div',
      {class:'title'},
      'Ajouter une succursalle'
    ),

      React.createElement(
        'div',
        {class:'labelContainer'},
  

      React.createElement(
          'label',
          {for: 'nom'},
          'Nom: '),

        React.createElement(
          'input',
          {type: 'text', name: 'nom', onChange:evt => {accueilStore.updateNewCentreInfosNom(evt.currentTarget.value)}},
          null),

      ),


      React.createElement(
        'div',
        {class:'labelContainer'},
  

        React.createElement(
          'label',
          {for: 'adresse'},
          'Adresse:'),
      
        React.createElement(
          'input',
          {type: 'text', name: 'adresse', onChange:evt => {accueilStore.updateNewCentreInfosAdresse(evt.currentTarget.value)}},
          null),

      ),
      React.createElement(
        'div',
        {class:'labelContainer'},
  

        React.createElement(
          'label',
          {for: 'ville'},
          'Ville:'),
      
        React.createElement(
          'input',
          {type: 'text', name: 'ville', onChange:evt => {accueilStore.updateNewCentreInfosVille(evt.currentTarget.value)}},
          null),

      ),
      React.createElement(
        'div',
        {class:'labelContainer'},
  

        React.createElement(
          'label',
          {for: 'pays'},
          'Pays:'),
      
        React.createElement(
          'input',
          {type: 'text', name: 'pays', onChange:evt => {accueilStore.updateNewCentreInfosPays(evt.currentTarget.value)}},
          null),

      ),
      React.createElement(
        'div',
        {class:'labelContainer'},
  

        React.createElement(
          'label',
          {for: 'cp'},
          'Code Postal:'),
      
        React.createElement(
          'input',
          {type: 'text', name: 'cp', onChange:evt => {accueilStore.updateNewCentreInfosCodePostal(evt.currentTarget.value)}},
          null),

      ),

      React.createElement(
        'div',
        {class:'labelContainer'},
  

        React.createElement(
          'div',
          {class:"error_msg"},
          errMessage),

      React.createElement(
        'button',
        {class:"submit_button", onClick:()=>{accueilStore.ajouterCentre()}},
        'Ajouter une succursale')
      )

  ),

  )

) 
})