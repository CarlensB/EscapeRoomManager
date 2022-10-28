import { configure, makeAutoObservable } from "mobx";
import remotedev from "mobx-remotedev"
import { LoginPageActions, ActivePage, LoginInfos, CreateAccountInfos } from "./Actions/LoginActions";
configure({
    enforceActions: "never",
})



class LoginStore {
    public loginpage: LoginPageActions

    
    constructor() {
        makeAutoObservable(this);
        remotedev(this, { global: true, name: this.constructor.name });
        this.loginpage = new LoginPageActions(false, false, ActivePage.Login, new LoginInfos(), new CreateAccountInfos())
      }

    

}



const loginStore = new LoginStore();

export default loginStore
