// ===============================================
// Nom du fichier : AccueuilComp.tsx
// Ce fichier contient les composantes REACT
// necéssaires pour l'affichage de la page de
// rapports affichang les performances relatifs
// aux revenus des salles ainsi que les
// méthodes qui viennent avec.
// Auteur : Maxence
// Équipe : Carlens Belony et Maxence Guindon
// ===============================================

import { observer } from "mobx-react"
import React from "react"
import accueilStore, { eActivePage } from "../Middlewares/ControlleurApp"

export const AppRapport = observer(() => {

  return(
      React.createElement((Rapport))
    ) 
})

const Rapport = observer(() => {

    if(Object.keys(accueilStore.reservations).length > 0){

        let statistiques = genererStat()
        return (
            React.createElement(
                'div',
                {class: 'AppRapport'},
                React.createElement(
                    'div',
                    {class: "contenantInfoBoite"},
                    React.createElement(
                        'div',
                        {class:"RapportsBoite"},
                        genererTitleRapport(statistiques[0], "Salles"),
                        genererTitleRapport(statistiques[1], "Taux d'occupation"),
                        genererTitleRapport(statistiques[2], "Réservation par Salle"),
                        genererTitleRapport(statistiques[3], "Revenu moyen par Salle"),
                        genererTitleRapport(statistiques[4], "Revenu par Salle"),
                        genererTitleRapport(statistiques[5], "Taille moyen du groupe par salle"),
                        genererTitleRapport(statistiques[6], "Performances")
                    ),
                    React.createElement(
                        'div',
                        {class:"RapportsBoite"},
                        genererTitleRapport([], accueilStore.getCompany().getCurrentCentre().nom),
                        genererTitleRapport(statistiques[8]["Revenu"], "Revenu globale"),
                        genererTitleRapport(statistiques[8]["ReservationTotal"], "Nombre de réservation globale"),
                        genererTitleRapport(statistiques[8]["Potentiel"], "Potentielle de réservation globale"),
                        genererTitleRapport(statistiques[8]["Salle"], "Nombre de salle"),
                        genererTitleRapport(statistiques[8]["ClientTotal"], "Nombre de clients globale"),
                        genererTitleRapport(statistiques[8]["TauxOccupation"], "Taux d'occupation globale"),
                    ),
                ),
                genererGraph(statistiques[9]))
        )}
})

const genererStat = () => {
    // Génère toutes les stastiques à afficher
    
    let potentiels = []
    let nomSalle = []
    let venteActuelle = []
    let AffichagesOccupation = []
    let revenuTotaux = []
    let revenuMoyen = []
    let nombreJoueur = []
    let performances = []
    let totalJoueur = 0

    // nom du centre
    let centre = accueilStore.getCompany().getCurrentCentre().nom

    // Aller chercher les réservations
    let reservations = accueilStore.reservations
    let nombreTotalReservation = 0
    let nbSalle = accueilStore.getSalles().length
    let firstReservationDate = Object.keys(reservations)[0].split(" ")
    let lastReservationDate = Object.keys(reservations).pop().split(" ")

    let donneesSTD = generateClientPerMonth(reservations, centre)
    
    
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
    revenuTotaux = Array(nomSalle.length).fill(0, 0)
    performances = Array(nomSalle.length).fill(0, 0)
    revenuMoyen = Array(nomSalle.length).fill(0, 0)
    nombreJoueur = Array(nomSalle.length).fill(0, 0)
    
    for (let i = 0; i < revenuMoyen.length; i++){
        revenuMoyen[i] = new Array(1).fill(0)
        nombreJoueur[i] = new Array(1).fill(0)
    }
    
    // Déterminer le nombre de réservations par salles
    for (let resa in Object.values(reservations)){
        let stuff = Object.values(reservations)[resa]
        if(stuff["centre"] == centre){
            let index = nomSalle.indexOf(stuff["salle"])
            venteActuelle[index] += 1
            revenuTotaux[index] += stuff["prix_total"]
            totalJoueur += stuff["participant"]
            nombreJoueur[index].push(stuff["participant"])
            revenuMoyen[index].push(stuff["prix_total"])
            nombreTotalReservation += 1
        }
    }
    
    for (const i in revenuMoyen){
        let med = median(revenuMoyen[i])
        revenuMoyen[i] = med + "$"
        med = median(nombreJoueur[i])
        nombreJoueur[i] = med
    }
    
    let revenuCompagnie = revenuTotaux.reduce((accumulator, value) =>{
        return accumulator + value;
    }, 0);
    

    let std = standardDeviation(donneesSTD, totalJoueur)


    let potentielsTotal = potentiels.reduce((accumulator, value) =>{
        return accumulator + value
    },0)

    // Rapport pour la compagnie
    let infoCompagnie = {
        "Revenu": [revenuCompagnie+"$"],
        "ReservationTotal": [nombreTotalReservation],
        "Potentiel": [potentielsTotal],
        "Salle": [nbSalle],
        "ClientTotal": [totalJoueur],
        "TauxOccupation": [((nombreTotalReservation/potentielsTotal)*100).toFixed(2)+"%"]
    }

    // Formater l'affichage
    for (const i in venteActuelle){
        AffichagesOccupation.push(((venteActuelle[i]/potentiels[i])*100).toFixed(2)+"%")
    }

    for (const i in revenuTotaux){
        performances[i] = (((revenuTotaux[i]/revenuCompagnie)*100).toFixed(2)+"%")
        revenuTotaux[i] = revenuTotaux[i] + "$"
    }

    return [nomSalle, AffichagesOccupation, venteActuelle, revenuMoyen, revenuTotaux, nombreJoueur, performances, donneesSTD, infoCompagnie, std]
}

