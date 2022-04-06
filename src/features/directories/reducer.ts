import { combineReducers } from 'redux';
import { default as employeesReducer } from './employees/reducer';

export default combineReducers({ employees: employeesReducer });
