import { combineReducers } from 'redux';
import { default as brigadeWarehouseReducer } from './warehouse/reducer';
import { default as brigadeReportsReducer } from './reports/reducer';

export default combineReducers({
    brigadeWarehouse: brigadeWarehouseReducer,
    brigadeReports: brigadeReportsReducer,
});
