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

    
    constructor() {
        makeAutoObservable(this);
        remotedev(this, { global: true, name: this.constructor.name });
        this._compagnie = new Compagnie("Escaparium", []);
        // this.compagnie.initialiserComp();
        console.log("On est loggedIn")




    //     try {
    //         fetch('http://127.0.0.1:5000/session',
    //         {
    //             method: 'POST',
    //         })
    //   .then(response => response.json())
    //   .then(response => {
    //     console.log(response);
    //   })
    //       } catch (e) {
    //           console.log("Aucune variable de session")
              
    //       }












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
        if (valide1 && valide2 && valide3)
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

    updateModSalleInfosNbJoueur(nbjr:number){
        this._modSalleInfos.nbJrMax = nbjr
    }
    updatemodSalleInfosPublique(publique:boolean){
        this._modSalleInfos.publique = publique
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