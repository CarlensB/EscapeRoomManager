// ===============================================
// Nom du fichier : ControlleurApp.tsx
// Ce fichier contient le Controlleur de l'app
// qui fait le lien entre la base de donnée et 
// le modèle ainsi que le modèle et les pages React.
// Auteur : Carlens Belony et Maxence Guindon
// Équipe : Carlens Belony et Maxence Guindon
// ===============================================
import { configure, makeAutoObservable } from "mobx";
import remotedev from "mobx-remotedev"
import { Form } from "react-router-dom";
import { Compagnie, Horaire} from "./Modele/ModeleApp";
configure({
    enforceActions: "never",
})

export enum eActivePage {
    Accueil= 1,
    CreateCentre= 2,
    CreateSalle=3,
    CreateReservation= 4,
    Login=5,
    Rapports=6
}

export class ResInfos{
    constructor(
        public nom: string = "",
        public nb_participants: number = 1,
        public num_tel: string = "",
        public courriel: string = "",
        public paye: boolean = false,
    )
    {}
        reset() {
            this.nom = "";
            this.nb_participants = 1;
            this.num_tel = "aucun";
            this.courriel = "aucun";
            this.paye = true;
        }
}


export class newCentreInfos{

    constructor(
        public nom: string = "",
        public adresse: string = "",
        public ville: string = "",
        public pays: string = "",
        public code_postal: string = "",
        public id: number = 99999999,
        public a_modifier: boolean = false,
    )
    {}
        reset() {
            this.nom = "";
            this.adresse = "";
            this.ville = "";
            this.pays = "";
            this.code_postal = "";
        }

}

export class SalleInfos{


    constructor(
        public nom: string = "",
        public description: string = "",
        public nbJrMax:number = 1,
        public prix:number = 0,
        public hrOuv:string = "7:00",
        public hrFer:string = "12:00",
        public intervalle:string = "0:15",
        public duree:string = "0:15",
        public publique:boolean = true,
        public id:number = 33
        
        )
        {}
        reset() {
            this.hrOuv = "7:00",
            this.hrFer = "12:00",
            this.nom = "";
            this.prix = 0;
            this.duree = "0:15",
            this.intervalle = "0:15",
            this.nbJrMax = 1;
            this.publique = true;
            this.description = ""
        }

}


class AccueilStore {
  
    
    private _compagnie: Compagnie;
    private _ActivePage: eActivePage = eActivePage.Accueil;
    private _newCentreInfos: newCentreInfos = new newCentreInfos()
    private _modCentreInfos: newCentreInfos = new newCentreInfos()
    private _newSalleInfos: SalleInfos = new SalleInfos()
    private _modSalleInfos: SalleInfos = new SalleInfos()
    private _id_compagnie: number = 0
    private _nom_complet: string = ""
    private _token: string = "non"
    private _selected_horaire:Horaire = null;
    private _date: Date = new Date();
    private _newResInfo: ResInfos = new ResInfos();
    private _modResInfo: ResInfos = new ResInfos();
    private selected_reservation = null;
    error_message: string = "";
    private _niveau_acces: number = 1
    private _id_emp: number = 0
    private _courriel: string = ""
    private _reservations:{}
    private _algo: boolean = false;
    private _algoNb:number = 2;
    private _infoAlgoNom: {} = {};
    private _infoAlgoDesc: {} = {};
    private _buffer: number = 15;


    public get buffer(): number {
        return this._buffer;
    }
    public set buffer(value: number) {
        this._buffer = value;
    }

    public get infoAlgoNom(): {} {
        return this._infoAlgoNom;
    }
    
    public get infoAlgoDesc(): {} {
        return this._infoAlgoDesc;
    }

    updateInfoNomAlgo(index:number, value:string){
        this._infoAlgoNom[index.toString()] = value 
    }

    updateInfoDescAlgo(index:number, value:string){
        this._infoAlgoDesc[index.toString()] = value 
    }

    public get algo(): boolean {
        return this._algo;
    }
    public set algo(value: boolean) {
        this._algo = value;
    }

    public get algoNb(): number {
        return this._algoNb;
    }
    
