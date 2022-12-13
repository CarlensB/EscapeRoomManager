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

        date = new Date()

        document.querySelector(".date").innerHTML = [date.getFullYear(), date.getMonth() + 1, date.getDate()+ 1].join("/")

        let listeReservation = []
        let listeCentres = []
        let listeSalles = []

        listeCentres = centreFactory(result.centres)
        listeSalles = salleFactory(result.salles)
        console.log(listeCentres)
        
        for (const horaire in result.horaires){
            listeReservation.push(reservationFactory(result.horaires[horaire], result.salles, listeSalles, listeCentres))
        }

            
        console.log(listeSalles)
        console.log(listeReservation)

        // batir le scroll pour les centres
        document.querySelector(".nomCentre").innerHTML = listeCentres[1]["nom"]

        // batir le scroll pour les salles
        document.querySelector(".nomSalle").innerHTML = listeSalles[0]["nom"]
        
        // batir les div de réservations
        for (const i in listeReservation){
            for (const j in listeReservation[i]){
                let nom = listeReservation[i][j].salle.nom
                let centre = listeReservation[i][j].centre.nom
                let classe = nom+centre
                let divResa = document.createElement("div")
                let divHD = document.createElement("div")
                let particpant = document.createElement("div")
                let prix = document.createElement("div")

                
                divResa.classList.add(classe)
                divResa.classList.add("reservations")
                divHD.classList.add("infoReservation")
                particpant.classList.add("infoReservation")
                prix.classList.add("infoReservation")
                
                divHD.innerHTML = listeReservation[i][j]["heureDebut"]
                particpant.innerHTML = listeReservation[i][j]["salle"]["particpant"]
                prix.innerHTML = listeReservation[i][j]["salle"]["prix_unitaire"] + "$"

                

                divResa.append(divHD)
                divResa.append(particpant)
                divResa.append(prix)
                
                divResa.style.display = "None"

                //Rendre nos div clickable
                divResa.onclick = () =>{
                    afficherBoiteReservation(divResa)
                }
                document.querySelector(".reservationFrame").append(divResa)
            }
        }


        affichageReservation()

        //Mettre affichage de reservation sur les boutons
        for (const i in 4){
            console.log(i)
        }
        
        let listeBtnGauche = document.querySelectorAll(".btnGauche")
        let listeBtnDroit = document.querySelectorAll(".btnDroit")
        for (const i in listeBtnGauche){
            try{
                let liste = []
                listeBtnGauche[i].style.cursor = "pointer"
                if (listeBtnGauche[i].classList.contains("btnCentre")){
                    liste = listeCentres
                    }
                else if(listeBtnGauche[i].classList.contains("btnSalle")){
                    liste = listeSalles
                }

                listeBtnGauche[i].onclick = () =>{
                    OnClickBtn(listeBtnGauche[i], liste)

                    enfant = document.querySelector(".reservationFrame").children
                    for (const i in enfant){
                        if (enfant[i].style.display != 'None'){
                            classe = "." + enfant[i].classList[0]
                            break
                        }
                    }
                    cacherReservation(classe)
                    affichageReservation()
                }
            }
            catch{
                console.log("fin des divs")
            }
                
        }

        for (const i in listeBtnDroit){
            try{
                listeBtnDroit[i].style.cursor = "pointer"
                let liste = []
                if (listeBtnDroit[i].classList.contains("btnCentre")){
                    liste = listeCentres
                    }
                else if(listeBtnDroit[i].classList.contains("btnSalle")){
                    liste = listeSalles
                }

                listeBtnDroit[i].onclick = () =>{
                    OnClickBtn(listeBtnDroit[i], liste)

                    enfant = document.querySelector(".reservationFrame").children
                    for (const i in enfant){
                        if (enfant[i].style.display != 'None'){
                            classe = "." + enfant[i].classList[0]
                            break
                        }
                    }
                    cacherReservation(classe)
                    affichageReservation()
                }
            }
            catch{
                console.log("fin des divs")
            }
        }
    })
}

