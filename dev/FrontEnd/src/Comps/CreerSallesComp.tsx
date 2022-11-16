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
  // if (accueilStore.compagnie.newCentreInfos.nom.length < 1 && accueilStore.compagnie.newCentreInfos.adresse.length < 1){
    // errMessage = "Il manque des informations";
    // }
  
    function genererOptionsHeures(ouverture){
        let durees = []
        for (let hr = (ouverture ? 7 : 12); hr < (ouverture ? 12 : 23); hr++){
          for (let minute = 0; minute <= 60; minute+15){
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

    function genererOptionsDuree(){
        let durees = []
        for (let hr =0; hr < 3; hr++){
          for (let minute = 0; minute < 60; minute+15){
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
          'Prix:'),
      
        React.createElement(
          'input',
          {type: 'number', name: 'prix', onChange:evt => {accueilStore.updateNewSalleInfosPrix(parseInt(evt.currentTarget.value))}},
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
          {name: 'duree', class:'dropdown', onChange:evt => {console.log(evt.value)}},
          genererOptionsDuree()),

      ),


      React.createElement(
        'div',
        {class:'labelContainer'},

        React.createElement(
          'label',
          {for: 'intervalle'},
          "Intervalles entre les réservations:"),
      
        React.createElement(
          'select',
          {name: 'duree', class:'dropdown', onChange:evt => {console.log(evt.value)}},
          genererOptionsDuree()),

      ),


      React.createElement(
        'div',
        {class:'labelContainer'},

        React.createElement(
          'label',
          {for: 'hrOuv'},
          "Heure d'ouverture:"),
      
        React.createElement(
          'select',
          {name: 'hrOuv', class:'dropdown', onChange:evt => {console.log(evt.value)}},
          genererOptionsHeures(true)),

      ),

      React.createElement(
        'div',
        {class:'labelContainer'},

        React.createElement(
          'label',
          {for: 'hrFerm'},
          "Heure de fermeture:"),
      
        React.createElement(
          'select',
          {name: 'hrFerm', class:'dropdown', onChange:evt => {console.log(evt.value)}},
          genererOptionsHeures(false)),

      ),


      React.createElement(
        'div',
        {class:'labelContainer'},

      React.createElement(
          'label',
          {for: 'nom'},
          'Salle privee ou non: '),

        React.createElement(
          'input',
          {type: 'checkbox', name: 'nom', onChange:evt => {
              console.log(evt.currentTarget.value)
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
              console.log(evt.currentTarget.value)
            }},
          null),
      ),








        React.createElement(
          'div',
          {class:"error_msg"},
          errMessage),

          ),
          React.createElement(
            'button',
            {class:"submit_button bouton_salle", onClick:()=>{            }},
            'Ajouter une succursale')

  )

) 
})