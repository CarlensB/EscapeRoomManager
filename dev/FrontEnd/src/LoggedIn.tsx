import { observer } from 'mobx-react';
import React from 'react';
import reactDom from "react-dom";
import { eActivePage } from './Middlewares/AccueilStore';
import './CSS/Accueil.css'
import { AppAccueil} from './Comps/AccueilComps'
import accueilStore from "./Middlewares/AccueilStore"
import { AppCreerSucursalle } from './Comps/CreerCentreComp';


const AccueilPageComp = observer(() => {
    

  return(
      React.createElement(
          'div',
          {class: 'App'},
          React.createElement(Menu),
          React.createElement((accueilStore.ActivePage == eActivePage.Accueil) ? AppAccueil : AppCreerSucursalle)
          
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
        if (accueilStore.ActivePage == eActivePage.Accueil)
        ArrayMenu.push(React.createElement('div',
        {class: 'menuItem selected', onClick: () => {accueilStore.ActivePage = eActivePage.Accueil}},
        'Accueil'))
        else ArrayMenu.push(React.createElement('div',
        {class: 'menuItem', onClick: () => {accueilStore.ActivePage = eActivePage.Accueil}},
        'Accueil'))
        
        if (accueilStore.ActivePage == eActivePage.CreateCentre)
        ArrayMenu.push(React.createElement('div',
        {class: 'menuItem selected', onClick: () => {accueilStore.ActivePage = eActivePage.CreateCentre}},
        'Gérer Succursales'))
        else ArrayMenu.push(React.createElement('div',
        {class: 'menuItem', onClick: () => {accueilStore.ActivePage = eActivePage.CreateCentre}},
        'Gérer Succursales'))

        if (accueilStore.ActivePage == eActivePage.CreateSalle)
        ArrayMenu.push(React.createElement('div',
        {class: 'menuItem selected', onClick: () => {accueilStore.ActivePage = eActivePage.CreateSalle}},
        'Gérer Salles'))
        else ArrayMenu.push(React.createElement('div',
        {class: 'menuItem', onClick: () => {accueilStore.ActivePage = eActivePage.CreateSalle}},
        'Gérer Salles'))

        return ArrayMenu
    }
  }
)









const domContainer = document.body;
const root = reactDom.createRoot(domContainer);
root.render(React.createElement(AccueilPageComp));