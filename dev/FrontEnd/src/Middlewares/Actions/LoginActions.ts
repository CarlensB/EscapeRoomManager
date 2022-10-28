import { makeAutoObservable } from "mobx";

export enum ActivePage {
    Login= 1,
    CreateAccount= 2,
    Loggedin= 3
}

export class LoginPageActions {

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
        this.LoginPageActive = ActivePage.Loggedin

        // let formData = new FormData();
        // formData.append("username", this.loginInfos.username);
        // formData.append("password", this.loginInfos.password);
        
        
    //     try {
    //         fetch('http://127.0.0.1:5000/hello',
    //         {
    //             method: 'POST',
    //             body: formData
    //         })
    //   .then(response => response.json())
    //   .then(response => {
    //     console.log(response);
    //     
    //   })
    //       } catch (e) {
    //           console.log("")
    //       }

    }

    CreateAcountAction() {
        if (this.CreateAccountError == true)
        this.CreateAccountError = false;
        else this.CreateAccountError=true;
        console.log(this.createAccountInfos.username)
        console.log(this.createAccountInfos.companyName)
        console.log(this.createAccountInfos.password)
        console.log(this.createAccountInfos.repeatpassword)
        // this.GoToLoginPage()
    }

};

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