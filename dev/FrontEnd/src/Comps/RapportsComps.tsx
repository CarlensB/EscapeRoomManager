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
        // rapport.genererRevenu()
        return (
            React.createElement(
                'div',
                {class: 'AppRapport'},
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
                    genererTitleRapport([], accueilStore.getCompany().name),
                    genererTitleRapport(statistiques[8]["Revenu"], "Revenu globale"),
                    genererTitleRapport(statistiques[8]["ReservationTotal"], "Nombre de réservation globale"),
                    genererTitleRapport(statistiques[8]["Potentiel"], "Potentielle de réservation globale"),
                    genererTitleRapport(statistiques[8]["Salle"], "Nombre de salle"),
                    genererTitleRapport(statistiques[8]["ClientTotal"], "Nombre de clients globale"),
                    genererTitleRapport(statistiques[8]["TauxOccupation"], "Taux d'occupation globale"),
                )
            )
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

    // Aller chercher les réservations
    let reservations = accueilStore.reservations
    let nombreTotalReservation = Object.keys(reservations).length
    let nbSalle = accueilStore.getSalles().length
    let lastReservationDate = Object.keys(reservations)[0].split(" ")
    let firstReservationDate = Object.keys(reservations).pop().split(" ")

    let donneesSTD = generateClientPerMonth(reservations)
    
    
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
        let index = nomSalle.indexOf(stuff["salle"])
        venteActuelle[index] += 1
        revenuTotaux[index] += stuff["prix_total"]
        totalJoueur += stuff["participant"]
        nombreJoueur[index].push(stuff["participant"])
        revenuMoyen[index].push(stuff["prix_total"])
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

    console.log(std)

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

    return [nomSalle, AffichagesOccupation, venteActuelle, revenuMoyen, revenuTotaux, nombreJoueur, performances, donneesSTD, infoCompagnie]
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


const genererGraph = () =>{

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

const generateClientPerMonth = (reservations) =>{
    let donnees = {}

    for (const i in Object.keys(reservations)){
        let key = Object.keys(reservations)[i]
        let date = key.split(" ")[0]
        date = date.split("-")[1]
        if (date in donnees){
            donnees[date] += parseInt(reservations[key]["participant"])
        }
        else{
            donnees[date] = parseInt(reservations[key]["participant"])
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