import { observer } from "mobx-react"
import React from "react"
import accueilStore, { eActivePage } from "../Middlewares/AccueilStore"


export const AppGererReservation = observer(() => {
    return (React.createElement('div',
          {class: 'AppRight'},
          //Todo ajouter bouton retour
          React.createElement(GererReservation)
          ))
})


const boutonRetour = observer(() => {
    return(
        React.createElement(
          'div',
          {class:'boutonRetour', onClick: () => {accueilStore.ActivePage = eActivePage.Accueil}},
          "Retourner à l'accueil")
    )
  }
)

const GererReservation = observer(() => {
    let reservation = accueilStore.matchReservationId(accueilStore.selected_horaire_id)
    return(
        React.createElement(
          'div',
          {class:'ContainerFormulaire'},
          reservation == null ? React.createElement(AjouterRerservation) : React.createElement(ModifierRerservation))
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
    let reservation = accueilStore.matchReservationId(accueilStore.selected_horaire_id)
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