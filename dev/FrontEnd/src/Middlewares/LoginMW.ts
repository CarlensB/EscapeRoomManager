import { makeObservable, observable, action } from "mobx";

interface LoginItem {
    LoginError: boolean;
    CreationAccountError: boolean;
    LoginPageActive: boolean;
}

class LoginStoreImpl {

    LoginPage: LoginItem;

    constructor(){
        makeObservable(this, {
            LoginPage: observable,
            VerifyLogin: action
        });
    }

    VerifyLogin(username:string, password:string){
        console.log(username);
        console.log(password);
        if (this.LoginPage.LoginError == false) {
        this.LoginPage.LoginError=true
        } else this.LoginPage.LoginError = false;
    }

}
const LoginStore = new LoginStoreImpl()
export default LoginStore