    public set algoNb(value: number) {
        this._algoNb = value;
    }
    
    algoGenererSalle(){
        this.error_message = "Chargement..."
        let formData = new FormData();
            // formData.append("token", this.token)
            let hr = this._newSalleInfos.hrOuv.split(":")
            let hr_debut_min = parseInt(hr[0])*60 + parseInt(hr[1])
            formData.append("h_start", hr_debut_min.toString())

            hr = this._newSalleInfos.hrFer.split(":")
            let hr_fin_min = parseInt(hr[0])*60 + parseInt(hr[1])
            formData.append("h_end", hr_fin_min.toString())

            hr = this._newSalleInfos.duree.split(":")
            let hr_duree_min = parseInt(hr[0])*60 + parseInt(hr[1])
            formData.append("duration", hr_duree_min.toString())

            hr = this._newSalleInfos.intervalle.split(":")
            let hr_intervalle_min = parseInt(hr[0])*60 + parseInt(hr[1])
            formData.append("interval", hr_intervalle_min.toString())
            formData.append("buffer", this.buffer.toString())
            formData.append("nb_room", this.algoNb.toString())

            
            
                fetch('http://127.0.0.1:5000/creation/horaire',
                {
                    method: 'POST',
                    body: formData
                })
          .then(response => response.json())
          .then(response => {
              
            

            for (let i = 0; i< response.length; i++){
                let horaire_algo = this.HoraireAlgoConverter(response[i][0], i, hr_duree_min)
                
                let valide = (this.infoAlgoDesc[i.toString()].length > 0 && this.infoAlgoDesc[i.toString()].length > 0)
                if (valide)
        {
            
            let formData = new FormData();
            formData.append("token", this.token)
            formData.append("nom", this.infoAlgoNom[i.toString()]);
            formData.append("description", this.infoAlgoDesc[i.toString()]);
            formData.append("centre", this._compagnie.getCurrentCentreID().toString());
            formData.append("nb_max_joueur", this._newSalleInfos.nbJrMax.toString());
            formData.append("prix", this._newSalleInfos.prix.toString());
            formData.append("prive", this._newSalleInfos.publique ? (1).toString() : (0).toString());

            
                fetch('http://127.0.0.1:5000/ajouter/salle',
                {
                    method: 'POST',
                    body: formData
                })
          .then(response => response.json())
          .then(response => {
            this._newSalleInfos.id = response[0][0]     
            this.ajouterHoraire(horaire_algo, response[0][0], i)
                 
            
          })

                
            }
            
        }
        
        setTimeout(() =>{ accueilStore.ActivePage = eActivePage.Accueil }, 2000)
            
          })
    }

    HoraireAlgoConverter(horaire, index, hr_duree_min){
        let liste = []
        for (let i = 0; i< horaire.length; i++){
            
            let testFloat = (parseFloat(horaire[i]).toFixed(2)).toString()
            let hr = horaire[i].toString()
            if (hr.includes(".")){
                hr = testFloat.split(".")
                hr = parseInt(hr[0]) * 60 + parseInt(hr[1].slice(0, 2)) / 100 * 60 
            }
            else
            hr = parseInt(hr) * 60         
            
            let nv_horaire = []
            nv_horaire[0] = this.infoAlgoNom[index.toString()]
            nv_horaire[1] = Math.floor(hr / 60).toString() + ":" + Math.floor(hr%60).toString()
            let horaire_fin = hr + hr_duree_min
            nv_horaire[2] = Math.floor(horaire_fin / 60).toString() + ":" + Math.floor(horaire_fin%60).toString()
            
            liste.push(nv_horaire)
        }

        return liste
}

