import { configure, makeAutoObservable } from "mobx";
import remotedev from "mobx-remotedev"
import { Compagnie, newCentreInfos } from "./Actions/AccueilActions";
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


class AccueilStore {
    private compagnie: Compagnie;
    public ActivePage: number = eActivePage.Accueil
    
    constructor() {
        makeAutoObservable(this);
        remotedev(this, { global: true, name: this.constructor.name });
        this.compagnie = new Compagnie("Escaparium", [], new newCentreInfos());
        this.compagnie.initialiserComp();
        console.log("On est loggedIn")
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