import { combineReducers } from 'redux';
import { default as flowsReducer } from './flows/reducer';
import { default as brigadesReducer } from './brigades/reducer';
import { default as warehousesReducer } from './warehouses/reducer';

export default combineReducers({
    flows: flowsReducer,
    brigades: brigadesReducer,
    warehouses: warehousesReducer,
});
