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
    )
    {}
        reset() {
            this.nom = "";
            this.adresse = "";
        }

}

export class SalleInfos{

    constructor(
        public nom: string = "",
        public prix:number = 0,
        public duree:number = 0,
        public intervalle:number = 0,
        public nbEmp:number = 0,
        public hrOuverture:string = "8:00",
        public hrFermeture:string = "23:00",
        public publique:boolean = true,
        public description: string = ""
        
        )
        {}
        reset() {
            this.nom = "";
            this.prix = 0;
            this.duree = 0;
            this.intervalle = 0;
            this.nbEmp = 0;
            this.hrOuverture = "8:00";
            this.hrFermeture = "23:00";
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

    
    constructor() {
        makeAutoObservable(this);
        remotedev(this, { global: true, name: this.constructor.name });
        this._compagnie = new Compagnie("Escaparium", []);
        // this.compagnie.initialiserComp();
        console.log("On est loggedIn")
    }
    
    public get ActivePage(): eActivePage {
        return this._ActivePage;
    }
    public set ActivePage(value: eActivePage) {
        this._ActivePage = value;
    }

    updateModCentreInfosNom(nom:string){
        this._modCentreInfos.nom = nom;
    }

    updateModCentreInfosAdresse(adresse:string){
        this._modCentreInfos.adresse = adresse;
    }

    modifierCentre(){
        let valide = (this._modCentreInfos.nom.length > 0 && this._modCentreInfos.adresse.length > 0)
        if (valide)
        {
            this._compagnie.modifierCentre(this._modCentreInfos)
        }
        else console.log("Il n'y a pas assez d'infos :(")
    }

    updateNewCentreInfosNom(nom:string){
        this._newCentreInfos.nom = nom;
    }

    updateNewCentreInfosAdresse(adresse:string){
        this._newCentreInfos.adresse = adresse;
    }

    ajouterCentre(){
        let valide = (this._newCentreInfos.nom.length > 0 && this._newCentreInfos.adresse.length > 0)
        if (valide)
        {
            this._compagnie.ajouterCentre(this._newCentreInfos)
        }
        else console.log("Il n'y a pas assez d'infos :(")
    }

    supprimerCentre(){
        this._compagnie.supprimerCentre();
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

    setSelection(selection: number){
        this._compagnie.selectionnee = selection;
    }

    getSalles(){
        return this._compagnie.getCurrentCenterSalles();
    }

    setSalleSelection(salle:number){
        this._compagnie.setSalleSelection(salle);
    }

    getSalleSelection(){
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
    updateNewSalleInfosIntervalle(intervalle:number){
        this._newSalleInfos.intervalle = intervalle
    }
    updateNewSalleInfosNbEmp(nbEmp:number){
        this._newSalleInfos.nbEmp = nbEmp
    }
    updateNewSalleInfosPublique(publique:boolean){
        this._newSalleInfos.publique = publique
    }
    updateNewSalleInfosHrFermeture(hrFermeture:string){
        this._newSalleInfos.hrFermeture = hrFermeture
    }
    updateNewSalleInfosHrOuverture(hrOuverture:string){
        this._newSalleInfos.hrOuverture = hrOuverture
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
    updatemodSalleInfosIntervalle(intervalle:number){
        this._modSalleInfos.intervalle = intervalle
    }
    updatemodSalleInfosNbEmp(nbEmp:number){
        this._modSalleInfos.nbEmp = nbEmp
    }
    updatemodSalleInfosPublique(publique:boolean){
        this._modSalleInfos.publique = publique
    }
    updatemodSalleInfosHrFermeture(hrFermeture:string){
        this._modSalleInfos.hrFermeture = hrFermeture
    }
    updatemodSalleInfosHrOuverture(hrOuverture:string){
        this._modSalleInfos.hrOuverture = hrOuverture
    }
    updatemodSalleInfosDescription(description:string){
        this._modSalleInfos.description = description
    }

    ajouterSalle(){
        let valide = (this._newSalleInfos.nom.length > 0 && this._newSalleInfos.prix != null)
        if (valide)
        {
            this._compagnie.ajouterSalle(this._newSalleInfos)
        }
        else console.log("Il n'y a pas assez d'infos :(")
    }

    modifierSalle(){
        let valide = (this._modSalleInfos.nom.length > 0 && this._modSalleInfos.prix != null)
        if (valide)
        {
            this._compagnie.modifierSalle(this._modSalleInfos)
        }
        else console.log("Il n'y a pas assez d'infos :(")
    }

    supprimerSalle(){
        this._compagnie.supprimerSalle()
    }



}

const accueilStore = new AccueilStore();

export default accueilStore