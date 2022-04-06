import { combineReducers } from 'redux';
import { reducer as authReducer } from 'features/authentication';
import { reducer as dirsReducer } from 'features/directories';

export default combineReducers({ auth: authReducer, dirs: dirsReducer });
