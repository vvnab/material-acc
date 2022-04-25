import { combineReducers } from "redux";
import { default as employeesReducer } from "./employees/reducer";
import { default as materialsReducer } from "./materials/reducer";
import { default as warehousesReducer } from "./warehouses/reducer";
import { default as workObjectsReducer } from "./workObjects/reducer";
import { default as workTypesReducer } from "./workTypes/reducer";
import { default as vehiclesReducer } from "./vehicles/reducer";
import { default as brigadesReducer } from "./brigades/reducer";
import { default as roadSignsReducer } from "./roadSigns/reducer";

export default combineReducers({
  employees: employeesReducer,
  materials: materialsReducer,
  warehouses: warehousesReducer,
  workObjects: workObjectsReducer,
  workTypes: workTypesReducer,
  vehicles: vehiclesReducer,
  brigades: brigadesReducer,
  roadSigns: roadSignsReducer,
});
