// ===============================================
// Nom du fichier : AccueuilComp.tsx
// Ce fichier contient les composantes REACT
// necéssaires pour l'affichage de la page d'accueil
// ainsi que les méthodes qui viennent avec.
// Auteur : Carlens Belony
// Équipe : Carlens Belony et Maxence Guindon
// ===============================================
import { observer } from "mobx-react"
import React from "react"
import accueilStore, { eActivePage } from "../Middlewares/ControlleurApp"


export const AppAccueil = observer(() => {
    return (React.createElement('div',
    {class: 'AppRight'},
    React.createElement(Calendrier),
    React.createElement(Centres),
    React.createElement(Salles)
    ))
}

)


const Calendrier = observer(() => {

    function getDate()
    {
    let year = accueilStore.date.toLocaleString("default", { year: "numeric" });
    let month = accueilStore.date.toLocaleString("default", { month: "2-digit" });
    let day = accueilStore.date.toLocaleString("default", { day: "2-digit" });
    let date = year + "-" + month + "-" + day;
    return date;
}
    
    

return(

    React.createElement(
        'div',
        {class: 'calendarContainer'},

        React.createElement(
            'div',
            {class:'labelContainer'},

            React.createElement(
                'div',
                {class: 'TitreCalendrier'},
                getDate())
        ),
        

        React.createElement(
            'div',
            {class:'labelContainerCalendar'},
        

            React.createElement(
                'button',
                {class: 'FlecheCalendar', onClick: () => {accueilStore.modify_date(-365)}},
                '<- Année'),

            React.createElement(
                'button',
                {class: 'FlecheCalendar', onClick: () => {accueilStore.modify_date(-30)}},
                '<- Mois'),

            React.createElement(
                'button',
                {class: 'FlecheCalendar', onClick: () => {accueilStore.modify_date(-7)}},
                '<- Semaine'),
            
            React.createElement(
                'button',
                {class: 'FlecheCalendar', onClick: () => {accueilStore.modify_date(-1)}},
                '<- Jour'),

            React.createElement(
                'button',
                {class: 'FlecheCalendar', onClick: () => {accueilStore.resetDate()}},
                "Aujourd'hui"),

            React.createElement(
                'button',
                {class: 'FlecheCalendar', onClick: () => {accueilStore.modify_date(1)}},
                'Jour ->'),

            React.createElement(
                'button',
                {class: 'FlecheCalendar', onClick: () => {accueilStore.modify_date(7)}},
                'Semaine ->'),
                
            React.createElement(
                'button',
                {class: 'FlecheCalendar', onClick: () => {accueilStore.modify_date(30)}},
                'Mois ->'),
                
                        
            React.createElement(
                'button',
                {class: 'FlecheCalendar', onClick: () => {accueilStore.modify_date(365)}},
                'Année ->')
        )

    )
)
})


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
                horaires[i].nomSalle = salle.nom
                let reservation = accueilStore.matchReservation(horaires[i])
                if (reservation == undefined)
                {
                let message = horaires[i].hrDebut + " à " + horaires[i].hrFin
                arrayReservations.push(
                    React.createElement(
                        'div',
                        {class:'reservation vide', onClick: () => {
                            accueilStore.selected_horaire = horaires[i]
                            accueilStore.ActivePage = eActivePage.CreateReservation
                        }},
                        message)
                    )
                }
                else {
                    let message = horaires[i].hrDebut + " à " + horaires[i].hrFin + "\n" +
                    reservation["nom_client"] + " " + reservation["participant"] + " participants"
                arrayReservations.push(
                    React.createElement(
                        'div',
                        {class: reservation["statut"] == 1 ? 'reservation vert' : 'reservation jaune', onClick: () => {
                            accueilStore.selected_horaire = horaires[i]
                            accueilStore.ActivePage = eActivePage.CreateReservation
                        }},
                        message)
                    )
                }
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