    ajouterReservation() {
    
        let valide1 = (this._newResInfo.nom.length > 0 && this._newResInfo.courriel.length > 0 && this._newResInfo.num_tel.length > 0)
        if (valide1){
    
            let salle = this._compagnie.getSalleByName(this.selected_horaire.nomSalle)
            let date = this.convertDate()
    
            let formdata = new FormData()
            formdata.append("token", this.token)
            formdata.append("nomClient", this._newResInfo.nom)
            formdata.append("numTel", this._newResInfo.num_tel)
            formdata.append("statut", this._newResInfo.paye ? "1" : "0")
            formdata.append("salle", salle.id.toString())
            formdata.append("nbPersonne", this._newResInfo.nb_participants.toString())
            formdata.append("courriel", this._newResInfo.courriel)
            formdata.append("prix_total", (this._newResInfo.nb_participants * salle.prix).toString())
            formdata.append("date", date)
    
            fetch('http://127.0.0.1:5000/ajouter/reservation',
        {
            method: 'POST',
            body: formdata
        })
        .then(response => response.json())
        .then(response => {
            let reservation = {}
            let centre_nom = this._compagnie.getCurrentCentre().nom
            reservation["centre"] = centre_nom
            reservation["courriel"] =response[0][6]
            reservation["date"] =response[0][8]
            reservation["id"] =response[0][0]
            reservation["nom_client"] =response[0][1]
            reservation["num_telephone"] =response[0][2]
            reservation["participant"] =response[0][5]
            reservation["prix_total"] =response[0][7]
            reservation["salle"] = salle.nom
            reservation["statut"] =response[0][3]
    
            date = response[0][8].split('T')
            let key = [date[0], date[1], reservation["centre"], reservation["salle"]].join(" ")
            this._reservations[key] = reservation
    
            this.ActivePage = eActivePage.Accueil
    
    })
    
    
    
      }
    }
        updateNewResInfoNom(value: string) {
            this._newResInfo.nom = value
          }
          updateNewResInfoParticipants(value: number) {
            this._newResInfo.nb_participants = value
          }
          updateNewResInfoNumeroTelephone(value: string) {
            this._newResInfo.num_tel = value
          }
          updateNewResInfoCourriel(value: string) {
            this._newResInfo.courriel = value
          }
          updateNewResInfoPaye(value: boolean) {
            this._newResInfo.paye = value
          }
        
        
      supprimerReservation() {
        let formdata = new FormData()
        formdata.append("token", this.token)
        formdata.append("id", this.selected_reservation["id"].toString())
        fetch('http://127.0.0.1:5000/supprimer/reservation',
        {
            method: 'POST',
            body: formdata
        })
        .then(response => response.json())
        .then(response => {
            if (response == "Suppression réussi"){
                let key = this.convertDate() + " " + this.selected_reservation["centre"] + " " + this.selected_reservation["salle"]
                delete this._reservations[key]
                this.ActivePage = eActivePage.Accueil
                this.selected_reservation = undefined
            }
            else this.error_message = "La suppression a échouée"
    
    })
      }
    
      convertDate(){
        
        let year = accueilStore.date.toLocaleString("default", { year: "numeric" });
        let month = accueilStore.date.toLocaleString("default", { month: "2-digit" });
        let day = accueilStore.date.toLocaleString("default", { day: "2-digit" });
        let hour = this.selected_horaire.hrDebut.split("h")
        if (hour[0].length < 2)
        hour[0] = "0" + hour[0]
        if (hour[1].length < 2)
        hour[1] = "00"
        hour[2] = "00"
    
        let date = year + "-" + month + "-" + day + " " + hour[0] + ":" + hour[1] + ":" + hour[2];
    
        return date
      }


