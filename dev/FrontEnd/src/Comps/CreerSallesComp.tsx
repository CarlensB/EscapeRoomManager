// ===============================================
// Nom du fichier : CreerSallesComp.tsx
// Ce fichier contient les composantes REACT
// necéssaires pour l'affichage de la page de
// gestion de salles et les méthodes qui viennent
// avec.
// ainsi que les méthodes qui viennent avec.
// Auteur : Carlens Belony
// Équipe : Carlens Belony et Maxence Guindon
// ===============================================
import { observer } from "mobx-react"
import React from "react"
import accueilStore, { eActivePage } from "../Middlewares/ControlleurApp"


export const AppCreerSalle = observer(() => {
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
          React.createElement(GererSalle), React.createElement(ModifierSalle))
    )
  }
)

function genererOptionsHeures(ouverture){
  let durees = []
  for (let hr = (ouverture ? 7 : 12); hr < (ouverture ? 12 : 23); hr++){
    for (let minute = 0; minute < 60; minute+=15){
        let heure = hr.toString() + ':' + (minute < 10 ? '0' : '') + minute
        let elem = React.createElement(
            'option',
            {value: heure},
            heure
        )
        durees.push(elem)
    }
  }
  return durees
}


const ModifierSalle = observer(() => {
  
  let errMessage = accueilStore.error_message

  let salles = accueilStore.getSalles()
  let sallesChoix = listeSalles()
  let selection = accueilStore.getSelectionSalle()
  
  function listeSalles(){

    let liste = []
      for (let i = 0; i<salles.length; i++)
        {
          
          liste.push(React.createElement('option',
          (i == 0) ? {value:i, selected:'selected'} : {value:i},
          salles[i].nom))
          
        }  
     
    return liste
  }
  
    

    function genererOptionsDuree(){
        let durees = []
        for (let hr =0; hr < 3; hr++){
          for (let minute = 0; minute < 60; minute+=15){
              if (minute == 0 && hr== 0)
              continue
              let heure = hr.toString() + ':' + (minute < 10 ? '0' : '') + minute
              let elem = React.createElement(
                  'option',
                  {value: heure},
                  heure
              )
              durees.push(elem)
          }
        }

        return durees
    }

    if (salles.length < 1){
      return React.createElement("div", null, "")
    }
    else
  return(React.createElement('div',
  {class:'ContainerFormulaire'},


    React.createElement(
      'div',
      {class:'nouveauSalleFormulaire'},


      
     
    
        React.createElement(
          'div',
          {class:'title'},
          'Modifier une Salle'
        ),
      
          React.createElement('select',
          {name:'centreChoix', onChange:evt =>{
            accueilStore.setSalleSelection(parseInt(evt.currentTarget.value))
          }},
          sallesChoix,
          ),
      
          React.createElement(
            'div',
            {class:'labelContainer'},
      
            React.createElement(
              'label',
              {class:'label'},
              'Nom: '),
          
            React.createElement(
              'label',
              {class:'label'},
              salles[selection].nom),
          ),
      
          React.createElement(
            'div',
            {class:'labelContainer'},
      
            React.createElement(
              'label',
              {class:'label'},
              'Description: '),
          
            React.createElement(
              'label',
              {class:'label'},
              salles[selection].description),
          ),
          
          React.createElement(
            'div',
            {class:'labelContainer'},
      
            React.createElement(
              'label',
              {class:'label'},
              'Nombre max de joueurs: '),
          
            React.createElement(
              'label',
              {class:'label'},
              salles[selection].nbJrMax.toString()),
          ),
      
    
          React.createElement(
            'div',
            {class:'labelContainer'},
      
            React.createElement(
              'label',
              {class:'label'},
              'Prix unitaire: '),
          
            React.createElement(
              'label',
              {class:'label'},
              salles[selection].prix),
          ),
      
    
          React.createElement(
            'div',
            {class:'labelContainer'},
      
            React.createElement(
              'label',
              {class:'label'},
              'Salle privée: '),
          
            React.createElement(
              'label',
              {class:'label'},
              salles[selection].sallePrive.toString()),
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
          {type: 'text', name: 'nom', onChange:evt => {
              accueilStore.updatemodSalleInfosNom(evt.currentTarget.value)
            }},
          null),
      ),

      React.createElement(
        'div',
        {class:'labelContainer'},

        React.createElement(
          'label',
          {for: 'prix'},
          'Prix ($):'),
      
        React.createElement(
          'input',
          {type: 'number', min:"1", name: 'prix', onChange:evt => {
              accueilStore.updatemodSalleInfosPrix(parseInt(evt.currentTarget.value))
            }},
          null),

      ),

      React.createElement(
        'div',
        {class:'labelContainer'},

        React.createElement(
          'label',
          {for: 'nb_jr'},
          'Nombre de jouers max:'),
      
        React.createElement(
          'input',
          {type: 'number', min:"1", name: 'nb_jr', onChange:evt => {
              accueilStore.updatemodSalleInfosNbJoueur(parseInt(evt.currentTarget.value))
            }},
          null),

      ),

      


      React.createElement(
        'div',
        {class:'labelContainer'},

      React.createElement(
          'label',
          {for: 'nom'},
          'Salle publique: '),

        React.createElement(
          'input',
          {type: 'checkbox', name: 'nom', onClick:evt => {
              accueilStore.updatemodSalleInfosPublique(evt.currentTarget.checked)
            }},
          null),
      ),

      React.createElement(
        'div',
        {class:'labelContainer'},

      React.createElement(
          'label',
          {for: 'nom'},
          'Description: '),

        React.createElement(
          'textarea',
            {onChange:evt => {
              accueilStore.updatemodSalleInfosDescription(evt.currentTarget.value)
            }},
          null),
        ),

        React.createElement(
          'div',
          {class:"error_msg"},
          errMessage),

          React.createElement(
            'button',
            {class:"submit_button bouton_salle", onClick:()=>{accueilStore.modifierSalle()}},
            'Modifier la salle'),

          React.createElement(
            'button',
            {class:"submit_button", onClick:() => {accueilStore.supprimerSalle()}},
            'Supprimer la salle')
          
          ),
  )
      )

     
  }
)


