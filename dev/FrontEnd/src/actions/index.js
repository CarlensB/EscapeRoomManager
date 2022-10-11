import {loginAction, newAccountAction} from './loginAction.js';
import Redux from 'redux';
import { combineActions } from 'redux-actions';


const allActions = combineActions(loginAction,newAccountAction);

// const allActions = loginAction;

export default allActions;