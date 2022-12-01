import { configure, makeAutoObservable } from "mobx";
import remotedev from "mobx-remotedev"
import { Compagnie} from "./Actions/AccueilActions";
configure({
    enforceActions: "never",
})

export enum eActivePage {
    Accueil= 1,
    CreateCentre= 2,
    CreateSalle=3,
    CreateReservation= 4,
    Login=5
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
        public duree:number = 0,
        public publique:boolean = true,
        public id:number = 33
        
        )
        {}
        reset() {
            this.nom = "";
            this.prix = 0;
            this.duree = 0;
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
    private _id_emp: number = 0
    private _courriel: string = ""
    private _nom_complet: string = ""
    private _niveau_acces: number = 1;

    
    constructor() {
        makeAutoObservable(this);
        remotedev(this, { global: true, name: this.constructor.name });
        this._compagnie = new Compagnie("Escaparium", []);
        // this.compagnie.initialiserComp();


        this.initialiserinfos()
        


        

    }


    initialiserSalles(){
        let centres = this.getCentres()
        for (let i = 0; i< centres.length; i++)
        try {
            let formData = new FormData();
            formData.append("id", centres[i].id.toString());
            fetch('http://127.0.0.1:5000/selectionner_all/salle',
            {
                method: 'POST',
                body: formData
            })
      .then(response => response.json())
      .then(response => {
        if (response.length > 0){
            for (let j = 0; j< response.length; j++){
                let salleInfos = new SalleInfos()
                salleInfos.id = response[j][0]
                salleInfos.nom = response[j][1]
                salleInfos.description = response[j][3]
                salleInfos.nbJrMax = response[j][5]
                salleInfos.prix = response[j][6]
                response[j][7] == 1 ? salleInfos.publique = true : false
                centres[i].ajouterSalle(salleInfos)
            }
        }
        

      })
          } catch (e) {
              console.log("Aucune Salle")
              
          }

          
          
    }

    private initialiserinfos(){
        try {
            fetch('http://127.0.0.1:5000/id_connection',
            {
                method: 'GET',
            })
      .then(response => response.json())
      .then(response => {
        if (response == false)
        this.ActivePage = eActivePage.Login
        else{
            this._id_emp = response[1]["id"]
            this._id_compagnie = response[1]["id_compagnie"]
            this._niveau_acces = parseInt(response[1]["niveau_acces"])
            this._courriel = response[1]["courriel"]
            this._nom_complet = response[1]["prenom"] + " " + response[1]["nom"]
            console.log(response[0])
            this.initialiserCentres(response[0])

        }
      })
          } catch (e) {
              console.log("Aucune variable de session")
              
          }

          
    }

    private initialiserCentres(centres){
        for (let i = 0; i< centres.length; i++){
            this._id_compagnie = centres[i][2]
            let centreinfos = new newCentreInfos()
            centreinfos.nom = centres[i][1]
            centreinfos.id = centres[i][0]
            centreinfos.adresse = centres[i][3]
            centreinfos.ville = centres[i][4]
            centreinfos.pays = centres[i][5]
            centreinfos.code_postal = centres[i][6]
            centres[i][4] == "ville" ? centreinfos.a_modifier = true : centreinfos.a_modifier = false
            this._compagnie.ajouterCentre(centreinfos)
        }
        this.initialiserSalles()
    }
    
    
    public deconnecter(){
        try {
            fetch('http://127.0.0.1:5000/deconnecter',
            {
                method: 'GET',
            })
            .then(response => response.json())
            .then(response => {
                if (response == true)
                this.ActivePage = eActivePage.Login
                
            })
        } catch (e) {
            console.log("Aucune variable de session")
            
        }     
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
    updateNewSalleInfosDuree(duree:number){
        this._newSalleInfos.duree = duree
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
    updatemodSalleInfosDuree(duree:number){
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
            this._compagnie.ajouterSalle(this._newSalleInfos)

        
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