const reservationFactory = (listHoraires, originSalles, listeSalles, listeCentres) =>{
    let reservationListe = []
    for (const h in listHoraires){
        let nom_salle = listHoraires[h][1]
        let heure_debut = listHoraires[h][2]
        let heure_fin = listHoraires[h][3]
        const found = originSalles.find(element => element[1] == nom_salle)
        let centreNom = found[8]
        const centre = listeCentres.find(element => element["nom"] == centreNom)
        const salle = listeSalles.find(element => element["nom"] == nom_salle)
        reservationListe.push(new Reservation(heure_debut, heure_fin, salle, centre))

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
        let nom = salleInfo[s][1]
        let description = salleInfo[s][2]
        let partipant = salleInfo[s][3]
        let prix = salleInfo[s][4]
        let privee = salleInfo[s][5]
        salleListe.push(new Salle(nom, description, partipant, prix, privee))
    }
    return salleListe
}

const addReservation = () =>{

    reservation = null
    // batir reservation
    
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

const afficherBoiteReservation = (div) =>{
    boiteInfo = document.querySelector(".boiteReservation")

    
    valeurParticipant = document.querySelector(".nbParticipant").innerHTML.split(" ")
    valeurPrix = div.children[2].textContent
    valeurHeureDebut = div.children[0].textContent
    valeurHeureFin = parseInt(div.children[0].textContent.split("h")[0]) + 1 + 'h' + div.children[0].textContent.split("h")[1] // changer 1 pour une variable de durée

    console.log(valeurParticipant)

    
    document.querySelector(".prix").innerHTML = parseInt(valeurPrix.split("$")[0]) * parseInt(valeurParticipant[5]) + "$"
    document.querySelector(".infoHoraire").innerHTML = valeurHeureDebut + "-" + valeurHeureFin


    //console.log(valeurParticipant, valeurPrix, valeurHeureDebut, valeurHeureFin)

    boiteInfo.style.display = "block"

}

const change_page_for_compagnie = () =>{
    console.log(document.querySelector(".dropdown-content").textContent)
}

// fonction affichage dom

const OnClickBtn = (btn, liste) => {
    value = btn.innerHTML
    salle = document.querySelector(".nomSalle").innerHTML

    for (const i in liste){
        if (liste[i].nom == salle && value == '&gt;'){
            try{
                index = parseInt(i) + 1
                document.querySelector(".nomSalle").innerHTML = liste[index].nom
            }
            catch{
                if (i == liste.length -1){
                    document.querySelector(".nomSalle").innerHTML = liste[0].nom
                }
                else{
                    index = liste.length - 1
                    document.querySelector(".nomSalle").innerHTML = liste[index].nom
                }
            }
            break
        }
        else if (liste[i].nom == salle && value == '&lt;') {
            try{
                index = parseInt(i) - 1
                document.querySelector(".nomSalle").innerHTML = liste[index].nom
            }
            catch{
                index = liste.length - 1
                document.querySelector(".nomSalle").innerHTML = liste[index].nom
            }
            break
        }
    } 
}

const cacherReservation = (classe) =>{
    listeDiv = document.querySelectorAll(classe)

    for (const i in listeDiv){
        try{
               listeDiv[i].style.display = "None"
            }
            catch{
                console.log("Un imbécile est parti")
            }
    }
}

const affichageReservation = () =>{
    c = document.querySelector(".nomCentre").innerHTML
    nom = document.querySelector(".nomSalle").innerHTML
    classe = "." + nom + c
    listeDiv = document.querySelectorAll(classe)

    console.log(listeDiv)

    {
        for (const i in listeDiv){
            try{
               listeDiv[i].style.display = "flex"

               
            //    if (listeReservation[i][j].heureDebut !=)
            //    divResa.onclick = () =>{

            //        afficherBoiteReservation()
            //    }

            }
            catch{
                console.log(listeDiv[i],"Un imbécile est parti")
            }
        }
    } 
}

// JS Class
class Reservation{
    constructor(heureDebut, heureFin, nomSalle, centre, salle){
        this.heureDebut = heureDebut
        this.heureFin = heureFin
        this.salle = nomSalle
        this.centre = centre
        //this.salle = salle
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