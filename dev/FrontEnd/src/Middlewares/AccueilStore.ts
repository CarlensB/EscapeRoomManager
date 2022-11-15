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


class AccueilStore {
    private compagnie: Compagnie;
    private ActivePage: eActivePage = eActivePage.Accueil
    private newCentreInfos: newCentreInfos = new newCentreInfos()
    private modCentreInfos: newCentreInfos = new newCentreInfos()
    
    constructor() {
        makeAutoObservable(this);
        remotedev(this, { global: true, name: this.constructor.name });
        this.compagnie = new Compagnie("Escaparium", []);
        // this.compagnie.initialiserComp();
        console.log("On est loggedIn")
      }

    getActivePage(){
        return this.ActivePage;
    }

    setActivePage(page:eActivePage){
        this.ActivePage = page;
    }

    updateModCentreInfosNom(nom:string){
        this.newCentreInfos.nom = nom;
    }

    updateModCentreInfosAdresse(adresse:string){
        this.newCentreInfos.adresse = adresse;
    }

    modifierCentre(){
        let valide = (this.modCentreInfos.nom.length > 0 && this.modCentreInfos.nom.length > 0)
        if (valide)
        {
            this.compagnie.modifierCentre(this.modCentreInfos)
        }
        else console.log("Il n'y a pas assez d'infos :(")
    }

    updateNewCentreInfosNom(nom:string){
        this.newCentreInfos.nom = nom;
    }

    updateNewCentreInfosAdresse(adresse:string){
        this.newCentreInfos.adresse = adresse;
    }

    ajouterCentre(){
        let valide = (this.newCentreInfos.nom.length > 0 && this.newCentreInfos.nom.length > 0)
        if (valide)
        {
            this.compagnie.ajouterCentre(this.newCentreInfos)
        }
        else console.log("Il n'y a pas assez d'infos :(")
    }

    supprimerCentre(){
        this.compagnie.supprimerCentre();
    }

    getCompany(){
        return this.compagnie;
    }

    getCentres(){
        return this.compagnie.centres;
    }

    getSelection(){
        return this.compagnie.selectionnee;
    }

    setSelection(selection: number){
        this.compagnie.selectionnee = selection;
    }

    getSalles(){
        return this.compagnie.getCurrentCenterSalles();
    }

    setSalleSelection(salle:number){
        this.compagnie.setSalleSelection(salle);
    }

}

const accueilStore = new AccueilStore();

export default accueilStore