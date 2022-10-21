import { autorun, configure, observable, makeAutoObservable } from "mobx";
import remotedev from "mobx-remotedev"
import { resetGlobalState } from "mobx/dist/internal";
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
        public loginInfos: LoginInfos,
        public createAccountInfos: CreateAccountInfos
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
        this.createAccountInfos.reset()
    }

    GoToLoginPage() {
        this.CreateAccountError = false;
        this.LoginError = false;
        this.LoginPageActive = ActivePage.Login
        this.loginInfos.reset()
    }

    LoginAction() {
        if (this.LoginError == true)
        this.LoginError = false;
        else this.LoginError=true;
        console.log(this.loginInfos.username)
        console.log(this.loginInfos.password)
    }

    CreateAcountAction() {
        if (this.CreateAccountError == true)
        this.CreateAccountError = false;
        else this.CreateAccountError=true;
        console.log(this.createAccountInfos.username)
        console.log(this.createAccountInfos.companyName)
        console.log(this.createAccountInfos.password)
        console.log(this.createAccountInfos.repeatpassword)
    }

};

class CreateAccountInfos{

    constructor(
        public username: string = "",
        public companyName: string = "",
        public password: string = "",
        public repeatpassword: string = ""
    )
    {}
        reset() {
            this.username = "";
            this.companyName = "";
            this.password = "";
            this.repeatpassword = "";
        }
    

}

class LoginInfos{

    constructor(
        public username: string = "",
        public password: string = "",
    )
    {}
        reset() {
            this.username = "";
            this.password = "";
        }

}

class LoginStore {
    public loginpage: LoginPage
    
    constructor() {
        makeAutoObservable(this);
        remotedev(this, { global: true, name: this.constructor.name });
        this.loginpage = new LoginPage(false, false, ActivePage.Login, new LoginInfos(), new CreateAccountInfos())
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
