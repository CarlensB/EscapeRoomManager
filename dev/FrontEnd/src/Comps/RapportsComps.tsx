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
        let potentiels = []
        let nomSalle = []
        let venteActuelle = []
        let AffichagesOccupation = []

        // Aller chercher les réservations
        let reservations = accueilStore.reservations
        let nombreTotalReservation = Object.keys(reservations).length
        let nbSalle = accueilStore.getSalles().length
        let lastReservationDate = Object.keys(reservations)[0].split(" ")
        let firstReservationDate = Object.keys(reservations).pop().split(" ")

        // Déterminer la période d'activité
        let dateDebut = new Date(firstReservationDate[0])
        let dateFin = new Date(lastReservationDate[0])
        let totalTime = (dateFin.getTime() - dateDebut.getTime())/ (1000 * 3600 * 24)
        // Source :
        // https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/

        //Déterminer le potentiel de ventes des salles
        let salles = accueilStore.getSalles()

        // Déterminer % d'occupation
        for (const i in salles){
           let resaParJour = salles[i].listeHoraire.length
           potentiels.push(resaParJour * totalTime)
           nomSalle.push(salles[i].nom)
        }

        venteActuelle = Array(nomSalle.length).fill(0, 0)

        // Déterminer les ventes par salles
        for (let resa in Object.values(reservations)){
            let stuff = Object.values(reservations)[resa]
            let index = nomSalle.indexOf(stuff["salle"])
            venteActuelle[index] += 1
        }

        // Formater l'affichage
        for (const i in venteActuelle){
            AffichagesOccupation.push(((venteActuelle[i]/potentiels[i])*100).toFixed(2)+"%")
        }

    
        return (React.createElement(
            'div',
            {class: "RapportsNbSalle"},
            [nbSalle, nombreTotalReservation, nomSalle[0] + ":" + AffichagesOccupation[0], nomSalle[1] + ":" +AffichagesOccupation[1], nomSalle[2] + ":" +AffichagesOccupation[2]].join(" ")
        ))
    }
})
