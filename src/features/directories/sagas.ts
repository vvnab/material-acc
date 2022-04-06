import { put, all, takeLatest } from 'redux-saga/effects';

import employeesWatchers from './employees/sagas';
import materialsWatchers from './materials/sagas';
import warehousesWatchers from './warehouses/sagas';
import workObjectsWatchers from './workObjects/sagas';
import workTypesWatchers from './workTypes/sagas';

import { loadRequest as employeesLoad } from 'features/directories/employees/actions';
import { loadRequest as materialsLoad } from 'features/directories/materials/actions';
import { loadRequest as warehousesLoad } from 'features/directories/warehouses/actions';
import { loadRequest as workObjectsLoad } from 'features/directories/workObjects/actions';
import { loadRequest as workTypesLoad } from 'features/directories/workTypes/actions';

import * as actions from './actions';

function* worker(action: any): any {
    yield all([
        put(employeesLoad()),
        put(materialsLoad()),
        put(warehousesLoad()),
        put(workObjectsLoad()),
        put(workTypesLoad()),
    ]);
}

function* watcher() {
    yield takeLatest(actions.loadRequest.toString(), worker);
}

const watchers = [
    watcher,
    ...employeesWatchers,
    ...materialsWatchers,
    ...warehousesWatchers,
    ...workObjectsWatchers,
    ...workTypesWatchers,
];

export default watchers;
