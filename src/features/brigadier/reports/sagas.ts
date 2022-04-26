import { call, put, takeLatest, select } from 'redux-saga/effects';
import { selectProfile } from 'features/authentication/selectors';
import * as actions from './actions';
import { loadRequest as loadFlowsRequest } from 'features/admin/stock/flows/actions';
import { updateItemSuccess as updateFlowSuccess } from 'features/admin/stock/flows/actions';
import { updateItemSuccess as updateBrigadeSuccess } from 'features/admin/stock/brigades/actions';
import fetch from 'common/utils/fetch';

const URL = '/api/brigades';

function* getWorker(): any {
    const { id } = yield select(selectProfile);
    try {
        const { content: brigades } = yield call(fetch, `${URL}/`, 'GET');
        const brigade = brigades.find((i: any) => i.brigadier.id === id);
        yield put(actions.loadSuccess({ ...brigade }));
    } catch ({ message }) {
        yield put(actions.loadFailed({ message }));
    }
}

function* getWatcher() {
    yield takeLatest(actions.loadRequest.toString(), getWorker);
}

function* updateBrigadeWorker(): any {
    yield call(getWorker);
}

function* updateBrigadeWatcher() {
    yield takeLatest(
        updateFlowSuccess.toString(),
        updateBrigadeWorker
    );
}

function* updateFlowWorker(): any {
    yield put(loadFlowsRequest());
}

function* updateFlowWatcher() {
    yield takeLatest(
        updateBrigadeSuccess.toString(),
        updateFlowWorker
    );
}


const watchers = [getWatcher, updateBrigadeWatcher, updateFlowWatcher];

export default watchers;
