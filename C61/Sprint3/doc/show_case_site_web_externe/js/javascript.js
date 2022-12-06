let compagnies = []
let info_compagnie = {}

window.addEventListener("load", () =>{
    let lieu =location.href
    if(lieu.includes("index.html")){
        setTimeout(get_api, 1000)
        get_compagnie_info(1)
    }
})

const get_api = () =>{
    
    fetch("http://localhost:5000/showcase", {
        method: "POST",
        body: null,
        async: false
    })
    .then(response => response.json())
    .then(result =>{
        document.querySelector(".compagnie").innerHTML = result[0][1]
    })
}

const get_compagnie_info = (id_compagnie) =>{

    url = "http://localhost:5000/api/compagnie_info/" + id_compagnie
    
    fetch(url, {
        method: "POST",
        body: null,
    })
    .then(response => response.json())
    .then(result =>{
        console.log(result)

        let listeReservation = []
        let listeCentres = null
        let listeSalles = null

        for (const horaire in result.horaires){
            // let horaireInfo = document.createElement("div")
            // horaireInfo.classList.add("horaireInfo")
            listeReservation.push(reservationFactory(result.horaires[horaire], result.salles))
        }
        
        listeCentres = centreFactory(result.centres)
        for (const s in result.salles){
            listeSalles = salleFactory(result.salles[s])
        }

        console.log(listeReservation)
        console.log(listeCentres)
        console.log(listeSalles)
        
        // batir les div de réservations
        let reservationStruct = document.createElement("div")
        reservationStruct.classList.add("reservationFrame")

        //div



    })
}

const reservationFactory = (listHoraires, listeSalles) =>{
    let reservationListe = []
    for (const h in listHoraires){
        let nom_salle = listHoraires[h][0]
        let heure_debut = listHoraires[h][1]
        let heure_fin = listHoraires[h][2]
        const found = listeSalles.find(element => element[1] == nom_salle)
        let centre = found[8]
        reservationListe.push(new Reservation(heure_debut, heure_fin, centre, nom_salle))

    }

    return reservationListe
}

const centreFactory = (centreInfo) =>{
    let centreListe = []
    for(const c in centreInfo){
        let nom = centreInfo[c][1]
        let adresse = [centreInfo[c][3], centreInfo[c][4], centreInfo[c][6], centreInfo[c][5]]
        adresse = adresse.join(" ")
        centreListe.push(new Centre(nom, adresse))
    }

    return centreListe
}

const salleFactory = (salleInfo) =>{
    let salleListe = []
    for (const s in salleInfo){
        let nom = salleInfo[1]
        let description = salleInfo[2]
        let partipant = salleInfo[3]
        let prix = salleInfo[4]
        let privee = salleInfo[5]
        salleListe.push(new Salle(nom, description, partipant, prix, privee))
    }
    return salleListe
}

const add_reservation = (reservation) =>{
    
    formData = new FormData()
    formData.append("reservation", reservation)

    fetch("/api/reservation", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(result =>{
        console.log(result)
    })
}

const change_page_for_compagnie = () =>{
    console.log(document.querySelector(".dropdown-content").textContent)
}

// JS Class
class Reservation{
    constructor(heureDebut, heureFin, nomSalle, centre, salle){
        this.heureDebut = heureDebut
        this.heureFin = heureFin
        this.nom = nomSalle
        this.centre = centre
        this.salle = salle
        this.prixTotal = null
    }

    obtenir_duree(){
        let hf = this.heureFin.split("h")
        let hd = this.heureDebut.split("h")
        if (hf[1] == 30){
            hf[1] = 0.5
        }
        if (hd[1] == 30){
            hd[1] = 0.5
        }

        return (parseFloat(hf[0]) + hf[1]) - (parseFloat(hd[0]) + hd[1])
    }

    reserver_plage(){
        // Fonction servant à réserver avant d'officialiser la réservation
    }

    officialiser_reservation(){
        //Fonction servant à officiliser la réservation
    }

    calculer_prix_total(){
        //Fonction servant à afficher le prix total de la réservation
    }
}

class Centre{
    constructor(nom, adresse){
        this.nom = nom
        this.adresse = adresse
    }

    retourner_info(){
        return (this.nom, this.adresse)
    }
}

class Salle{
    constructor(nom, description, participant, prix_unitaire, privee){
        this.nom = nom
        this.description = description
        this.particpant = participant
        this.prix_unitaire = prix_unitaire
        this.privee = privee
    }

    get_est_privee(){
        return this.privee
    }

    retourner_info(){
        return (this.nom, this.description, this.prix, this.particpant, this.prix_unitaire)
    }
    
}