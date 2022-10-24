import { autorun, configure, observable, makeAutoObservable } from "mobx";
import remotedev from "mobx-remotedev"
import { resetGlobalState } from "mobx/dist/internal";
import { Compagnie } from "./Actions/AccueilActions";
configure({
    enforceActions: "never",
})



class AccueilStore {
    public compagnie: Compagnie
    
    constructor() {
        makeAutoObservable(this);
        remotedev(this, { global: true, name: this.constructor.name });
        this.compagnie = new Compagnie("Escaparium", []);
        this.compagnie.initialiserComp();
      }

    

}