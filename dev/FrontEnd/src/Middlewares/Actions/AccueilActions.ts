import { makeAutoObservable } from "mobx";

// export enum ActivePage {
//     Login= 1,
//     CreateAccount= 2,
//     Loggedin= 3
// }

// export class LoginPageActions {

//     constructor(
//         public LoginError: boolean,
//         public CreateAccountError: boolean,

//     )
//     {
//         makeAutoObservable(this);
//         this.LoginError = false
//         this.CreateAccountError = false
//     }

//     GoToCreateAcountPage() {
//         this.CreateAccountError = false;

//     }

//     GoToLoginPage() {
//         this.CreateAccountError = false;


// };
// }

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
        public description: string = "",
    )
    {}
        // reset() {
        //     this.username = "";
        //     this.password = "";
        // }

}

class Centre{

    constructor(
        public nom: string = "Centre Montreal",
        public salles: Salle[] ,
    )
    {
        this.getSalles()
    }

    getSalles(){
        let a=new Salle()
        a.nom = "Salle 1"
        this.salles.push(a)
        let b=new Salle()
        b.nom = "Salle 2"
        this.salles.push(b)
    }

}

export class Compagnie{

    constructor(
        public name: string = "Nom de Compagnie",
        public centres: Centre[],
    )
    {
        this.initialiserComp()
    }
    initialiserComp(){
        let a = new Centre("Centre laval", []);
        a.nom = "Centre 1"
        a.getSalles()
        this.centres.push(a)

        a = new Centre("Centre montreal", []);
        a.nom = "Centre 2"
        a.getSalles()
        this.centres.push(a)
    }
}
