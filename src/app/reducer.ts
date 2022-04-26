import { combineReducers } from 'redux';

import { reducer as messageReducer } from 'features/message';
import { reducer as modalReducer } from 'features/modal';
import { reducer as authReducer } from 'features/authentication';

import { reducer as dirsReducer } from 'features/directories';
import { reducer as stockReducer } from 'features/admin/stock';
import { reducer as reportsReducer } from 'features/admin/reports';

import { reducer as brigadierReducer } from 'features/brigadier';

export default combineReducers({
    message: messageReducer,
    modal: modalReducer,
    auth: authReducer,
    dirs: dirsReducer,
    stock: stockReducer,
    adminReports: reportsReducer,
    brigadier: brigadierReducer,
});
