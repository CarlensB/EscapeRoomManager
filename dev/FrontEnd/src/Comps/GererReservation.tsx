import { observer } from "mobx-react"
import React from "react"
import accueilStore, { eActivePage } from "../Middlewares/ControlleurApp"


export const AppGererReservation = observer(() => {
    return (React.createElement('div',
          {class: 'AppRight'},
          //Todo ajouter bouton retour
          React.createElement(GererReservation)
          ))
})



const GererReservation = observer(() => {
    let reservation = accueilStore.matchReservation(accueilStore.selected_horaire)
    return(
        React.createElement(
          'div',
          {class:'ContainerFormulaire'},
          reservation == undefined ? React.createElement(AjouterRerservation) : React.createElement(ModifierRerservation))
    )
  }
)

const AjouterRerservation = observer(() => {
    
    return(
        React.createElement(
          'div',
          null,
          
          React.createElement(
            'div',
            {class:'title'},
            'Ajouter une Réservation'
          ),

          )
    )
  }
)

const ModifierRerservation = observer(() => {
    
    return(
        React.createElement(
            'div',
            null,
            
            React.createElement(
              'div',
              {class:'title'},
              'Modifier une Réservation'
            ),
  
            )
    )
  }
)