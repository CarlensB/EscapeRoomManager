import * as loginPageActions from './loginAction';
import { combineActions } from 'redux-actions';

const allActions = combineActions({
    loginPageActions: loginPageActions
})

export default allActions;