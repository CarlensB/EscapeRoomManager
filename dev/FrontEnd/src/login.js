import App from './App'
const domContainer = document.querySelector('#erreur');
const root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(App));

// <div>
//         <button type="submit" onClick={() => this.setState({wrongUsername: true})}>Submit</button>
//         {this.state.wrongUsername ? <div className="error">Le mot de passe est erroné</div> : ''}
//         </div>
// onClick:() => {this.setState({wrongUsername: true})}

// const LoggIn = () => {
//   const logger = useSelector(state => state.loggedIn)
// }


  
  
  // constructor(props) {

  //   super(props);
  //   this.state = { wrongUsername: useSelector(state => state.loggedIn),
  //                  message:"" 
  //                 };
  // }   