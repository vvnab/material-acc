import { combineReducers } from 'redux';
import { default as brigadeWarehouseReducer } from './warehouse/reducer';

export default combineReducers({
    brigadeWarehouse: brigadeWarehouseReducer,
});
