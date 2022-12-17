import { configure, makeAutoObservable } from "mobx";
import remotedev from "mobx-remotedev"
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
            this.num_tel = "";
            this.courriel = "";
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
        public publique:boolean = true,
        public id:number = 33
        
        )
        {}
        reset() {
            this.hrOuv = "7:00",
            this.hrFer = "12:00",
            this.nom = "";
            this.prix = 0;
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
    private _modResInfo: ResInfos = new ResInfos();
    
    
    private _niveau_acces: number = 1
    private _id_emp: number = 0
    private _courriel: string = ""
    public _reservations:{}

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
            // console.log(response[0]["centre"])

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
                salleInfos.description = salles[j][3]
                salleInfos.nbJrMax = salles[j][5]
                salleInfos.prix = salles[j][6]
                salles[j][7] == 1 ? salleInfos.publique = true : false

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
        console.log(this._reservations)
    }

    matchReservation(horaire){
    let year = accueilStore.date.toLocaleString("default", { year: "numeric" });
    let month = accueilStore.date.toLocaleString("default", { month: "2-digit" });
    let day = accueilStore.date.toLocaleString("default", { day: "2-digit" });
    let date = year + "-" + month + "-" + day;
    let horaire_debut = horaire._hrDebut.replace("h", ":");

    if (horaire_debut.length < 4)
        horaire_debut = horaire_debut + "00"

    let key = date + " " + horaire_debut + ":00 " + this._compagnie.getCurrentCentre().nom + " " + horaire.nomSalle
    let reservation = this.reservations[key]
    return reservation
    }


    private calculer_qte_horaires_dans_salle(hr_debut:string, hr_fin:string, intervalle:string, nom_salle:string){
            let hr = hr_debut.split(":")
            let hr_debut_min = parseInt(hr[0])*60 + parseInt(hr[1])
            hr = hr_fin.split(":")
            let hr_fin_min = parseInt(hr[0])*60 + parseInt(hr[1])
            let temps_total = hr_fin_min - hr_debut_min
            hr = intervalle.split(":")
            let intervalle_min = parseInt(hr[0])*60 + parseInt(hr[1])
            // let nombre_dhoraires = Math.floor(temps_total / intervalle_min)
            // console.log("il y aura " + nombre_dhoraires.toString() + " slots d'horaires")

            let array_horaires = []

            for (let horaire_debut = hr_debut_min; horaire_debut<= (hr_fin_min - intervalle_min); horaire_debut += intervalle_min){
                let horaire = []
                horaire[0] = nom_salle
                horaire[1] = Math.floor(horaire_debut / 60).toString() + ":" + (horaire_debut%60).toString()
                let horaire_fin = horaire_debut + intervalle_min
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
        this._modCentreInfos.reset()
        this._modSalleInfos.reset()
        this._newSalleInfos.reset()
        this._newCentreInfos.reset()
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
            try {
                fetch('http://127.0.0.1:5000/modifier/centre',
                {
                    method: 'POST',
                    body: formData
                })
          .then(response => response.json())
          .then(response => {
              
              if (response == "Modification réussi")
              this._compagnie.modifierCentre(this._modCentreInfos)

        
          })
              } catch (e) {
                  console.log("CA MARCHE POOOH")
                  
              } 




            
        }
        else console.log("Il n'y a pas assez d'infos :(")
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
            try {
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
            msgSucces.innerHTML = "Centre enregistrer"
            msgSucces.addEventListener("click", (() =>{
                document.querySelector(".nouveauCentreFormulaire").removeChild(msgSucces)
            }))

            document.querySelector(".nouveauCentreFormulaire").append(msgSucces)
        
          })
              } catch (e) {
                  console.log("CA MARCHE POOOH")
                  
              } 


           
        }
        else console.log("Il n'y a pas assez d'infos :(")
    }

    supprimerCentre(){
        let id = this._compagnie.getCurrentCentreID()

        let formData = new FormData();
        formData.append("token", this.token)
        formData.append("id", id.toString());
        try {
            fetch('http://127.0.0.1:5000/supprimer/centre',
            {
                method: 'POST',
                body: formData
            })
      .then(response => response.json())
      .then(response => {
          if (response == "Suppression réussi")
          this._compagnie.supprimerCentre();
    
      })
          } catch (e) {
              console.log("CA MARCHE POOOH")        
          } 
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
        this._modSalleInfos.intervalle = duree
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

    ajouterSalle(){
        let valide = (this._newSalleInfos.nom.length > 0 && this._newSalleInfos.prix != null &&
            this._newSalleInfos.nbJrMax != null )
        let salles = this._compagnie.getCurrentCenterSalles()
        for (let i = 0; i< salles.length; i++){
            if (salles[i].nom == this._newSalleInfos.nom)
            valide = false
        }
        if (valide)
        {
            let formData = new FormData();
            formData.append("token", this.token)
            formData.append("nom", this._newSalleInfos.nom);
            formData.append("adresse", this._newSalleInfos.description);
            formData.append("centre", this._compagnie.getCurrentCentreID().toString());
            formData.append("nb_max_joueur", this._newSalleInfos.nbJrMax.toString());
            formData.append("prix", this._newSalleInfos.prix.toString());
            formData.append("prive", this._newSalleInfos.publique ? (1).toString() : (0).toString());

            try {
                fetch('http://127.0.0.1:5000/ajouter/salle',
                {
                    method: 'POST',
                    body: formData
                })
          .then(response => response.json())
          .then(response => {
              
            this._newSalleInfos.id = response[0][0]         
            let list_horaire = this.calculer_qte_horaires_dans_salle(this._newSalleInfos.hrOuv, this._newSalleInfos.hrFer, this._newSalleInfos.intervalle, this._newSalleInfos.nom)
            this._compagnie.ajouterSalle(this._newSalleInfos, list_horaire)


        
          })
              } catch (e) {
                  console.log("CA MARCHE POOOH")
                  
              }  
        }
        else console.log("Il n'y a pas assez d'infos :(")
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
            try {
                fetch('http://127.0.0.1:5000/modifier/salle',
                {
                    method: 'POST',
                    body: formData
                })
          .then(response => response.json())
          .then(response => {
              console.log(response)
            if (response == "Modification réussi")
            this._compagnie.modifierSalle(this._modSalleInfos)
        
          })
              } catch (e) {
                  console.log("CA MARCHE POOOH")
                  
              } 


           
        }
        else console.log("Il n'y a pas assez d'infos :(")
    }
        

    supprimerSalle(){



        let formData = new FormData();
        let id = this.getCurrentSalle().id.toString()
        formData.append("token", this.token)
        formData.append("id", this.getCurrentSalle().id.toString());
        try {
            fetch('http://127.0.0.1:5000/supprimer/salle',
            {
                method: 'POST',
                body: formData
            })
      .then(response => response.json())
      .then(response => {
        if (response == "Suppression réussi")
        this._compagnie.supprimerSalle()
    
      })
          } catch (e) {
              console.log("CA MARCHE POOOH")
              
          } 


        
    }



}

const accueilStore = new AccueilStore();

export default accueilStore