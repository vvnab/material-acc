import { call, put, takeLatest, select, delay } from 'redux-saga/effects';
import * as actions from './actions';
import { selectFilter, selectPages } from './selectors';
import { showMessage } from 'features/message';
import { closeModal } from 'features/modal';
import fetch from 'common/utils/fetch';
import moment from 'moment';

const URL = '/api/workReports';

function createSearch(filter: any, addon?: any) {
    const search = new URLSearchParams({
        size: '15',
        sort: 'createdAt,desc',
        ...addon,
    });

    if (filter?.statuses && filter.statuses.length) {
        search.append('statuses', filter.statuses);
    }

    if (filter?.dateRange?.from) {
        search.append('workStartFrom', moment(filter.dateRange.from).toJSON());
    }

    if (filter?.dateRange?.to) {
        search.append('workEndTo', moment(filter.dateRange.to).toJSON());
    }

    if (filter?.brigadeId) {
        search.append('brigadeId', filter.brigadeId);
    }
    return search;
}

function* getNextPageWorker(): any {
    const filter = yield select(selectFilter);
    let { pageNumber, totalPages } = yield select(selectPages);

    if (pageNumber >= totalPages) {
        yield put(actions.loadFailed({ message: 'THE END' }));
        return;
    }
    const search = createSearch(filter, { page: ++pageNumber });
    try {
        const data = yield call(fetch, `${URL}/?${search}`, 'GET');
        yield put(actions.loadNextPageSuccess({ ...data }));
    } catch ({ message }) {
        yield put(actions.loadFailed({ message }));
    }
}

function* getNextPageWatcher() {
    yield takeLatest(actions.loadNextPageRequest.toString(), getNextPageWorker);
}

function* getWorker(): any {
    const filter = yield select(selectFilter);
    const search = createSearch(filter);
    try {
        const data = yield call(fetch, `${URL}/?${search}`, 'GET');
        yield put(actions.loadSuccess({ ...data }));
    } catch ({ message }) {
        yield put(actions.loadFailed({ message }));
    }
}

function* getWatcher() {
    yield takeLatest(
        [actions.loadRequest.toString(), actions.updateFilter.toString()],
        getWorker
    );
}

function* updateWorker(action: any): any {
    const { id } = action.payload;
    try {
        let data;
        if (id) {
            data = yield call(fetch, `${URL}/${id}`, 'PUT', action.payload);
        } else {
            data = yield call(fetch, `${URL}/`, 'POST', action.payload);
        }

        yield put(actions.updateItemSuccess({ ...data }));
        yield put(closeModal());
    } catch (ex: any) {
        yield put(
            actions.updateItemError({
                message: ex.message || 'Неизвестная ошибка',
            })
        );
        yield put(
            showMessage({
                type: 'error',
                text: ex.message || 'Неизвестная ошибка',
            })
        );
    }
}

function* updateWatcher() {
    yield takeLatest(actions.updateItemRequest.toString(), updateWorker);
}

function* actionWorker(action: any): any {
    const { id, type } = action.payload;

    try {
        const data = yield call(fetch, `${URL}/${id}/${type}`, 'PATCH');
        yield put(actions.updateItemSuccess({ ...data }));
    } catch ({ message }) {
        yield put(actions.updateItemError({ message }));
        yield put(
            showMessage({
                type: 'error',
                text: message,
            })
        );
    }
}

function* actionWatcher() {
    yield takeLatest(actions.actionItemRequest.toString(), actionWorker);
}

function* deleteWorker(action: any): any {
    const { id } = action.payload;
    try {
        yield call(fetch, `${URL}/${id}`, 'DELETE');
        yield put(actions.deleteItemSuccess(id));
        yield put(closeModal());
    } catch ({ message }) {
        yield put(actions.updateItemError({ message }));
    }
}

function* deleteWatcher() {
    yield takeLatest(actions.deleteItemRequest.toString(), deleteWorker);
}

function* updatePeriodically() {
    while (true) {
        yield delay(10000);
        yield call(getWorker);
    }
}

const watchers = [
    getWatcher,
    getNextPageWatcher,
    updateWatcher,
    actionWatcher,
    deleteWatcher,
    updatePeriodically,
];

export default watchers;