      modifierReservation() {
       
        let valide1 = (this._modResInfo.nom.length > 0 && this._modResInfo.courriel.length > 0 && this._modResInfo.num_tel.length > 0)
        if (valide1){
    
            let salle = this._compagnie.getSalleByName(this.selected_horaire.nomSalle)
            let date = this.convertDate()
    
            let formdata = new FormData()
            formdata.append("token", this.token)
            formdata.append("nomClient", this._modResInfo.nom)
            formdata.append("numTel", this._modResInfo.num_tel)
            formdata.append("statut", this._modResInfo.paye ? "1" : "0")
            formdata.append("salle", salle.id.toString())
            formdata.append("nbPersonne", this._modResInfo.nb_participants.toString())
            formdata.append("courriel", this._modResInfo.courriel)
            formdata.append("prix_total", (this._modResInfo.nb_participants * salle.prix).toString())
            formdata.append("date", date)
            formdata.append("id", this.selected_reservation["id"].toString())
    
            
            
            fetch('http://127.0.0.1:5000/modifier/reservation',
            {
                method: 'POST',
                body: formdata
            })
            .then(response => response.json())
            .then(response => {
                if (response == "Modification réussi"){
                    
                    this.selected_reservation["nom_client"] = this._modResInfo.nom
                    this.selected_reservation["num_tel"] = this._modResInfo.num_tel
                    this.selected_reservation["statut"] = this._modResInfo.paye
                    this.selected_reservation["participant"] = this._modResInfo.nb_participants
                    this.selected_reservation["prix_total"] = this._modResInfo.nb_participants * salle.prix
    
    
    
                    let key = date + " " + this.selected_reservation["centre"] + " " + this.selected_reservation["salle"]
                    this.reservations[key] = this.selected_reservation
                    this.ActivePage = eActivePage.Accueil
                    this._modResInfo.reset()
                }
                else this.error_message = "Erreur coté serveur"
    
    })
        }
        else this.error_message = "Les informations sont erronnées"
        
      }

    public get reservations() {
        return this._reservations;
    }
    
    public get date(): Date {
        return this._date;
    }

    public modify_date(value: number) {
        let date = new Date(this._date);
        date.setDate(this._date.getDate() + value);
        this._date = date;
    }

    public resetDate(){
        let date = new Date();
        this._date = date;
    }

    public set token(value: string) {
        this._token = value;
    }

    public get token(): string {
        return this._token;
    }

    public get selected_horaire() {
        return this._selected_horaire;
    }
    public set selected_horaire(value) {
        this._selected_horaire = value;
    }

    
    constructor() {
        makeAutoObservable(this);
        remotedev(this, { global: true, name: this.constructor.name });
        this._compagnie = new Compagnie("Escaparium", []);
        let a = new Date();
    }
    
    public initialiserinfos(){
            
        var session = localStorage.getItem('session');
        if (session == null){
            this.ActivePage = eActivePage.Login
        }
        else{
            let var_session = session.split(",")
            this.token = var_session[2]
            this._id_compagnie = parseInt(var_session[3])
            this._niveau_acces = parseInt(var_session[4])

            let formdata = new FormData()
            formdata.append("token", this.token)
            fetch('http://127.0.0.1:5000/selectionner_all/reservation',
            {
                method: 'POST',
                body: formdata
            })
            .then(response => response.json())
            .then(response => {
        
            this.initialiserReservations(response)

})


            fetch('http://127.0.0.1:5000/api/compagnie_info/'+this._id_compagnie.toString(),
            {
                method: 'POST',
            })
            .then(response => response.json())
            .then(response => {
       
            this.initialiserCentres(response["centres"])
            this.initialiserSalles(response["salles"])
            this.initialiserHoraires(response["horaires"])
            this._id_compagnie = response["index"]
            this._nom_complet = response["compagnie"]

            
            
            

      })
            


    }

          
    }

    initialiserHoraires(horaires){
        
        for (let j = 0; j< horaires.length; j++){
            let id_salle = horaires[j][0][0]
            let salle = this._compagnie.getSalleById(id_salle)
            for (let i = 0; i< horaires[j].length; i++){
               let nomsalle = horaires[j][i][1]
                let hr_debut = horaires[j][i][2]
                let hr_fin = horaires[j][i][3]

                salle.ajouterHoraire([nomsalle, hr_debut, hr_fin])
            }
        }
        
    }

    initialiserSalles(salles){
        let centres = this.getCentres()

            for (let j = 0; j< salles.length; j++){
                let salleInfos = new SalleInfos()
                salleInfos.id = salles[j][0]
                salleInfos.nom = salles[j][1]
                salleInfos.description = salles[j][2]
                salleInfos.nbJrMax = salles[j][3]
                salleInfos.prix = salles[j][4]
                salles[j][5] == 1 ? salleInfos.publique = true : false

                let centre_id = salles[j][9]
                let index = this._compagnie.getCentreIndexById(centre_id)

                centres[index].ajouterSalle(salleInfos, [])
                
    }
}

