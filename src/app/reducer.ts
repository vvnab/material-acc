import { combineReducers } from 'redux';
import { reducer as authReducer } from 'features/authentication';

export default combineReducers({ auth: authReducer });
