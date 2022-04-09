import { combineReducers } from 'redux';
import { reducer as authReducer } from 'features/authentication';
import { reducer as dirsReducer } from 'features/directories';
import { reducer as modalReducer } from 'features/modal';
import { reducer as messageReducer } from 'features/message';

export default combineReducers({
    auth: authReducer,
    dirs: dirsReducer,
    modal: modalReducer,
    message: messageReducer,
});
