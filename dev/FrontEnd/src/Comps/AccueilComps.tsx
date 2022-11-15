import { observer } from "mobx-react"
import React from "react"
import accueilStore, { eActivePage } from "../Middlewares/AccueilStore"


export const AppAccueil = observer(() => {
    return (React.createElement('div',
    {class: 'AppRight'},
    React.createElement(Centres),
    React.createElement(Salles)
    ))
}

)



const Centres = observer(() => {

    if (accueilStore.getCentres().length < 1)
    return (
        React.createElement(
            'div',
            {class: "PasDeCentres", onClick: () => {accueilStore.ActivePage = eActivePage.CreateCentre}},
            "Il n'y a actuellement aucun centre \n",
            "cliquez içi pour en ajouter un"
        )
    )
    else
    return(
        React.createElement(
            'div',
            {class:'ContainerCentres'},
            genererCentres()
        )
    )

    function genererCentres(){
        let listeCentres = accueilStore.getCentres()
        let arrayCentres = []
        
        for (let i = 0; i<listeCentres.length; i++)
        {
            if (i==accueilStore.getSelection())
                arrayCentres.push(React.createElement(
                    'div',
                    {class: 'centre selected', onClick: () => {accueilStore.setSelection(i)}},
                    listeCentres[i].nom
                ))
            else arrayCentres.push(React.createElement(
                'div',
                {class: 'centre', onClick: () => {accueilStore.setSelection(i)}},
                listeCentres[i].nom
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

        if (accueilStore.getCentres().length < 1)
        return React.createElement(
            "div",
            {class: "PasDeCentres", onClick: () => {accueilStore.ActivePage = eActivePage.CreateCentre}},
            "Il n'y a pas de centres dans votre Compagnie.\n",
            "Cliquez ici pour en ajouter un"
        )
        else{
        let listeSalles = accueilStore.getSalles()
        

        if (listeSalles.length < 1)
        return React.createElement(
            "div",
            {class: "PasDeSalles", onClick: () => {accueilStore.ActivePage = eActivePage.CreateSalle}},
            "Il n'y a pas de salles dans votre centre.\n",
            "Cliquez ici pour en ajouter une"
        )

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