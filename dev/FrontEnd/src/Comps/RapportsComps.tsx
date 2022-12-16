import { observer } from "mobx-react"
import React from "react"
import accueilStore, { eActivePage } from "../Middlewares/ControlleurApp"

export const AppRapport = observer(() => {

  return(
      React.createElement(
          'div',
          {class: 'AppRight'},
          React.createElement(Rapport)
      )
  ) 
})

const Rapport = observer(() => {

    if(Object.keys(accueilStore.reservations).length > 0){
        return (React.createElement(
            'div',
            {class:"RapportsBoite"},
            genererRapport()
            
        ))
    }


    function genererRapport() {
        let reservations = accueilStore.reservations
        let nombreTotalReservation = Object.keys(reservations).length
        let nbSalle = accueilStore.getSalles().length
        let firstReservationDate = reservations

        return (React.createElement(
            'div',
            {class: "RapportsNbSalle"},
            [nbSalle, nombreTotalReservation, firstReservationDate].join(" ")
        ))
    }
})
