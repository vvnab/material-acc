import { put, takeLatest } from 'redux-saga/effects';
import {
    actionItemSuccess as actionFlowsItemSuccess,
    loadRequest as loadFlowsRequest,
} from 'features/flows/actions';
import {
    loadRequest as loadRequestBrigades,
    actionItemSuccess as actionBrigadesItemSuccess,
} from 'features/directories/brigades/actions';
import { loadRequest as loadRequestWarehouses } from 'features/directories/warehouses/actions';

function* warehousesWorker(): any {
    yield put(loadRequestBrigades());
    yield put(loadRequestWarehouses());
}

function* warehousesWatcher() {
    yield takeLatest(actionFlowsItemSuccess.toString(), warehousesWorker);
}

function* flowsWorker(): any {
    yield put(loadFlowsRequest());
}

function* flowsWatcher() {
    yield takeLatest(actionBrigadesItemSuccess.toString(), flowsWorker);
}

const watchers = [warehousesWatcher, flowsWatcher];

export default watchers;
