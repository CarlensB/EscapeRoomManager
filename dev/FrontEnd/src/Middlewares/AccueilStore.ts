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
    public ActivePage: number = eActivePage.Accueil
    public newCentreInfos: newCentreInfos;
    
    constructor() {
        makeAutoObservable(this);
        remotedev(this, { global: true, name: this.constructor.name });
        this.compagnie = new Compagnie("Escaparium", []);
        this.newCentreInfos = new newCentreInfos()
        this.compagnie.initialiserComp();
        console.log("On est loggedIn")
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

    getCompany(){
        return this.compagnie;
    }

    getCentres(){
        return this.compagnie.getCentres();
    }

    getSelection(){
        return this.compagnie.getSelection();
    }

    setSelection(selection: number){
        this.compagnie.setSelection(selection);
    }

    getSalles(){
        return this.compagnie.getCurrentSalle();
    }

}

const accueilStore = new AccueilStore();

export default accueilStore