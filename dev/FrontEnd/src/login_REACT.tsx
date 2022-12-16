import { observer } from 'mobx-react';
import React, {lazy, Suspense} from 'react';
import reactDom from "react-dom";
import { redirect } from 'react-router-dom';
import "./Middlewares/ControlleurLogin"
import loginStore, { ActivePage } from './Middlewares/ControlleurLogin';
import './CSS/Login.css';
import { LoginPageComp } from './Comps/LoginPageComp';
import { CreateAccountComp } from './Comps/CreerCompteComp';



const LoginPageComps = observer(() => {

  let currentPage = loginStore.getCurrentPage();

  if (currentPage == ActivePage.Login)
    return (React.createElement(
      'div',
      null, React.createElement(LoginPageComp)))
    else if (currentPage == ActivePage.CreateAccount)
    return (React.createElement(
      'div',
      null, React.createElement(CreateAccountComp)))
    else window.location.href = "../public/accueilEmp.html?username=Test"
    
}
)

let a = redirect("../public/accueilEmp.html?username={loginpage.loginInfos.username}")
// À TESTER



// source: https://www.youtube.com/watch?v=2ejs-uxSbAk
const domContainer = document.getElementById('pageWeb');
const root = reactDom.createRoot(domContainer);
root.render(React.createElement(LoginPageComps));