import { call, put, takeLatest, select } from 'redux-saga/effects';
import { selectRange } from './selectors';
import * as actions from './actions';
import fetch from 'common/utils/fetch';

const URL = '/api/workReports';

function createSearch({ from, to }: { from: string; to: string }) {
    const search = new URLSearchParams({
        from,
        to,
    });

    return search;
}

function* getWorker(): any {
    const range = yield select(selectRange);
    const search = createSearch(range);
    try {
        const data = yield call(
            fetch,
            `${URL}/brigadeWorksSummary?${search}`,
            'GET'
        );
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