const GererSalle = observer(() => {

  let errMessage = accueilStore.error_message
  
    

    function genererOptionsDuree(){
        let durees = []
        for (let hr =0; hr < 3; hr++){
          for (let minute = 0; minute < 60; minute+=15){
              if (minute == 0 && hr== 0)
              continue
              let heure = hr.toString() + ':' + (minute < 10 ? '0' : '') + minute
              let elem = React.createElement(
                  'option',
                  {value: heure},
                  heure
              )
              durees.push(elem)
          }
        }

        return durees
    }

    function generateOptionAlgoNoms(){
      let noms = []
      for (let i =0; i < accueilStore.algoNb; i++){
        
        noms.push(React.createElement(
          'div',
          {class:'labelContainer'},
  
        React.createElement(
            'label',
            {for: 'nom'},
            'Nom ' + i.toString() + ': '),
  
          React.createElement(
            'input',
            {type: 'text', name: 'nom', onChange:evt => {
                accueilStore.updateInfoNomAlgo(i, evt.currentTarget.value)
              }},
            null),
        ))
           
        }
      

      return noms
    }

    function generateOptionAlgoDesc(){
      let noms = []
      for (let i =0; i < accueilStore.algoNb; i++){
        
        noms.push(React.createElement(
          'div',
          {class:'labelContainer'},
  
        React.createElement(
            'label',
            {for: 'nom'},
            'Desc ' + i.toString() + ': '),
  
          React.createElement(
            'input',
            {type: 'text', name: 'nom', onChange:evt => {
              accueilStore.updateInfoDescAlgo(i, evt.currentTarget.value)
              }},
            null),
        ))
           
        }
      

      return noms
    }


  return(React.createElement('div',
  {class:'ContainerFormulaire'},
  

    React.createElement(
      'div',
      {class:'nouveauSalleFormulaire'},

      React.createElement(
        'div',
        {class:'title'},
        'Ajouter une Salle'
      ),
    
      
     !accueilStore.algo ? React.createElement(
        'div',
        {class:'labelContainer'},

      React.createElement(
          'label',
          {for: 'nom'},
          'Nom: '),

        React.createElement(
          'input',
          {type: 'text', name: 'nom', onChange:evt => {
              accueilStore.updateNewSalleInfosNom(evt.currentTarget.value)
            }},
          null),
      ) :
      
      generateOptionAlgoNoms(), 

      React.createElement(
        'div',
        {class:'labelContainer'},

        React.createElement(
          'label',
          {for: 'prix'},
          'Prix ($):'),
      
        React.createElement(
          'input',
          {type: 'number', min:"1", name: 'prix', onChange:evt => {
              accueilStore.updateNewSalleInfosPrix(parseInt(evt.currentTarget.value))
            }},
          null),

      ),


      React.createElement(
        'div',
        {class:'labelContainer'},

        React.createElement(
          'label',
          {for: 'duree'},
          "Durée d'une réservation:"),
      
        React.createElement(
          'select',
          {name: 'duree', class:'dropdown', onChange:evt => {accueilStore.updateNewSalleInfosDuree(evt.currentTarget.value)}},
          genererOptionsDuree()
          ),

      ),

      React.createElement(
        'div',
        {class:'labelContainer'},

        React.createElement(
          'label',
          {for: 'hrOuv'},
          "intervalle:"),
      
        React.createElement(
          'select',
          {name: 'hrOuv', class:'dropdown', onChange:evt => {accueilStore.updateNewSalleInfosIntervalle(evt.currentTarget.value)}},
          genererOptionsDuree()
          ),

      ),

      accueilStore.algo ? React.createElement(
        'div',
        {class:'labelContainer'},

      React.createElement(
          'label',
          {for: 'nom'},
          'Buffer: '),

        React.createElement(
          'input',
          {type: 'number', min:"5", max:"45", name: 'nb_jr', onChange:evt => {
              accueilStore.buffer = parseInt(evt.currentTarget.value)
            }},
          null),
      ) :
      
      "",


      React.createElement(
        'div',
        {class:'labelContainer'},

        React.createElement(
          'label',
          {for: 'hrOuv'},
          "Heure d'ouverture:"),
      
        React.createElement(
          'select',
          {name: 'hrOuv', class:'dropdown', onChange:evt => {accueilStore.updateNewSalleInfosHrOuverture(evt.currentTarget.value)}},
          genererOptionsHeures(true)
          ),

      ),


      React.createElement(
        'div',
        {class:'labelContainer'},

        React.createElement(
          'label',
          {for: 'hrOuv'},
          "Heure de Fermeture:"),
      
        React.createElement(
          'select',
          {name: 'hrOuv', class:'dropdown', onChange:evt => {accueilStore.updateNewSalleInfosHrFermeture(evt.currentTarget.value)}},
          genererOptionsHeures(false)
          ),

      ),

      React.createElement(
        'div',
        {class:'labelContainer'},

        React.createElement(
          'label',
          {for: 'nb_jr'},
          'Nombre de jouers max:'),
      
        React.createElement(
          'input',
          {type: 'number', min:"1", name: 'nb_jr', onChange:evt => {
              accueilStore.updateNewSalleInfosNbJoueur(parseInt(evt.currentTarget.value))
            }},
          null),

      ),

      


      React.createElement(
        'div',
        {class:'labelContainer'},

      React.createElement(
          'label',
          {for: 'nom'},
          'Salle publique: '),

        React.createElement(
          'input',
          {type: 'checkbox', name: 'nom', onClick:evt => {
              accueilStore.updateNewSalleInfosPublique(evt.currentTarget.checked)
            }},
          null),
      ),

      !accueilStore.algo ? React.createElement(
        'div',
        {class:'labelContainer'},

      React.createElement(
          'label',
          {for: 'nom'},
          'Description: '),

      React.createElement(
        'textarea',
          {onChange:evt => {
            accueilStore.updateNewSalleInfosDescription(evt.currentTarget.value)
          }},
        null),
      ) : generateOptionAlgoDesc(),

      React.createElement(
        'div',
        {class:"error_msg"},
        errMessage),

      React.createElement(
        'button',
        {class:"submit_button bouton_salle", onClick:()=>{accueilStore.ajouterSalle()}},
        'Ajouter une salle'),

      React.createElement(
        'button',
        {class:"submit_button bouton_salle", onClick:()=>{accueilStore.algo = !accueilStore.algo}},
        'Algorithme'),

      React.createElement(
        'input',
        {type: 'number', min:"1", name: 'nb_jr', onChange:evt => {
            accueilStore.algoNb = parseInt(evt.currentTarget.value)
          }},
        null),
          ),
  )
      )

     
  }
)