const genererTitleRapport = (array, title) =>{
    return(
        React.createElement(
            'div',
            {class: "RapportsInfo"},
            React.createElement(
                'div',
                {class: "RapportsTitre"},
                title
            ),
            genererLineRapport(array)
        ))
}

const genererLineRapport = (array) =>{
    let listeDiv = []
    for (const i in array){
        listeDiv.push(React.createElement(
            'div',
            {class: "RapportsPourcentage"},
            array[i]
        ))
    }
    return listeDiv
}

const month = {
    '01': "janv.",
    '02': "févr.",
    '03': "mars",
    '04': "avr.",
    '05': "mai",
    '06': "juin",
    '07': "juill.",
    '08': "août",
    '09': "sept.",
    '10': "oct.",
    '11': "nov.",
    '12': "déc."
}

const generateData = (dataArray, keyArray, direction) =>{
    let divList = []

    for (let i = 0; i < dataArray.length; i++){
        //let display = "block"
        let height = (0).toString() + "%"
        let backgroundColor = "rgb(85, 207, 111)"
        let value = ""
        let dataTime = keyArray[i].split("-")
        if (direction == 'top' && dataArray[i] >= 0)
        {
            height = ((dataArray[i]/4)*100).toString() + "%"
        }
        else if (direction == 'bottom' && dataArray[i] < 0){
            height = (((dataArray[i]*-1)/2)*100).toString() + "%"   
        }
        if (direction == 'bottom' && dataArray[i] > 0){
            value = [month[dataTime[1]], dataTime[0]-2000,].join("/")
        }
        else if (direction == 'top' && dataArray[i] <= 0){
            value = [month[dataTime[1]], dataTime[0]-2000,].join("/")
            height= "10%"
            backgroundColor = "rgba(0,0,0,0)"
        }
        divList.push(
            React.createElement(
                'div',
                {class:"dataGraph", style:{height:height, backgroundColor:backgroundColor}},
                value
            )
        )
    }

    return divList
}

const generateLegendYAxis = (data) =>{
    let divList = []
    for (let i = 0; i < data; i++){
        divList.push(
            React.createElement(
                'div',
                {class: "legendLadderGraph"},
                data-i
            )
        )
    }
    return divList
}

const genererGraph = (std) =>{
    return(
        React.createElement(
            'div',
            {class:"RapportGraph"},
            React.createElement(
              "h3",
              {class:"graphTitle"},
              "Le resultat des variations de cote z des clients en fonction des mois"  
            ),
            React.createElement(
                'div',
                {class: "topGraph"},
                React.createElement(
                    'div',
                    {class: "ladderGraph"},
                    generateLegendYAxis(3)
                ),
                generateData(Object.values(std), Object.keys(std), "top")
            ),
            React.createElement(
                'div',
                {class: "bottomGraph"},
                React.createElement(
                    'div',
                    {class: "ladderGraph"},
                    React.createElement(
                        'div',
                        {class:"legendLadderGraph bottom"},
                        '-1'
                    )
                ),
                generateData(Object.values(std), Object.keys(std), "bottom")
            )
        )
    )

}

/* _________________ Math function ____________________ */

const median = (array) =>{
    // Source pour le calcule de la médiane : 
    //source : https://masteringjs.io/tutorials/fundamentals/median
    if( array.length > 0){
        array.sort()
        let middle = Math.floor(array.length/2)
        let median = array.length % 2 == 1 ? array[middle] : (array[middle-1] + array[middle]) / 2
        return median
    }
    return
}

const generateClientPerMonth = (reservations, centre) =>{
    let donnees = {}

    for (const i in Object.keys(reservations)){
        if (reservations[Object.keys(reservations)[i]].centre == centre){
            let key = Object.keys(reservations)[i]
            let date = key.split(" ")[0]
            date = [date.split("-")[0], date.split("-")[1]].join("-")
            if (date in donnees){
                donnees[date] += parseInt(reservations[key]["participant"])
            }
            else{
                donnees[date] = parseInt(reservations[key]["participant"])
            }
        }
    }

    return donnees
} 

const standardDeviation = (info, totaux) =>{
    let std = 0
    let NombreMois = Object.keys(info).length

    let Moyenne = totaux/NombreMois

    let somme = 0

    let infoNormalisé = {}

    for (let i = 0; i < NombreMois ; i++){
        somme += (info[Object.keys(info)[i]] - Moyenne)**2
    }
    
    std = (somme/NombreMois)**(1/2)

    //standardisation
    for (let i = 0; i < NombreMois; i++){
        infoNormalisé[Object.keys(info)[i]] = (info[Object.keys(info)[i]] - Moyenne)/std
    }

    return infoNormalisé
}