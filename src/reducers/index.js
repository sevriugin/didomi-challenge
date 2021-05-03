import { combineReducers } from 'redux';
import consentsReducer from './consentsReducer';
import reloadReducer from './reloadReducer';

export default combineReducers({
    consents: consentsReducer,
    reload: reloadReducer 
})