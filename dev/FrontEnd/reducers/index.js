import loginReducer from './loginReducer';
import newAccountReducer from './newAccountReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    loggedIn: loginReducer,
    newAccount: newAccountReducer
})

export default allReducers;