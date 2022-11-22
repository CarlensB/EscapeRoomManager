import { observer } from "mobx-react"
import React from "react"
import accueilStore, { eActivePage } from "../Middlewares/AccueilStore"


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
          React.createElement(GererSalle))
    )
  }
)






const GererSalle = observer(() => {

  let errMessage = ""  
//   if (accueilStore.compagnie.newCentreInfos.nom.length < 1 && accueilStore.compagnie.newCentreInfos.adresse.length < 1){
//     errMessage = "Il manque des informations";
//     }
  
    

    function genererOptionsDuree(){
        let durees = []
        for (let hr =0; hr < 3; hr++){
          for (let minute = 0; minute < 60; minute+=15){
              if (minute == 0 && hr== 0)
              continue
              let heure = hr.toString() + ':' + (minute < 10 ? '0' : '') + minute
              let elem = React.createElement(
                  'option',
                  {value: (hr * 60 + minute)},
                  heure
              )
              durees.push(elem)
          }
        }

        return durees
    }


  return(React.createElement('div',
  {class:'ContainerFormulaire'},


    React.createElement(
      'div',
      {class:'nouveauSalleFormulaire'},
      
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
              accueilStore.updateNewSalleInfosNom(evt.currentTarget.value)
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
              accueilStore.updateNewSalleInfosDescription(evt.currentTarget.value)
            }},
          null),
        ),

        React.createElement(
          'div',
          {class:"error_msg"},
          errMessage),

          React.createElement(
            'button',
            {class:"submit_button bouton_salle", onClick:()=>{accueilStore.ajouterSalle()}},
            'Ajouter une succursale'),
          
          ),
  )
      )

     
  }
)