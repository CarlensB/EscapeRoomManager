import {useSelector} from 'react-redux';
// import {allActions} from './actions';

class LoginPage extends React.Component {


  
  constructor(props) {
    // const isLogged = useSelector(state => state.loggedIn)
    // const createNewAccount = useSelector(state => state.newAccount)
    super(props);
    this.state = { wrongUsername: false,
                   message:"" 
                  };
  }

  

  render() {

      console.log('Jai like!!!')
      return (
        <div>
        <button type="submit" onClick={() => this.setState({wrongUsername: true})}>Submit</button>
        {this.state.wrongUsername ? <div className="error">Le mot de passe est erroné</div> : ''}
        </div>
        );  
    }
  
}

const domContainer = document.querySelector('#erreur');
const root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(LoginPage));