import { observer } from 'mobx-react';
import React from 'react';
import reactDom from "react-dom";
import { eActivePage } from './Middlewares/AccueilStore';
import './CSS/Accueil.css'
import { AppAccueil} from './Comps/AccueilComps'
import accueilStore from "./Middlewares/AccueilStore"
import { AppCreerSucursalle } from './Comps/CreerCentreComp';


const AccueilPageComp = observer(() => {
    
    if (accueilStore.getActivePage() == eActivePage.Login){
        window.location.href = "../public/login.html"
    }
  return(
      React.createElement(
          'div',
          {class: 'App'},
          React.createElement(Menu),
          React.createElement((accueilStore.getActivePage() == eActivePage.Accueil) ? AppAccueil : AppCreerSucursalle)
          
      )
  ) 
})

const Menu = observer(() => {

    return(
        React.createElement(
            'div',
            {class:'ContainerMenu'},
            genererMenus()
        )
    )

    function genererMenus(){
        
        let ArrayMenu = []
        let active_page = accueilStore.getActivePage()

        ArrayMenu.push(React.createElement('div',
        {class: active_page == eActivePage.Accueil ? 'menuItem selected' : 'menuItem', onClick: () => {accueilStore.setActivePage(eActivePage.Accueil)}},
        'Accueil'))
        
        ArrayMenu.push(React.createElement('div',
        {class: active_page == eActivePage.CreateCentre ? 'menuItem selected' : 'menuItem', onClick: () => {accueilStore.setActivePage(eActivePage.CreateCentre)}},
        'Gérer Succursales'))
       
        ArrayMenu.push(React.createElement('div',
        {class: active_page == eActivePage.CreateSalle ? 'menuItem selected' : 'menuItem', onClick: () => {accueilStore.setActivePage(eActivePage.CreateSalle)}},
        'Gérer Salles'))

        ArrayMenu.push(React.createElement('div',
        {class: 'menuItem', onClick: () => {accueilStore.setActivePage(eActivePage.Login)}},
        'Déconnecter'))
        

        return ArrayMenu
    }
  }
)









const domContainer = document.body;
const root = reactDom.createRoot(domContainer);
root.render(React.createElement(AccueilPageComp));