    initialiserReservations(reservations){
        let dict = {} 
        for (let i = 0; i < Object.keys(reservations).length; i++)
        {
            let date = reservations[i]["date"]
            date = date.split('T')
            let key = [date[0], date[1], reservations[i]["centre"], reservations[i]["salle"]].join(" ")
            dict[key] = reservations[i]
        }
        this._reservations = dict
    }

    matchReservation(horaire){
    let year = accueilStore.date.toLocaleString("default", { year: "numeric" });
    let month = accueilStore.date.toLocaleString("default", { month: "2-digit" });
    let day = accueilStore.date.toLocaleString("default", { day: "2-digit" });
    let date = year + "-" + month + "-" + day;
    let horaire_debut = horaire._hrDebut.replace("h", ":");

    if (horaire_debut.length < 4){
        if (horaire_debut.split(":")[1].length == 1)
        horaire_debut = horaire_debut + "0"
        else horaire_debut = horaire_debut + "00"
        if (horaire_debut.split(":")[0].length == 1)
        horaire_debut = "0" + horaire_debut
    }

        if (horaire_debut.split(":")[1].length == 1)
        horaire_debut = horaire_debut + "0"
    

    let key = date + " " + horaire_debut + ":00 " + this._compagnie.getCurrentCentre().nom + " " + horaire.nomSalle
    let reservation = this.reservations[key]
    this.selected_reservation = reservation
    return reservation
    }


    private calculer_qte_horaires_dans_salle(hr_debut:string, hr_fin:string, duree:string, nom_salle:string, intervalle:string){
            let hr = hr_debut.split(":")
            let hr_debut_min = parseInt(hr[0])*60 + parseInt(hr[1])
            hr = hr_fin.split(":")
            let hr_fin_min = parseInt(hr[0])*60 + parseInt(hr[1])

            hr = duree.split(":")
            let duree_min = parseInt(hr[0])*60 + parseInt(hr[1])

            hr = intervalle.split(":")
            let intervalle_min = parseInt(hr[0])*60 + parseInt(hr[1])


            let array_horaires = []

            for (let horaire_debut = hr_debut_min; horaire_debut<= (hr_fin_min - duree_min); horaire_debut += (duree_min + intervalle_min)){
                let horaire = []
                horaire[0] = nom_salle
                horaire[1] = Math.floor(horaire_debut / 60).toString() + ":" + (horaire_debut%60).toString()
                let horaire_fin = horaire_debut + duree_min
                horaire[2] = Math.floor(horaire_fin / 60).toString() + ":" + (horaire_fin%60).toString()
                array_horaires.push(horaire)
            }
            return array_horaires
            

    }

    private initialiserCentres(centres){
        for (let i = 0; i< centres.length; i++){
            let centreinfos = new newCentreInfos()
            centreinfos.nom = centres[i][1]
            centreinfos.id = centres[i][0]
            centreinfos.adresse = centres[i][3]
            centreinfos.ville = centres[i][4]
            centreinfos.pays = centres[i][5]
            centreinfos.code_postal = centres[i][6]
            centreinfos.ville == "ville" && centreinfos.adresse == "*** rue" ? centreinfos.a_modifier = true : centreinfos.a_modifier = false
            this._compagnie.ajouterCentre(centreinfos)
        }
        
    }
    
    
    public deconnecter(){
        window.localStorage.removeItem('session');
        this.ActivePage = eActivePage.Login   
    }
    
    public get ActivePage(): eActivePage {
        return this._ActivePage;
    }
    public set ActivePage(value: eActivePage) {
        this._ActivePage = value;
        this.error_message = ""
        this._modResInfo.reset()
        this._newResInfo.reset()
        this._modCentreInfos.reset()
        this._modSalleInfos.reset()
        this._newSalleInfos.reset()
        this._newCentreInfos.reset()
        for (let k in this._infoAlgoDesc) {
            delete this._infoAlgoDesc[k]
        }

        for (let l in this._infoAlgoNom) {
            delete this._infoAlgoDesc[l]
        }
    }

