import { combineReducers } from 'redux';
import { default as flowsReducer } from './flows/reducer';
// import { default as materialsReducer } from './materials/reducer';
import { default as warehousesReducer } from './warehouses/reducer';

export default combineReducers({
    flows: flowsReducer,
    // materials: materialsReducer,
    warehouses: warehousesReducer,
});
