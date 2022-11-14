import { configure, makeAutoObservable } from "mobx";
import remotedev from "mobx-remotedev"
import { LoginPageActions } from "./Actions/LoginActions";
configure({
    enforceActions: "never",
})

export enum ActivePage {
    Login= 1,
    CreateAccount= 2,
    Loggedin= 3
}


export class CreateAccountInfos{

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


export class LoginInfos{

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
    private loginpage: LoginPageActions
    private ActivePage: ActivePage = ActivePage.Login
    private createAccountInfos: CreateAccountInfos = new CreateAccountInfos()
    private loginInfos: LoginInfos = new LoginInfos()

    
    constructor() {
        makeAutoObservable(this);
        remotedev(this, { global: true, name: this.constructor.name });
        this.loginpage = new LoginPageActions()
      }

    getCurrentPage(){
        return this.ActivePage
    }

    getCreateAccountError(){
        return this.loginpage.getCreateAccountError()
    }

    getLoginError(){
        return this.loginpage.getLoginError()
    }

    GoToCreateAcountPage(){
        this.ActivePage = ActivePage.CreateAccount;
        this.createAccountInfos.reset()
        this.loginpage.GoToCreateAcountPage();
    }

    GoToLoginPage(){
        this.ActivePage = ActivePage.Login;
        this.loginInfos.reset()
        this.loginpage.GoToLoginPage();
    }

    Login(){
        let a = this.loginpage.LoginAction(this.loginInfos);
        if (a)
            this.ActivePage = ActivePage.Loggedin 
    }

    updateLoginInfos_username(infos:string){
        this.loginInfos.username = infos
    }

    updateLoginInfos_password(infos:string){
        this.loginInfos.password = infos
    }

    CreateAccount(){
        console.log(this.createAccountInfos.username)
        console.log(this.createAccountInfos.companyName)
        console.log(this.createAccountInfos.password)
        console.log(this.createAccountInfos.repeatpassword)

        this.loginpage.CreateAcountAction(this.createAccountInfos)
    }

    updateCreateAccountInfos_username(infos:string){
        this.createAccountInfos.username = infos
    }
    updateCreateAccountInfos_companyName(infos:string){
        this.createAccountInfos.companyName = infos
    }
    updateCreateAccountInfos_password(infos:string){
        this.createAccountInfos.password = infos
    }
    updateCreateAccountInfos_repeatpassword(infos:string){
        this.createAccountInfos.repeatpassword = infos
    }


    
    

}



const loginStore = new LoginStore();

export default loginStore
