import { put, takeLatest } from 'redux-saga/effects';
import { actionItemSuccess } from 'features/flows/actions';
import { loadRequest as loadRequestBrigades} from 'features/directories/brigades/actions';
import { loadRequest as loadRequestWarehouses} from 'features/directories/warehouses/actions';

function* worker(): any {
    yield put(loadRequestBrigades());
    yield put(loadRequestWarehouses());
}

function* watcher() {
    yield takeLatest(actionItemSuccess.toString(), worker);
}

const watchers = [watcher];

export default watchers;
