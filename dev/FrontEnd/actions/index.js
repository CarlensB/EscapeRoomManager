import {loginAction, newAccountAction} from './loginAction.js';
import { combineActions } from 'redux-actions';


const allActions = Redux.combineActions({
    loginAction: loginAction,
    newAccountAction: newAccountAction
})

export default allActions;