import { makeAutoObservable } from "mobx";
import { runReactions } from "mobx/dist/internal";
import { useCallback } from "react";
import accueilStore from "../AccueilStore";
import { ActivePage, CreateAccountInfos, LoginInfos } from "../loginStore";



export class LoginPageActions {
    
    
    constructor(
        private LoginError: boolean = false,
        private CreateAccountError: boolean = false,
        public loggedin: boolean = false
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

    LoginAction = async (loginInfos: LoginInfos) => {

        let formData = new FormData();
        formData.append("courriel", loginInfos.username);
        formData.append("mdp", loginInfos.password);
           
        
        const resultat = await fetch('http://127.0.0.1:5000/validation',
            {
                method: 'POST',
                body: formData
            })


      const object = await resultat.json();
      return object

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


