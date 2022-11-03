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
    CreateReservation= 4
}


class AccueilStore {
    public compagnie: Compagnie;
    public ActivePage: number = eActivePage.Accueil
    
    constructor() {
        makeAutoObservable(this);
        remotedev(this, { global: true, name: this.constructor.name });
        this.compagnie = new Compagnie("Escaparium", [], new newCentreInfos());
        this.compagnie.initialiserComp();
        console.log("On est loggedIn")
      }

    

}

const accueilStore = new AccueilStore();

export default accueilStore