    updateModResInfoNom(value: string) {
        this._modResInfo.nom = value
      }
      updateModResInfoParticipants(value: number) {
        this._modResInfo.nb_participants = value
      }
      updateModResInfoNumeroTelephone(value: string) {
        this._modResInfo.num_tel = value
      }
      updateModResInfoCourriel(value: string) {
        this._modResInfo.courriel = value
      }
      updateModResInfoPaye(value: boolean) {
        this._modResInfo.paye = value
      }

    getCurrentCentreValideOuPas(){
        return this._compagnie.getCurrentCentrevalidity()
    }

    updateModCentreInfosNom(nom:string){
        this._modCentreInfos.nom = nom;
    }

    updateModCentreInfosAdresse(adresse:string){
        this._modCentreInfos.adresse = adresse;
    }

    updateModCentreInfosVille(ville:string){
        this._modCentreInfos.ville = ville;
    }

    updateModCentreInfosPays(pays:string){
        this._modCentreInfos.pays = pays;
    }
    updateModCentreInfosCodePostal(code_postal:string){
        this._modCentreInfos.code_postal = code_postal;
    }

    modifierCentre(){
        let valide1 = (this._modCentreInfos.nom.length > 0 && this._modCentreInfos.adresse.length > 0)
        let valide2 = (this._modCentreInfos.ville.length > 0 && this._modCentreInfos.pays.length > 0)
        let valide3 = (this._modCentreInfos.code_postal.length > 0)
        if (valide1 && valide2 && valide3)
        {
            let formData = new FormData();
            formData.append("token", this.token)
            formData.append("nom", this._modCentreInfos.nom);
            formData.append("compagnie", this._id_compagnie.toString());
            formData.append("adresse", this._modCentreInfos.adresse);
            formData.append("ville", this._modCentreInfos.ville);
            formData.append("pays", this._modCentreInfos.pays);
            formData.append("code_postal", this._modCentreInfos.code_postal);
            formData.append("id", this._compagnie.getCurrentCentreID().toString());
            
                fetch('http://127.0.0.1:5000/modifier/centre',
                {
                    method: 'POST',
                    body: formData
                })
          .then(response => response.json())
          .then(response => {
              
              if (response == "Modification réussi"){
              this._compagnie.modifierCentre(this._modCentreInfos)
              this.ActivePage = eActivePage.Accueil
              }
              else this.error_message = "Erreur dans les informations données"

        
          })
             




            
        }
        else this.error_message = "Erreur dans les informations données"
    }

    updateNewCentreInfosNom(nom:string){
        this._newCentreInfos.nom = nom;
    }

    updateNewCentreInfosAdresse(adresse:string){
        this._newCentreInfos.adresse = adresse;
    }

    updateNewCentreInfosVille(ville:string){
        this._newCentreInfos.ville = ville;
    }

    updateNewCentreInfosPays(pays:string){
        this._newCentreInfos.pays = pays;
    }
    updateNewCentreInfosCodePostal(code_postal:string){
        this._newCentreInfos.code_postal = code_postal;
    }

    ajouterCentre(){
        let valide1 = (this._newCentreInfos.nom.length > 0 && this._newCentreInfos.adresse.length > 0)
        let valide2 = (this._newCentreInfos.ville.length > 0 && this._newCentreInfos.pays.length > 0)
        let valide3 = (this._newCentreInfos.code_postal.length > 0)
        let centres = this._compagnie.centres

        for (let i = 0; i< centres.length; i++){
            if (centres[i].nom == this._newSalleInfos.nom)
            valide1 = false
        }


        if (valide1 && valide2 && valide3)
        {
            let formData = new FormData();
            formData.append("token", this.token)
            formData.append("nom", this._newCentreInfos.nom);
            formData.append("compagnie", this._id_compagnie.toString());
            formData.append("adresse", this._newCentreInfos.adresse);
            formData.append("ville", this._newCentreInfos.ville);
            formData.append("pays", this._newCentreInfos.pays);
            formData.append("code_postal", this._newCentreInfos.code_postal);
           
                fetch('http://127.0.0.1:5000/ajouter/centre',
                {
                    method: 'POST',
                    body: formData
                })
          .then(response => response.json())
          .then(response => {
            this._newCentreInfos.id = response[0][0]
            this._compagnie.ajouterCentre(this._newCentreInfos)
            let inputs = document.querySelectorAll("input")
            for(let i = 0; i < inputs.length; i++){
                inputs[i].value = ""
            }

            let msgSucces = document.createElement("div")
            msgSucces.innerHTML = "Centre enregistré!"
            msgSucces.addEventListener("click", (() =>{
                document.querySelector(".nouveauCentreFormulaire").removeChild(msgSucces)
            }))

            document.querySelector(".nouveauCentreFormulaire").append(msgSucces)
        
          })
              


           
        }
        else this.error_message = "Les infos sont erronés"
    }

