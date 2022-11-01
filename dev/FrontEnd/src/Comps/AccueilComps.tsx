import { observer } from "mobx-react"
import React from "react"
import accueilStore from "../Middlewares/AccueilStore"


export const AppAccueil = observer(() => {
    return (React.createElement('div',
          {class: 'AppRight'},
          React.createElement(Centres),
          React.createElement(Salles)
          ))
}

)


const Centres = observer(() => {

    return(
        React.createElement(
            'div',
            {class:'ContainerCentres'},
            genererCentres()
        )
    )

    function genererCentres(){
        let listeCentres = accueilStore.compagnie
        let arrayCentres = []
        
        for (let i = 0; i<listeCentres.centres.length; i++)
        {
            if (i==listeCentres.selectionnee)
                arrayCentres.push(React.createElement(
                    'div',
                    {class: 'centre selected', onClick: () => {listeCentres.selectionnee = i}},
                    listeCentres.centres[i].nom
                ))
            else arrayCentres.push(React.createElement(
                'div',
                {class: 'centre', onClick: () => {listeCentres.selectionnee = i
                    console.log(accueilStore.ActivePage)}},
                listeCentres.centres[i].nom
            ))
        }
        return arrayCentres
    }
  }
)
const Salles = observer(() => {

    return(
        React.createElement(
            'div',
            {class:'Containersalles'},
            genererSalles()
        )
    )

    function genererSalles(){
        let arraySalles = []
        let listeSalles = accueilStore.compagnie.centres[accueilStore.compagnie.selectionnee].salles

        for (let i = 0; i<listeSalles.length; i++)
        {  
            arraySalles.push(React.createElement(
                'div',
                {class: 'ContainerSalle'},

                React.createElement(
                    'div',
                    {class: 'NomSalleNouveau'},
                    listeSalles[i].nom
                ),

                React.createElement(
                    'div',
                    {class: 'DescriptionSalleNouveau'},
                    listeSalles[i].description
                ),

                React.createElement(
                    'div',
                    {class: 'ContainerReservation'},
                    reservations()
                ),

            ))
            
        }
        return arraySalles
    }



    function reservations() {
        let arrayReservations = []
    
        for (let i = 0; i<6; i++){
            arrayReservations.push(
                React.createElement(
                    'div',
                    {class:'reservation'},
                    'untel a réservé'
                )
            )
        }
        return arrayReservations
    }

  }
)