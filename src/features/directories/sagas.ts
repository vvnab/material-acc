import employeesWatchers from './employees/sagas';
import materialsWatchers from './materials/sagas';
import warehousesWatchers from './warehouses/sagas';
import workObjectsWatchers from './workObjects/sagas';
import workTypesWatchers from './workTypes/sagas';

const watchers = [
    ...employeesWatchers,
    ...materialsWatchers,
    ...warehousesWatchers,
    ...workObjectsWatchers,
    ...workTypesWatchers,
];

export default watchers;