    supprimerCentre(){
        let id = this._compagnie.getCurrentCentreID()

        let formData = new FormData();
        formData.append("token", this.token)
        formData.append("id", id.toString());
     
            fetch('http://127.0.0.1:5000/supprimer/centre',
            {
                method: 'POST',
                body: formData
            })
      .then(response => response.json())
      .then(response => {
          if (response == "Suppression réussi"){
          this._compagnie.supprimerCentre();
          this.ActivePage = eActivePage.Accueil
          }
          else this.error_message = "Erreur dans la suppression"
    
      })
          
    }

    getCompany(){
        return this._compagnie;
    }

    getCentres(){
        return this._compagnie.centres;
    }

    getCurrentCentre(){
        return this._compagnie.getCurrentCentre()
    }

    getSalleByName(name:string){
        return this._compagnie.getSalleByName(name)
    }

    getSelectionCentre(){
        return this._compagnie.selectionnee;
    }

    getSelectionSalle(){
        return this._compagnie.getSalleSelection()
    }

    setSelection(selection: number){
        this._compagnie.selectionnee = selection;
    }

    getSalles(){
        return this._compagnie.getCurrentCenterSalles();
    }

    setSalleSelection(salle:number){
        this._compagnie.setSalleSelection(salle);
    }

    getCurrentSalle(){
        return this._compagnie.getCurrentSalle();
    }
    
    updateNewSalleInfosNom(nom:string){
        this._newSalleInfos.nom = nom
    }

    updateNewSalleInfosPrix(prix:number){
        this._newSalleInfos.prix = prix
    }
    updateNewSalleInfosDuree(duree:string){
        this._newSalleInfos.duree = duree
    }

    updateNewSalleInfosIntervalle(duree:string){
        this._newSalleInfos.intervalle = duree
    }

    updateNewSalleInfosHrOuverture(hr:string){
        this._newSalleInfos.hrOuv = hr
    }

    updateNewSalleInfosHrFermeture(hr:string){
        this._newSalleInfos.hrFer = hr
    }

    updateNewSalleInfosNbJoueur(nbJr:number){
        this._newSalleInfos.nbJrMax = nbJr
    }
    updateNewSalleInfosPublique(publique:boolean){
        this._newSalleInfos.publique = publique
    }
        
    updateNewSalleInfosDescription(description:string){
        this._newSalleInfos.description = description
    }

    updatemodSalleInfosNom(nom:string){
        this._modSalleInfos.nom = nom
    }

    updatemodSalleInfosPrix(prix:number){
        this._modSalleInfos.prix = prix
    }
    updatemodSalleInfosDuree(duree:string){
        this._modSalleInfos.duree = duree
    }

    updatemodSalleInfosNbJoueur(nbjr:number){
        this._modSalleInfos.nbJrMax = nbjr
    }
    updatemodSalleInfosPublique(publique:boolean){
        this._modSalleInfos.publique = publique
    }

    updatemodSalleInfosDescription(description:string){
        this._modSalleInfos.description = description
    }
    
