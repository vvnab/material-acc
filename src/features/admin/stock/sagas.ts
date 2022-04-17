// import { put, all, takeLatest } from 'redux-saga/effects';

import flowsWatchers from './flows/sagas';
// import materialsWatchers from './materials/sagas';
// import warehousesWatchers from './warehouses/sagas';

// import { loadRequest as employeesLoad } from 'features/directories/employees/actions';
// import { loadRequest as materialsLoad } from 'features/directories/materials/actions';
// import { loadRequest as warehousesLoad } from 'features/directories/warehouses/actions';

// import * as actions from './actions';

// function* worker(action: any): any {
//     yield all([
//         put(employeesLoad()),
//         // put(materialsLoad()),
//         // put(warehousesLoad()),
//     ]);
// }

// function* watcher() {
//     yield takeLatest(actions.loadRequest.toString(), worker);
// }

const watchers = [
    ...flowsWatchers,
    // ...materialsWatchers,
    // ...warehousesWatchers,
];

export default watchers;
