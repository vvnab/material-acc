import { combineReducers } from 'redux';

import { reducer as messageReducer } from 'features/message';
import { reducer as modalReducer } from 'features/modal';
import { reducer as authReducer } from 'features/authentication';

import { reducer as dirsReducer } from 'features/directories';
import { reducer as flowsReducer } from 'features/flows';
import { reducer as reportsReducer } from 'features/reports';
import { reducer as tasksReducer } from 'features/tasks';

export default combineReducers({
    message: messageReducer,
    modal: modalReducer,
    auth: authReducer,
    dirs: dirsReducer,
    flows: flowsReducer,
    reports: reportsReducer,
    tasks: tasksReducer,
});