    ajouterHoraire (listeHoraire, id=null, index=null){
        let formData = new FormData()
        formData.append("token", this.token)
        id == null ? formData.append("id_salle", this._newSalleInfos.id.toString()) : formData.append("id_salle", id)
        for (let i =0; i < listeHoraire.length; i++){
            formData.append("horaire"+[i], listeHoraire[i])
        }
        console.log("ici", listeHoraire)

       
            fetch('http://127.0.0.1:5000/ajouter/horaire', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(response => {
                if (index != null){
                this._newSalleInfos.nom = this._infoAlgoNom[index.toString()]
                this._newSalleInfos.description = this._infoAlgoDesc[index.toString()]
                }
                this._compagnie.ajouterSalle(this._newSalleInfos, listeHoraire)
                this.ActivePage = eActivePage.Accueil
            })
       
    }

    ajouterSalle(){
        if (this.algo){
            this.algoGenererSalle()
        }
        else{
        let valide = (this._newSalleInfos.nom.length > 0 && this._newSalleInfos.prix != null &&
            this._newSalleInfos.nbJrMax != null )
        let salles = this._compagnie.getCurrentCenterSalles()
        for (let i = 0; i< salles.length; i++){
            if (salles[i].nom == this._newSalleInfos.nom)
            valide = false
        }
        if (valide)
        {
            this.error_message = "Chargement..."
            let formData = new FormData();
            formData.append("token", this.token)
            formData.append("nom", this._newSalleInfos.nom);
            formData.append("description", this._newSalleInfos.description);
            formData.append("centre", this._compagnie.getCurrentCentreID().toString());
            formData.append("nb_max_joueur", this._newSalleInfos.nbJrMax.toString());
            formData.append("prix", this._newSalleInfos.prix.toString());
            formData.append("prive", this._newSalleInfos.publique ? (1).toString() : (0).toString());

            
                fetch('http://127.0.0.1:5000/ajouter/salle',
                {
                    method: 'POST',
                    body: formData
                })
          .then(response => response.json())
          .then(response => {
              
            this._newSalleInfos.id = response[0][0]         
            let list_horaire = this.calculer_qte_horaires_dans_salle(this._newSalleInfos.hrOuv, this._newSalleInfos.hrFer,
                 this._newSalleInfos.duree, this._newSalleInfos.nom, this._newSalleInfos.intervalle)
                 this.ajouterHoraire(list_horaire, response[0][0])
                 
            
          })
              
        }
        else this.error_message = "Erreur dans les informations données"
    }
    }

    modifierSalle(){
        let valide = (this._modSalleInfos.nom.length > 0 && this._modSalleInfos.prix != null)
        if (valide)
        {
            this._modSalleInfos.id = this.getCurrentSalle().id
            let formData = new FormData();
            formData.append("token", this.token)
            formData.append("nom", this._modSalleInfos.nom);
            formData.append("description", this._modSalleInfos.description);
            formData.append("centre", this.getCentres()[this.getSelectionCentre()].id.toString());
            formData.append("nbmaxJr", this._modSalleInfos.nbJrMax.toString());
            formData.append("prix", this._modSalleInfos.prix.toString());
            formData.append("privee", this._modSalleInfos.publique ? (1).toString() : (0).toString());
            formData.append("id", this._modSalleInfos.id.toString());
          
                fetch('http://127.0.0.1:5000/modifier/salle',
                {
                    method: 'POST',
                    body: formData
                })
          .then(response => response.json())
          .then(response => {
            if (response == "Modification réussi"){
            this._compagnie.modifierSalle(this._modSalleInfos)
            this.ActivePage = eActivePage.CreateCentre
            }
            else this.error_message = "Erreur dans les informations données"
        
          })
            


           
        }
        else this.error_message = "Erreur dans les informations données"
    }
        

    supprimerSalle(){



        let formData = new FormData();
        let id = this.getCurrentSalle().id.toString()
        formData.append("token", this.token)
        formData.append("id", this.getCurrentSalle().id.toString());
      
            fetch('http://127.0.0.1:5000/supprimer/salle',
            {
                method: 'POST',
                body: formData
            })
      .then(response => response.json())
      .then(response => {
        if (response == "Suppression réussi"){
            this._compagnie.supprimerSalle()
            this.ActivePage = eActivePage.CreateCentre
        }
        else this.error_message = "Erreur dans la suppression"
    
      })
         


        
    }



}

const accueilStore = new AccueilStore();

export default accueilStore