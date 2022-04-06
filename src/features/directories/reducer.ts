import { combineReducers } from 'redux';
import { default as employeesReducer } from './employees/reducer';
import { default as materialsReducer } from './materials/reducer';
import { default as warehousesReducer } from './warehouses/reducer';
import { default as workObjectsReducer } from './workObjects/reducer';
import { default as workTypesReducer } from './workTypes/reducer';

export default combineReducers({
    employees: employeesReducer,
    materials: materialsReducer,
    warehouses: warehousesReducer,
    workObjects: workObjectsReducer,
    workTypes: workTypesReducer,
});
