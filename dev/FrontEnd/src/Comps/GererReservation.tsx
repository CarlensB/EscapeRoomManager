import { observer } from "mobx-react"
import React from "react"
import accueilStore, { eActivePage } from "../Middlewares/ControlleurApp"


export const AppGererReservation = observer(() => {
    return (React.createElement('div',
          {class: 'AppRight'},
          //Todo ajouter bouton retour
          React.createElement(GererReservation)
          ))
})



const GererReservation = observer(() => {
    let reservation = accueilStore.matchReservation(accueilStore.selected_horaire)
    return(
        React.createElement(
          'div',
          {class:'ContainerFormulaire'},
          reservation == undefined ? React.createElement(AjouterRerservation) : React.createElement(ModifierRerservation))
    )
  }
)

const AjouterRerservation = observer(() => {
    
    return(
        React.createElement(
          'div',
          null,
          
          React.createElement(
            'div',
            {class:'title'},
            'Ajouter une Réservation'
          ),

          )
    )
  }
)

const ModifierRerservation = observer(() => {
  let reservation = accueilStore.matchReservation(accueilStore.selected_horaire)
  let salle = accueilStore.getSalleByName(reservation["salle"])
    return(
        React.createElement(
            'div',
            null,
            
            React.createElement(
              'div',
              {class:'title'},
              'Modifier une Réservation'
            ),

            React.createElement(
              'div',
              {class:'labelContainer'},
        
              React.createElement(
                'label',
                {class:'label'},
                'Centre:'),
            
              React.createElement(
                'label',
                {class:'label'},
                reservation["centre"]),
            ),

            React.createElement(
              'div',
              {class:'labelContainer'},
        
              React.createElement(
                'label',
                {class:'label'},
                'Salle:'),
            
              React.createElement(
                'label',
                {class:'label'},
                reservation["salle"]),
            ),

            React.createElement(
              'div',
              {class:'labelContainer'},
        
              React.createElement(
                'label',
                {class:'label'},
                'Date:'),
            
              React.createElement(
                'label',
                {class:'label'},
                reservation["date"].replace("T", " à ")),
            ),

            React.createElement(
              'div',
              {class:'labelContainer'},
        
              React.createElement(
                'label',
                {class:'label'},
                'Prix total:'),
            
              React.createElement(
                'label',
                {class:'label'},
                reservation["prix_total"]),
            ),

            React.createElement(
              'div',
              {class:'labelContainer'},
        
              React.createElement(
                'label',
                {class:'label'},
                'Nom du client:'),
            
              React.createElement(
                'label',
                {class:'label'},
                reservation["nom_client"]),
            ),

            React.createElement(
              'div',
              {class:'labelContainer'},
        
              React.createElement(
                'label',
                {class:'label'},
                'Nombre de participants:'),
            
              React.createElement(
                'label',
                {class:'label'},
                reservation["participant"]),
            ),
            
            React.createElement(
              'div',
              {class:'labelContainer'},
        
              React.createElement(
                'label',
                {class:'label'},
                'Numéro de Téléphone:'),
            
              React.createElement(
                'label',
                {class:'label'},
                reservation["num_telephone"]),
            ),

            React.createElement(
              'div',
              {class:'labelContainer'},
        
              React.createElement(
                'label',
                {class:'label'},
                'Courriel:'),
            
              React.createElement(
                'label',
                {class:'label'},
                reservation["courriel"]),
            ),

            

            React.createElement(
              'div',
              {class:'labelContainer'},
        
              React.createElement(
                'label',
                {class:'label'},
                'Payé:'),
            
              React.createElement(
                'label',
                {class:'label'},
                reservation["statut"] == 1 ? 'Oui' : 'Non'),
            
            ),

            /* __INPUTS__ */

            React.createElement(
              'div',
              {class:'labelContainer'},
        
              React.createElement(
                'label',
                {class:'label'},
                'Nom du client:'),
            
                React.createElement(
                  'input',
                  {type: 'text', class:'nomSalleMod', onChange:evt => {accueilStore.updateModResInfoNom(evt.currentTarget.value)}},
                  null),
            ),

            React.createElement(
              'div',
              {class:'labelContainer'},
        
              React.createElement(
                'label',
                {class:'label'},
                'Nombre de participants:'),
            
                React.createElement(
                  'input',
                  {type: 'number', min:"1", max:salle.nbJrMax.toString(),  class:'nomSalleMod', onChange:evt => {accueilStore.updateModResInfoParticipants(parseInt(evt.currentTarget.value))}},
                  null),
            ),
            
            
            React.createElement(
              'div',
              {class:'labelContainer'},
        
              React.createElement(
                'label',
                {class:'label'},
                'Numéro de Téléphone:'),
            
                React.createElement(
                  'input',
                  {type: 'text', class:'nomSalleMod', onChange:evt => {accueilStore.updateModResInfoNumeroTelephone(evt.currentTarget.value)}},
                  null),
            ),
            

            React.createElement(
              'div',
              {class:'labelContainer'},
        
              React.createElement(
                'label',
                {class:'label'},
                'Courriel:'),
            
                React.createElement(
                  'input',
                  {type: 'text', class:'nomSalleMod', onChange:evt => {accueilStore.updateModResInfoCourriel(evt.currentTarget.value)}},
                  null),
            
            ),

            

            React.createElement(
              'div',
              {class:'labelContainer'},
        
              React.createElement(
                'label',
                {class:'label'},
                'Payé:'),
            
                React.createElement(
                  'input',
                  {type: 'checkbox', class:'nomSalleMod', onChange:evt => {accueilStore.updateModResInfoPaye(evt.currentTarget.checked)}},
                  null),
            ),

  
            )
    )
  }
)