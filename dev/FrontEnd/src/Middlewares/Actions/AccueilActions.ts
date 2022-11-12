import { makeAutoObservable } from "mobx";
import { newCentreInfos } from "../AccueilStore";


class Salle{

    constructor(
        public nom: string = "",
        public prix: number = 0,
        public duree: number = 0,
        public intervalle: number = 0,
        public nbEmp: number = 0,
        public heureOuverture: number = 9,
        public heureFermeture: number = 9,
        public sallePrive: boolean = false,
        public description: string = "Description de la salle",
    )
    {}

}

class Centre{

    constructor(
        public nom: string = "Centre Montreal",
        public adresse: string = "Ville de la Compagnie",
        public salles: Salle[] = [],
    )
    {
        this.genererSalles()
    }

    genererSalles(){
        let a=new Salle()
        a.nom = "Salle 1"
        this.salles.push(a)
        let b=new Salle()
        b.nom = "Salle 2"
        this.salles.push(b)
    }

    getSalles(){
        return this.salles;
    }

    

}

export class Compagnie{

    constructor(
        public name: string = "Nom de Compagnie",
        private centres: Centre[],
        private selectionnee: number = 0,
    )
    {
        makeAutoObservable(this);
        this.initialiserComp()
    }
    initialiserComp(){
        let a = new Centre("Centre laval", "1 place ville-marie");
        a.nom = "Centre 1"
        a.genererSalles()
        a.genererSalles()
        this.centres.push(a)

        a = new Centre("Centre montreal", "1 place ville-marie");
        a.nom = "Centre 2"
        a.genererSalles()
        this.centres.push(a)
    }

    

    getCentres(){
        return this.centres;
    }

    getSelection(){
        return this.selectionnee;
    }

    setSelection(selection: number){
        this.selectionnee = selection;
    }

    getCurrentSalle(){
        return this.centres[this.selectionnee].getSalles();
    }

    ajouterCentre(infos: newCentreInfos){
        let centre = new Centre(infos.nom, infos.adresse);
        this.centres.push(centre);
    }

    
}





