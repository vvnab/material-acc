import { call, put, takeLatest } from 'redux-saga/effects';
import * as actions from './actions';
import fetch from 'common/utils/fetch';

const URL = '/api/workReports';

function* getWorker(): any {
    try {
        const data = yield call(fetch, `${URL}/workObjectWorksSummary`, 'GET');
        yield put(actions.loadSuccess({ content: data }));
    } catch ({ message }) {
        yield put(actions.loadFailed({ message }));
    }
}

function* getWatcher() {
    yield takeLatest([actions.loadRequest.toString()], getWorker);
}

const watchers = [getWatcher];

export default watchers;
