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
            "Il n'y a actuellement aucun centre d'enregistré. \n",
            "Cliquez ici pour en ajouter un."
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
            if (i==accueilStore.getSelectionCentre())
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
            {class: (accueilStore.getCentres().length > 0) ? 'Containersalles' : ''},
            genererSalles()
        )
    )

    function genererSalles(){
        let arraySalles = []

        if (accueilStore.getCentres().length < 1)
        return React.createElement(
            "div",
            {},
            null
        )
        else{
        let listeSalles = accueilStore.getSalles()
        
        if (accueilStore.getCurrentCentreValideOuPas())
        return React.createElement(
            "div",
            {class: "PasDeSalles", onClick: () => {accueilStore.ActivePage = eActivePage.CreateCentre}},
            "Veuillez valider les données de votre Center"
        )
        else if (listeSalles.length < 1)
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
                    reservations(listeSalles[i])
                ),

            ))
            
        }
        return arraySalles
    }
    }



    function reservations(salle) {
        
        let arrayReservations = []
        let horaires = salle.listeHoraire

        if (horaires.length != 0) {
            for (let i = 0; i<horaires.length; i++){
                let message = horaires[i].hrDebut + " à " + horaires[i].hrFin
                arrayReservations.push(
                    React.createElement(
                        'div',
                        {class:'reservation', onClick: () => {
                            accueilStore.selected_horaire_id = horaires[i].id
                            accueilStore.ActivePage = eActivePage.CreateReservation
                        }},
                        message)
                    )
                }
            }

        else{
            for (let i = 0; i<6; i++){
                arrayReservations.push(
                    React.createElement(
                        'div',
                        {class:'reservation'},
                        'untel a réservé'
                    )
                )
            }
    }
        return arrayReservations
    }

  }
)