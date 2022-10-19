import { autorun, configure, observable, makeAutoObservable } from "mobx";
import remotedev from "mobx-remotedev"
configure({
    enforceActions: "never",
})

export enum ActivePage {
    Login= 1,
    CreateAccount= 2
}

class LoginPage {

    constructor(
        public LoginError: boolean,
        public CreateAccountError: boolean,
        public LoginPageActive: number,
    )
    {
        makeAutoObservable(this);
        this.LoginPageActive = ActivePage.Login
        this.LoginError = false
        this.CreateAccountError = false
    }

    GoToCreateAcountPage() {
        this.CreateAccountError = false;
        this.LoginError = false;
        this.LoginPageActive = ActivePage.CreateAccount
    }

    GoToLoginPage() {
        this.CreateAccountError = false;
        this.LoginError = false;
        this.LoginPageActive = ActivePage.Login
    }

    LoginAction() {
        if (this.LoginError == true)
        this.LoginError = false;
        else this.LoginError=true;
    }

    CreateAcountAction() {
        if (this.CreateAccountError == true)
        this.CreateAccountError = false;
        else this.CreateAccountError=true;
    }

};

class LoginStore {
    public loginpage: LoginPage
    constructor() {
        makeAutoObservable(this);
        remotedev(this, { global: true, name: this.constructor.name });
        this.loginpage = new LoginPage(false, false, ActivePage.Login)
      }

// *fetchFriends() {
//     this.status = "pending";
//     try {
//       const response = yield fetch("/data/friends.json").then((r) => r.json());
//       this.friends = response.map(
//         ({ id, firstName, lastName }) => new Friend(id, firstName, lastName)
//       );
//       this.status = "success";
//     } catch (e) {
//       this.status = "error";
//     }
//   }
// }
}



const loginStore = new LoginStore();

export default loginStore
