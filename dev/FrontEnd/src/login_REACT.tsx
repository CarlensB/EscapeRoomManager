import { observer } from 'mobx-react';
import React, {lazy, Suspense} from 'react';
import reactDom from "react-dom";
import { redirect } from 'react-router-dom';
import { ActivePage } from './Middlewares/Actions/LoginActions';
import "./Middlewares/loginStore"
import loginStore from './Middlewares/loginStore';
import './CSS/Login.css';
import { LoginPageComp } from './Comps/LoginPageComp';
import { CreateAccountComp } from './Comps/CreerCompteComp';



const LoginPageComps = observer(() => {

  const {loginpage} = loginStore;

  if (loginpage.LoginPageActive == ActivePage.Login)
    return (React.createElement(
      'div',
      null, React.createElement(LoginPageComp)))
    else if (loginpage.LoginPageActive == ActivePage.CreateAccount)
    return (React.createElement(
      'div',
      null, React.createElement(CreateAccountComp)))
    else window.location.href = "../public/accueilEmp.html?username=" + loginpage.loginInfos.username
    
}
)

let a = redirect("../public/accueilEmp.html?username={loginpage.loginInfos.username}")



// source: https://www.youtube.com/watch?v=2ejs-uxSbAk
const domContainer = document.getElementById('pageWeb');
const root = reactDom.createRoot(domContainer);
root.render(React.createElement(LoginPageComps));