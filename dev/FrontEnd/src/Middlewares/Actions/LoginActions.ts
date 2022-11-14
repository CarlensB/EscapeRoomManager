import { makeAutoObservable } from "mobx";
import { CreateAccountInfos, LoginInfos } from "../loginStore";



export class LoginPageActions {
    
    constructor(
        private LoginError: boolean = false,
        private CreateAccountError: boolean = false,
        )
        
        {
            makeAutoObservable(this);
            this.LoginError = false
            this.CreateAccountError = false
        }
        
    getCreateAccountError() {
        return this.CreateAccountError
    }

    getLoginError() {
        return this.LoginError
    }
    GoToCreateAcountPage() {
        this.CreateAccountError = false;
        this.LoginError = false;
        
    }

    GoToLoginPage() {
        this.CreateAccountError = false;
        this.LoginError = false;
        
    }

    LoginAction(loginInfos: LoginInfos) {
        // if (this.LoginError == true)
        // this.LoginError = false;
        // else this.LoginError=true;
        // this.LoginPageActive = ActivePage.Loggedin

        let formData = new FormData();
        formData.append("courriel", loginInfos.username);
        formData.append("mdp", loginInfos.password);
        
        
        try {
            fetch('http://127.0.0.1:5000/validation',
            {
                method: 'POST',
                body: formData
            })
      .then(response => response.json())
      .then(response => {
        console.log(response[1]);
        return true
      })
          } catch (e) {
              console.log("")
              this.LoginError = true;
              return false
          }

    }

    CreateAcountAction(createAccountInfos: CreateAccountInfos) {
        if (this.CreateAccountError == true)
        this.CreateAccountError = false;
        else this.CreateAccountError=true;
        

        let formData = new FormData();
        formData.append("nom", createAccountInfos.companyName);
        formData.append("info_paiement", "Visa");
        formData.append("courriel", createAccountInfos.username);
        formData.append("mdp", createAccountInfos.password);

        
        try {
            fetch('http://127.0.0.1:5000/enregistrement/compagnie',
            {
                method: 'POST',
                body: formData
            })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        
      })
          } catch (e) {
              console.log("")
          }


    }

};


