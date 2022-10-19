import React, {useState} from 'react';
import reactDom from "react-dom";
import LoginStoreImpl from './Middlewares/LoginMW'


// interface LoginProps {
//     LoginStore: typeof LoginStoreImpl
// }

let LoginProps: {LoginStore: typeof LoginStoreImpl} = {
  LoginStore: LoginStoreImpl
};


const LoginPage: React.FC<typeof LoginProps> = ({LoginStore}) => {

  const [value, setValue] = useState<string>('');

  return <div>
    <input 
      value = {value}
      onChange={(event) => {setValue(event.target.value);}}
    type="text" />
    <button onClick={() => {
        LoginStore.VerifyLogin(value, value);
    }}>submitMOBX</button>
  </div>
}


const domContainer = document.querySelector('#erreur');
const root = reactDom.createRoot(domContainer);
root.render(React.createElement(LoginPage));

// source: https://www.youtube.com/watch?v=2ejs-uxSbAk
